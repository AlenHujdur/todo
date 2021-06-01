import Controller from '@ember/controller';
//import { action } from '@ember/object';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
//import config from '../config/environment.js';

export default class UpdateController extends Controller {
  _avatar =null;
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
          })
          .then((blob) => {
            const signedId = blob.signedId;
            this.model.avatar = signedId;
            this._avatar =this.model.avatar;
          });
      }
    }
  }
  @action
  avatar_id(){
    return this._avatar;
  }
  @action
  get_id(){
    return this.model.id;
  }

  @action
  updateTodo(event) {
    //alert("now we can submit the model:" + this.get("todo"));
    event.preventDefault();
    let _todo = this.model;

    console.log("avatarId:" + this.model.avatar);
    console.log("Model Id:" + this.model.id);
    if(this._avatar == null){
       this.store.findRecord('todo',this.model.id).then(function(todo) {
        todo.name= _todo.get('name');
        todo.description= _todo.get('description');
        todo.finished= _todo.get('finished');
        todo.updated_at= _todo.get('created_at');
        //todo.avatar = this._avatar;
        todo.save();
      });
    }
    else{
      let todo = this.store.findRecord('todo',this.model.id).then(function(todo) {
        todo.name= _todo.get('name');
        todo.description= _todo.get('description');
        todo.finished= _todo.get('finished');
        todo.updated_at= _todo.get('created_at');
        todo.avatar = this._avatar;
        //todo.save();
      });
      todo.save();
    }

    // this.store.findRecord('todo',this.model.id).then(function(todo) {
    //   todo.avatar= this.avatar_id();
    //   todo.save();
    // }).then(this.store.findRecord('todo',this.model.id).then(function(todo){
    //   todo.name= _todo.get('name');
    //   todo.description= _todo.get('description');
    //   todo.finished= _todo.get('finished');
    //   todo.updated_at= _todo.get('created_at');
    //   todo.save();
    // }));

    //this.avatar_id();
    //let todo = this.model;
    // this.set('model.avatar', this._avatar);
    //console.log(this.model.id);
    //todo.save();

  //  todoModel.save().then(() =>{
  //     alert("Saved");
  //     this.transitionToRoute('todos')
  //   });
   }

}
