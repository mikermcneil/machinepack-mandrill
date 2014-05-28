require('node-machine')
.require('../migrate-templates')
.configure({
  srcApiKey: '1dTOGDXjJDU5cZiMNd9jRQ',
  destApiKey: 'tmTEP_GZlGtqFwkRvy1bpw'
})
.exec({
  success: function (result) {
    console.log('Machine executed successfully.', result);
  },
  error: function (err) {
    console.log('Oops- I encountered an error executing the machine:',err);
  }
});
