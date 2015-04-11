module.exports = {

  friendlyName: 'Send email (template)',
  description: 'Send a templated email to the specified recipient.',
  cacheable: false,

  inputs: {
    apiKey: {
      friendlyName: 'Mandrill API Key',
      example: '1dTOFDXzJdU5cXiMNd6jRq',
      description: 'A valid Mandrill API key.',
      extendedDescription: 'To look up your API key, log in to your Mandrill account and visit the settings page (https://mandrillapp.com/settings/).',
      required: true
    },
    toEmail: {
      friendlyName: 'To (email)',
      example: 'jane@example.com',
      description: 'Email address of the primary recipient.',
      required: true
    },
    toName: {
      friendlyName: 'To (name)',
      example: 'Jane Doe',
      description: 'Full name of the primary recipient.',
      extendedDescription: 'If left blank, defaults to the recipient\'s email address.'
    },
    subject: {
      friendlyName: 'Subject',
      description: 'Subject line for the email.',
      example: 'Welcome, Jane!'
    },
    templateName: {
      friendlyName: 'Template',
      description: "The template's name",
      example: 'myTemplate',
      required: true
    },
    templateContent: {
      friendlyName: 'Data',
      description: "An array of data you want to inject into the template.",
      example: [{'name': 'of attribute', 'content': 'of attribute'}]
    },
    message: {
      friendlyName: 'Message',
      description: 'Optional full text content to be sent',
      example: 'Jane,\nThanks for joining our community.  If you have any questions, please don\'t hesitate to send them our way.  Feel free to reply to this email directly.\n\nSincerely,\nThe Management'
    },
    fromEmail: {
      friendlyName: 'From (email)',
      description: 'Email address of the sender.',
      example: 'harold@example.enterprise'
    },
    fromName: {
      friendlyName: 'From (name)',
      description: 'Full name of the sender.',
      example: 'Harold Greaseworthy'
    },
    mergeVars: {
      friendlyName: "Merge Tags",
      description: "Content to be placed within template merge tags.",
      typeclass: "array",
      example: [{'name': 'FNAME', 'content': 'First Name'}, {'name': 'LNAME', 'content': 'Last Name'}],
      addedManually: true
    }
  },

  defaultExit: 'success',

  exits: {
    success: {
      void: true
    },
    error: {}
  },

  fn: function(inputs, exits) {

    var request = require('request');

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    request.post({
      url: BASE_URL + '/messages/send-template.json',

      // See https://mandrillapp.com/api/docs/messages.JSON.html#method=send-template for complete reference
      form: {
        key: inputs.apiKey,
        template_name: inputs.templateName,
        template_content: inputs.templateContent,
        message: {
          to: [{
            email: inputs.toEmail,
            name: inputs.toName || inputs.toEmail
          }],
          text: inputs.message || '',
          subject: inputs.subject,
          from_email: inputs.fromEmail,
          from_name: inputs.fromName,
          merge_vars: [{
            rcpt: inputs.toEmail,
            vars: inputs.mergeVars
          }],
          auto_html: true
        }
      },
      json: true
    }, function(err, response, httpBody) {
      if (err) {
        return exits.error(err);
      } else if (response.status >= 300 || response.status < 200) {
        return exits.error(httpBody);
      } else if (typeof httpBody !== 'object' || httpBody.status === 'error') {
        return exits.error(httpBody);
      } else {
        return exits.success();
      }
    });
  }
};