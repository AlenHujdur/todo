import Route from '@ember/routing/route';

export default class TodosRoute extends Route{
  // eslint-disable-next-line no-unused-vars
  model() {
    return this.store.findAll('todo');
  }
}


