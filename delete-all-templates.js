module.exports = {
  moduleName: 'machinepkg-mandrill',
  dependencies: {
    request: '*',
    async: '*',
    'node-machine': '*'
  },

  id: 'delete-all-templates',
  description: 'Delete all mandrill templates from an account.',

  inputs: {
    apiKey: {
      example: 'tmTEP_GZlGtqFwkRvy1bpw',
      required: true
    }
  },

  exits: {
    success: {},
    error: {
      example: {
        status: 'error',
        name: 'Mandrill API Error',
        code: 'E_MANDRILL_API'
      }
    }
  },

  fn: function(inputs, exits, deps) {

    var Machine = deps['node-machine'];

    Machine.require('../list-templates')
    .configure({
      apiKey: inputs.apiKey
    })
    .exec({
      error: exits.error,
      success: function (templates) {
        console.log('Got list of all %s templates.',templates.length);

        deps.async.each(templates, function (template, next) {
          Machine
          .require('../delete-template')
          .configure({
            apiKey: inputs.apiKey,
            name: template.name
          })
          .exec({
            error: next,
            success: function (deletedTemplate) {
              console.log('Deleted template: "%s"', deletedTemplate.name);
              next();
            }
          });
        }, exits);
      }
    });
  }
};

