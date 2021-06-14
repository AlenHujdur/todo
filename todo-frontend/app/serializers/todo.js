import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {todos: payload}
    console.log("payload:" + JSON.stringify(payload))
    return this._super(store, primaryModelClass, payload, id, requestType);
  }

});
