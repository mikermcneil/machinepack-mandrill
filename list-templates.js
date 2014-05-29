module.exports = {
  id: 'list-templates',
  transparent: true,
  moduleName: 'machinepack-mandrill',
  description: 'Get all mandrill templates.',
  dependencies: {
    request: '*'
  },

  inputs: {
    apiKey: {
      example: '1dTOFDXzJdU5cXiMNd6jRq',
      required: true
    }
  },

  exits: {
    success: {
      example: [{
        slug: 'machinepack-mandrill-test',
        name: 'machinepack-mandrill-test',
        code: '<div>Click <a href="*|RESET_LINK|*">here</a> to reset your password.</div>',
        publish_code: null,
        created_at: '2014-05-28 21:59:49.7001',
        updated_at: '2014-05-28 21:59:49.70012',
        publish_name: 'machinepack-mandrill-test',
        labels: [],
        text: 'Click on the following link to reset your password: \n *|RESET_LINK|*',
        publish_text: null,
        subject: null,
        publish_subject: null,
        from_email: null,
        publish_from_email: null,
        from_name: null,
        publish_from_name: null
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

  fn: function(inputs, exits, deps) {

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    deps.request.post({
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
