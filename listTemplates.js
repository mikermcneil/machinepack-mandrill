module.exports = {
  id: 'listTemplates',
  description: 'Get all mandrill templates.',
  dependencies: {
    request: '*'
  },

  inputs: {
    apiKey: {
      example: '1dTOFDXzJdU5cXiMNd6jRq'
    }
  },

  exits: {
    success: {
      example: [{

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

  fn: function(inputs, exits, node_modules) {

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    node_modules.request.post({
      url: BASE_URL + '/templates/list.json',
      form: {
        key: inputs.apiKey
      }
    }, function(err, response, templates) {
      if (err) return exits(err);
      return exits(null, templates);
    });
  }
};
