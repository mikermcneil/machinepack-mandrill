module.exports = {
  id: 'addTemplate',
  description: 'Add a new email template to a Mandrill account.',
  inputs: {},
  exits: {},
  dependencies: {
    request: '~x.x.x',
    switchback: '~x.x.x'
  },
  fn: function($inputs, $exit, node_modules) {
    $exit = node_modules.switchback($exit||function (){});

    // Base url for API requests.
    var BASE_URL = 'https://mandrillapp.com/api/1.0';

    node_modules.request.post({
      url: BASE_URL + '/templates/add.json',
      form: {
        key: $inputs.apiKey,
        name: $inputs.name,
        from_email: $inputs.from_email,
        from_name: $inputs.from_name,
        subject: $inputs.subject,
        code: $inputs.code||undefined,
        text: $inputs.text||undefined,
        publish: $inputs.publish,
        labels: $inputs.labels
      }
    }, function(err, response, template) {
      if (err) return $exit(err);
      return $exit(null, template);
    });
  }
};
