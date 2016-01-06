module.exports = {

  identity: 'list-templates',
  friendlyName: 'List templates',
  description: 'List all templates available to a user',
  extendedDescription: 'This machine returns _all_ templates- there is no pagination.',
  cacheable: true,

  inputs: {
    apiKey: {
      description: 'A valid Mandrill API key.',
      example: '1dTOFDXzJdU5cXiMNd6jRq',
      required: true
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    success: {
      example: [{
        slug: 'machinepack-mandrill-test',
        name: 'machinepack-mandrill-test',
        code: '<div>Click <a href="*|RESET_LINK|*">here</a> to reset your password.</div>',
        publish_code: '',
        created_at: '2014-05-28 21:59:49.7001',
        updated_at: '2014-05-28 21:59:49.70012',
        publish_name: 'machinepack-mandrill-test',
        labels: [],
        text: 'Click on the following link to reset your password: \n *|RESET_LINK|*',
        publish_text: '',
        subject: '',
        publish_subject: '',
        from_email: '',
        publish_from_email: '',
        from_name: '',
        publish_from_name: ''
      }]
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

    var request = require('request');

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    request.post({
      url: BASE_URL + '/templates/list.json',
      form: {
        key: inputs.apiKey
      },
      json: true
    }, function(err, response, httpBody) {
      if (err) {
        return exits(err);
      }
      else if (response.status >= 300||response.status<200) {
        return exits.error(httpBody);
      }
      else if (typeof httpBody !== 'object' || httpBody.status==='error') {
        return exits.error(httpBody);
      }
      else {
        return exits.success(httpBody);
      }
    });
  }
};
