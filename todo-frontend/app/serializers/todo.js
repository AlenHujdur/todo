import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  // normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
  //   // this.normalizeArrayResponse(store, primaryModelClass, payload, id, requestType);
  //   payload = {todos: payload}
  //   return this.normalizeResponse(store, primaryModelClass, payload, id, requestType, false);
  // }
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {todos: payload.data}
    // = {primaryKey: "id"}
    console.log("primaryKey" + id + "payload:")
    console.log(payload['todos'].length)
    return this._super(store, primaryModelClass, payload, id, requestType);
  }

});
