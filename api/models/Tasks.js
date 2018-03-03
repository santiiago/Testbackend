/**
 * Tasks.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    task_name: {
      type: 'string',
      size: '100',
      required: true
    },
    task_priority: {
      type: 'integer',
      unique: true,
      required: true
    },
    date_expired: {
      type: 'date',
      required: true
    },
    // Add a reference to User
    owner: {
      model: 'Users',
      required: true
    }
  }
};

