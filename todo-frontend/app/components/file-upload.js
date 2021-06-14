import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default class UploadComponent extends Component {

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
      const directUploadURL = `${config.apiHost}/rails/active_storage/direct_uploads`;

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
}
