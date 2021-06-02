import Route from '@ember/routing/route';
import {questions} from '../data/value' ;
export default class CategoryTypesRoute extends Route {
  model(params) {
    const {
      category_id
    } = params;
    let quesAnsCategory = {
      question :this.getQuestions(category_id),
      category :category_id,
    };
    return quesAnsCategory;
  }
  getQuestions(category){
    if(category == 'science'){
      return questions.science;
    }
    else if(category == 'art'){
      return questions.art;
    }
    else if(category == 'sports'){
      return questions.sports;
    }
    else if(category == 'space'){
      return questions.space;
    }
    else if(category == 'entertainment'){
      return questions.entertainment;
    }
  }
}
