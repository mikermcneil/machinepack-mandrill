require('node-machine')
.require('../list-templates')
.configure({
  apiKey: '1dTOGDXjJDU5cZiMNd9jRQ'
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
