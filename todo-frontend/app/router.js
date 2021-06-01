import EmberRouter from '@ember/routing/router';
import config from './config/environment';
//import RSVP from 'rsvp'
//import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin'

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('todos', function () {
    this.route('create', {path: 'new'});
    this.route('show', {path: 'show/:todo_id'}, function () {
    });
    this.route('update', {path: 'update/:todo_id'});
  });
  this.route('reports');
});


// export default Route.extend(ApplicationRouteMixin, {
//   beforeSessionExpired() {
//     // Do custom async logic here, e.g. notify
//     // the user that they are about to be logged out.
//     this.route('private-test');
//     return RSVP.resolve()
//   }
// });
