var Machine = require('node-machine');


module.exports = {
  moduleName: 'machinepkg-mandrill',
  dependencies: {
    request: '*',
    async: '*'
  },

  id: 'migrate-templates',
  description: 'Get all mandrill templates from one account and add them to another.',

  inputs: {
    srcApiKey: {
      example: '1dTOGDXjJDU5cZiMNd9jRQ'
    },
    destApiKey: {
      example: 'tmTEP_GZlGtqFwkRvy1bpw'
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

  fn: function(inputs, exits, deps) {

    Machine.require('../list-templates')
    .configure({
      apiKey: inputs.srcApiKey
    })
    .exec({
      error: exits.error,
      success: function (templates) {
        console.log('Got templates from source.');
        // console.log(templates);

        deps.async.each(templates, function (template, next) {

          // Add api key
          template.apiKey = inputs.destApiKey;

          Machine
          .require('../add-template')
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

