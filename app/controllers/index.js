import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
export default class IndexController extends Controller {
  @service router;
  // @tracked userName ;
  @tracked errorMsg = "";
  @action
  getUserName() {
    if(this.username != undefined && this.username != ""){
      let userDetails = this.store.createRecord('user-details',{id : 1});
      userDetails.userName = this.username ;
      userDetails.save();
      this.router.transitionTo('categories');
    } else {
      this.errorMsg = "Please enter your name ";
    }

  }
}
