import Model, { attr } from '@ember-data/model';

export default class TodoModel extends Model {

  @attr('string') name;
  @attr('string') description;
  @attr('string') finished;
  @attr('date') created_at;
  @attr('date') updated_at;
  @attr('string') document;
  @attr('string') doc_url;
  @attr('string') signedId;
}


