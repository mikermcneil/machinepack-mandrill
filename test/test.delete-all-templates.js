require('node-machine')
.require('../delete-all-templates')
.configure({
  apiKey: 'tzTDP_JZlGoqFw3Rvy1bpw'
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
