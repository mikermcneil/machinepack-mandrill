require('node-machine')
.require('../migrate-templates')
.configure({
  srcApiKey: '1dTGOXT_JZlGoqRw3Qvy1bpz',
  destApiKey: 'tzTDP_JZlGoqFw3Rvy1bpw'
})
.exec({
  success: function (result) {
    console.log('Machine executed successfully.', result);
  },
  error: function (err) {
    console.log('Oops- I encountered an error executing the machine:',err);
  }
});

