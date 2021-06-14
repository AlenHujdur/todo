import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {

  @action
  deleteTodo(id) {
    let todo = this.store.peekRecord('todo',id);
    todo.destroyRecord();//    delete();
  }
}
