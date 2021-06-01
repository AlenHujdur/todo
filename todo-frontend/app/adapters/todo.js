import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects,ember/no-global-jquery,ember/no-jquery
  headers: {"X-CSRF-Token": $('meta[name="csrf-token"]').attr('content')},
  host:'http://localhost:3000'//,
  // pathForType() {
  //   return 'todos';
  // }
});

