import EmberRouter from '@ember/routing/router';
import config from 'sample-application/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}
Router.map(function () {
  this.route('categories');
  this.route('category-types', { path: '/category-types/:category_id' });
  this.route('result-page', { path: '/result-page/:result_id' });
  this.route('not-found', {path: '/*path'});

});
