import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ShowController extends Controller {
  @action
  deleteTodo(id) {
    let todo = this.store.peekRecord('todo',id);
    todo.destroyRecord().then(() =>{
      alert("Saved");
      this.transitionToRoute('todos')
    });
   }
}
