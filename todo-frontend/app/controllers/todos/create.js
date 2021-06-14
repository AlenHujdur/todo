import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CreateController extends Controller {
  _document = null;
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
          }).then((blob) => {
            const signedId = blob.signedId;
            this.model.document = signedId;
            this._document = this.model.document;
          });
      }
    }
  }

  @action
  createTodo(event) {
    event.preventDefault();

    this.store.createRecord('todo',{
      name: this.name,
      description: this.description,
      finished: this.finished,
      created_at: this.created_at,
      document: this._document
    }).save();
    alert("Todo created!");
    this.redirect();
  }
}
