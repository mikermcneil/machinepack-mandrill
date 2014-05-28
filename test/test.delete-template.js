require('node-machine')
.require('../delete-template')
.configure({
  apiKey: 'tmTEP_GZlGtqFwkRvy1bpw',
  name: 'machinepkg-mandrill-test'
})
.exec({
  success: function (deletedTemplate) {
    console.log('Machine executed successfully.');
    console.log(deletedTemplate);
  },
  error: function (err) {
    console.log('Oops- I encountered an error executing the machine:',err);
  }
});
