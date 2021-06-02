import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import Timer from "ember-stopwatch/utils/timer";
export default class QuestionsAnswersBlockComponent extends Component {
  @service router;
  @service store;
  questions = this.args.data.question ;
  @tracked questionCount = 0 ;
  selectedAnswer = "";
  totalMarks = 0;
  @tracked errorMsg = "";
  lifeTime = [1,2,3];
  @tracked timer = 0;
  category = this.args.data.category;

  @computed('questions','questionCount')
  get findQues(){
    return this.questions[this.questionCount];
  }
  @computed('findQues')
  get question(){
    return this.findQues.question;
  }
  @computed('findQues')
  get options(){
    return this.findQues.options;
  }
  @computed('findQues')
  get correctAnswer(){
    return this.findQues.answer;
  }
  @action
  displayNextQuestion() {
    if(this.selectedAnswer!=""){
      this.timer.stop();
        if(this.correctAnswer == this.selectedAnswer){
          this.totalMarks += 10;
          if(this.questionCount < 9){
            this.selectedAnswer = "";
            this.errorMsg = "";
            this.questionCount++;
            this.setTimer();
          } else{
            this.clearAndCallRouter();
          }
        } else {
          this.lifeTime.removeAt(0);
          this.selectedAnswer = "";
          this.errorMsg = "";
          this.questionCount++;
          this.setTimer();
          if(this.lifeTime.length == 0){
            this.clearAndCallRouter();
          }
        }
    } else {
      this.errorMsg = "Please select the answer";
    }
  }
  @action
  getselectedAnswer(answer) {
    this.selectedAnswer = answer.target.value;
  }
  expirationHandler(){
    this.timer.stop();
    this.errorMsg = "";
    this.lifeTime.removeAt(0);
    this.questionCount++;
    this.setTimer();
    if(this.lifeTime.length == 0) {
      this.clearAndCallRouter();
    }
  }
  setCategoryAndScore(category,score) {
    let userDetails = this.store.peekRecord('user-details',1);
    userDetails.category = category ;
    userDetails.score = score;
    userDetails.save();
  }
  @action
  setTimer() {
    this.timer = new Timer(25000);
    this.timer.on("expired", this, this.expirationHandler);
    this.timer.start();
  }
  clearAndCallRouter(){
    this.timer.stop() ;
    this.lifeTime = [1,2,3];
    this.setCategoryAndScore(this.category,this.totalMarks);
    this.router.transitionTo('result-page',this.category);
  }
}



