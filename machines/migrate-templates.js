module.exports = {

  identity: 'migrate-templates',
  friendlyName: 'Migrate templates',
  description: 'Get all mandrill templates from one account and add them to another.',
  cacheable: false,

  inputs: {
    srcApiKey: {
      example: '1dTGOXT_JZlGoqRw3Qvy1bpz',
      required: true
    },
    destApiKey: {
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
        name: 'Mandrill API Error',
        message: 'Oops it didnt work',
        code: 'E_MANDRILL_API'
      }
    }
  },

  fn: function(inputs, exits) {

    var Machine = require('node-machine');
    var async = require('async');

    Machine.build(require('./list-templates'))
    .configure({
      apiKey: inputs.srcApiKey
    })
    .exec({
      error: exits.error,
      success: function (templates) {

        async.each(templates, function (template, next) {

          // Add api key
          template.apiKey = inputs.destApiKey;

          Machine
          .build(require('./add-template'))
          .configure(template)
          .exec({
            error: next,
            success: function (newTemplate) {
              next();
            }
          });
        }, exits);
      }
    });
  }
};
