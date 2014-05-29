require('node-machine')
.require('../add-template')
.configure({
  apiKey: 'tzTDP_JZlGoqFw3Rvy1bpw',
  name: 'machinepkg-mandrill-test',
  code: '<div>Click <a href="*|RESET_LINK|*">here</a> to reset your password.</div>',
  text: 'Click on the following link to reset your password: \n *|RESET_LINK|*'
})
.exec({
  success: function (newTemplate) {
    console.log('Machine executed successfully.');
    console.log(newTemplate);
  },
  error: function (err) {
    console.log('Oops- I encountered an error executing the machine:',err);
  }
});
