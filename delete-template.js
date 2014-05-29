module.exports = {
  id: 'delete-template',
  moduleName: 'machinepack-mandrill',
  description: 'Delete a mandrill template.',
  dependencies: {
    request: '*'
  },

  inputs: {
    apiKey: {
      example: '1dTOFDXzJdU5cXiMNd6jRq',
      required: true
    },
    name: {
      example: 'example-template',
      required: true
    }
  },

  exits: {
    success: {
      example: {
        "slug": "example-template",
        "name": "Example Template",
        "labels": [
          "example-label"
        ],
        "code": "<div mc:edit=\"editable\">editable content</div>",
        "subject": "example subject",
        "from_email": "from.email@example.com",
        "from_name": "Example Name",
        "text": "Example text",
        "publish_name": "Example Template",
        "publish_code": "<div mc:edit=\"editable\">different than draft content</div>",
        "publish_subject": "example publish_subject",
        "publish_from_email": "from.email.published@example.com",
        "publish_from_name": "Example Published Name",
        "publish_text": "Example published text",
        "published_at": "2013-01-01 15:30:40",
        "created_at": "2013-01-01 15:30:27",
        "updated_at": "2013-01-01 15:30:49"
      }
    },
    error: {
      example: {
        name: 'Mandrill API Error',
        message: 'Oops it didnt work',
        code: 'E_MANDRILL_API'
      }
    },
    notFound: {
      example: {
        status: 'error',
        code: 5,
        name: 'Unknown_Template',
        message: 'No such template "machinepack-mandrill-test"'
      }
    }
  },

  fn: function(inputs, exits, deps) {

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    deps.request.post({
      url: BASE_URL + '/templates/delete.json',
      form: {
        key: inputs.apiKey,
        name: inputs.name
      },
      json: true
    }, function(err, response, httpBody) {
      if (err) {
        return exits(err);
      } else if (response.status >= 300 || response.status < 200) {
        return exits.error(httpBody);
      } else if (typeof httpBody !== 'object' || httpBody.status === 'error') {
        switch (httpBody.name) {
          case 'Unknown_Template':
            return exits.notFound(httpBody);
          default:
            return exits.error(httpBody);
        }
      } else {
        return exits.success(httpBody);
      }
    });
  }
};
