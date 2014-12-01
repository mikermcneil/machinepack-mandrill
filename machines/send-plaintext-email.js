module.exports = {

  friendlyName: 'Send email (plaintext)',
  description: 'Send a plaintext email to the specified recipient.',
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
    message: {
      friendlyName: 'Message',
      description: 'The plaintext body of the email.',
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
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    success: {
      void: true
    },
    error: {
      example: undefined
    }
  },

  fn: function(inputs, exits) {

    var request = require('request');

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    request.post({
      url: BASE_URL + '/messages/send.json',

      // See https://mandrillapp.com/api/docs/messages.JSON.html for complete reference
      form: {
        key: inputs.apiKey,
        message: {
          to: [{
            email: inputs.toEmail,
            name: inputs.toName || inputs.toEmail
          }],
          text: inputs.message || '',
          html: '',
          subject: inputs.subject,
          from_email: inputs.fromEmail,
          from_name: inputs.fromName,
          auto_html: true
        }
      },
      json: true
    }, function(err, response, httpBody) {
      // console.log('\n\n\n\n',arguments,'\n\n------\n');
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
