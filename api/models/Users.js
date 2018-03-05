/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'string',
      size: 100,
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      size: 100,
      required: true
    },

     // Add a reference to tasks
     tasks: {
      collection: 'Tasks',
      via: 'owner'
    }
  },

  attemptLogin: function (inputs, cb) {
    // Create a user
    Users.findOne({
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  }
};

