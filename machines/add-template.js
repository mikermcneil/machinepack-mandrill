module.exports = {

  identity: 'add-template',
  friendlyName: 'Add template',
  description: 'Add a new email template to a Mandrill account.',
  cacheable: false,

  inputs: {
    apiKey: {
      example: '1dTOFDXzJdU5cXiMNd6jRq',
      description: 'A valid Mandrill API key.',
      required: true
    },
    name: {
      example: 'reset-your-password',
      description: 'Name for the new template (must be unique to the account).',
      required: true
    },
    from_email: {
      description: 'A default sending address for emails sent using this template.',
      example: 'harold@foo.enterprise'
    },
    from_name: {
      description: 'A default from name to be used for emails sent using this template.',
      example: 'Harold Greaseworthy'
    },
    subject: {
      description: 'A default subject line to be used for emails sent using this template.',
      example: 'Click the link in this email to reset your password'
    },
    code: {
      description: 'The HTML code for the template with mc:edit attributes for the editable elements.',
      example: '<div>Click <a href="*|RESET_LINK|*">here</a> to reset your password.</div>'
    },
    text: {
      description: 'A default text part to be used when sending with this template.',
      example: 'Click on the following link to reset your password: \n *|RESET_LINK|*'
    },
    publish: {
      description: 'Set to false to add a draft template without publishing (defaults to true).',
      example: true
    },
    labels: {
      description: 'An optional array of up to 10 labels to use for filtering templates.',
      example: ['password']
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    success: {
      example: {
        name: 'machinepack-mandrill-test',
        code: '<div>Click <a href="*|RESET_LINK|*">here</a> to reset your password.</div>',
        publish_code: null,
        created_at: '2014-05-28 21:59:49.70010',
        updated_at: '2014-05-28 21:59:49.70012',
        slug: 'machinepack-mandrill-test',
        publish_name: 'machinepack-mandrill-test',
        labels: [],
        text: 'Click on the following link to reset your password: \n *|RESET_LINK|*',
        publish_text: null,
        subject: null,
        publish_subject: null,
        from_email: null,
        publish_from_email: null,
        from_name: null,
      }
    },
    error: {
      example: {
        status: 'error',
        code: 6,
        name: 'Invalid_Template',
        message: 'A template with name "machinepack-mandrill-test" already exists'
      }
    }
  },

  fn: function(inputs, exits) {

    var request = require('request');

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    request.post({
      url: BASE_URL + '/templates/add.json',
      form: {
        key: inputs.apiKey,
        name: inputs.name,
        from_email: inputs.from_email,
        from_name: inputs.from_name,
        subject: inputs.subject,
        code: inputs.code || undefined,
        text: inputs.text || undefined,
        publish: inputs.publish,
        labels: inputs.labels
      },
      json: true
    }, function(err, response, httpBody) {
      if (err) {
        return exits(err);
      } else if (response.status >= 300 || response.status < 200) {
        return exits.error(httpBody);
      } else if (typeof httpBody !== 'object' || httpBody.status === 'error') {
        return exits.error(httpBody);
      } else {
        return exits.success(httpBody);
      }
    });
  }
};
