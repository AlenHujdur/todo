import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UpdateController extends Controller {
  @service
  activeStorage;

  @tracked
  uploadProgress = 0;

  @tracked
  xhrs = [];

  @action
  redirect() {
    window.location.href = "http://localhost:4200/todos";
  }

  @action
  upload(event) {
    const files = event.target.files;
    if (files) {
      //const directUploadURL = `${config.apiHost}/rails/active_storage/direct_uploads`;
      const directUploadURL = `http://localhost:3000/rails/active_storage/direct_uploads`;
      for (var i = 0; i < files.length; i++) {
        this.activeStorage
          .upload(files.item(i), directUploadURL, {
            onProgress: (progress) => {
              this.uploadProgress = progress;
            },
            onXHROpened: (xhr) => {
              this.xhrs.push(xhr);  // so you can loop over this.xhrs and invoke abort()
            },
          })
          .then((blob) => {
            const signedId = blob.signedId;
            this.model.document = signedId;
          });
      }
    }
  }

  @action
  updateTodo(event) {
    event.preventDefault();
    let _todo = this.model;
    let documentSignatureID = this.model.document;

    if(this.model.document == null || this.model.document == ''){
      this.store.findRecord('todo',this.model.id).then(function(todo) {
        todo.name = _todo.get('name');
        todo.description = _todo.get('description');
        todo.finished = _todo.get('finished');
        todo.updated_at = _todo.get('created_at');
        todo.document = _todo.get('signedId');
        todo.save();
      });
    }
    else{
      this.store.findRecord('todo',this.model.id).then(function(todo) {
        todo.name= _todo.get('name');
        todo.description= _todo.get('description');
        todo.finished= _todo.get('finished');
        todo.updated_at= _todo.get('created_at');
        todo.document = documentSignatureID;
        todo.save();
      });
    }
    alert("Updated!");
    this.redirect();
   }
}
