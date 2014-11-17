module.exports = {

  identity: 'delete-all-templates',
  friendlyName: 'Delete all templates',
  description: 'Delete all mandrill templates from an account.',
  cacheable: false,

  inputs: {
    apiKey: {
      description: 'A valid Mandrill API key.',
      example: 'tzTDP_JZlGoqFw3Rvy1bpw',
      required: true
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    success: {
      example: {
        message: ''
      }
    },
    error: {
      example: {
        status: 'error',
        name: 'Mandrill API Error',
        code: 'E_MANDRILL_API'
      }
    }
  },

  fn: function(inputs, exits) {

    var Machine = require('node-machine');
    var async = require('async');

    Machine.require('./list-templates')
    .configure({
      apiKey: inputs.apiKey
    })
    .exec({
      error: exits.error,
      success: function (templates) {
        async.each(templates, function (template, next) {
          Machine
          .require('./delete-template')
          .configure({
            apiKey: inputs.apiKey,
            name: template.name
          })
          .exec({
            error: next,
            success: function (deletedTemplate) {
              next();
            }
          });
        }, exits);
      }
    });
  }
};
