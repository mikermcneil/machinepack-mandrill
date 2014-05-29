require('node-machine')
.require('../list-templates')
.configure({
  apiKey: '1dTGOXT_JZlGoqRw3Qvy1bpz'
})
.exec({
  success: function (templates) {
    console.log('Machine executed successfully.');
    console.log(templates);
  },
  error: function (err) {
    console.log('Oops- I encountered an error executing the machine:',err);
  }
});
