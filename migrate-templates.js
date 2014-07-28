/**
 * Module dependencies
 */

var async = require('async');
var Machine = require('node-machine');



module.exports = {
  id: 'migrate-templates',
  description: 'Get all mandrill templates from one account and add them to another.',
  moduleName: 'machinepack-mandrill',

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

  exits: {
    success: {},
    error: {
      example: {
        name: 'Mandrill API Error',
        message: 'Oops it didnt work',
        code: 'E_MANDRILL_API'
      }
    }
  },

  fn: function(inputs, exits) {

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
              console.log('Copied template: "%s"', newTemplate.name);
              next();
            }
          });
        }, exits);
      }
    });
  }
};

