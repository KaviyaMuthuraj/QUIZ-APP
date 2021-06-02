import Route from '@ember/routing/route';

export default class ResultPageRoute extends Route {
  model(params) {
    const {result_id} = params;
    let result = this.store.peekRecord('user-details',1);
    return result;
  }
}
