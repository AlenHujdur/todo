import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
//import config from '../config/environment.js';

export default class CreateController extends Controller {
  _avatar = null;
  @service
  activeStorage;

  @tracked
  uploadProgress = 0;

  @tracked
  xhrs = [];

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
            this.model.avatar = signedId;
            this._avatar = this.model.avatar
          });
        //console.log("Active storage: " + this.activeStorage);
        //console.log("Signed id: " + signedId);
        console.log("Avatar id: "+ this._avatar);
      }
    }
  }

  @action
  createTodo(event) {
    //alert("now we can submit the model:" + this.get("todo"));
    console.log("Avatar id:" +this._avatar)
    event.preventDefault();

    let todo = this.store.createRecord('todo',{
      name: this.name,
      description: this.description,
      finished: this.finished,
      created_at: this.created_at,
      avatar: this._avatar//selectedFile //this.document
    }).save()
    redirect()
    function redirect(){
      alert("Saved");
      todo.transitionTo('index')
    }
  }
}
