import Model, { attr } from '@ember-data/model';

export default class TodoModel extends Model {
  //@attr('number') id;
  @attr('string') name;
  @attr('string') description;
  @attr('string') finished;
  @attr('date') created_at;
  @attr('date') updated_at;
  @attr('string') avatar;
}

/*
import DS from 'ember-data';

const { attr }  = DS;

export default DS.Model.extend({
  //id: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  finished: DS.attr('boolean'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
*/
