
#machinepack-mandrill

###Basic usage

```js

var API_KEY = '1dTGOXT_JZlGoqRw3Qvy1bpz';

require('node-machine')
.build(require('machinepack-mandrill/list-templates'))
.inputs({
  apiKey: API_KEY
})
.exec(function (err, templates) {
  success: function (result) {
    console.log('Machine executed successfully.', result);
  },
  error: function (err) {
    console.error('Oops- I encountered an error executing the machine:',err);
  },
  invalidApiKey: function (err) {
    console.error('That api key (%s) is invalid- please try again.\nDetails:\n',API_KEY,err);
  }
});
```


#####Alternatively

Instead of specifying exit handlers, you can also pass a traditional node callback as the argument to `.exec()` and negotiate the different exit states yourself:

```js

var API_KEY = '1dTGOXT_JZlGoqRw3Qvy1bpz';

require('node-machine')
.build(require('machinepack-mandrill/list-templates'))
.inputs({
  apiKey: API_KEY
})
.exec(function (err, templates) {
  if (err) {
    if (err && err.code===5) {
      console.error('That api key (%s) is invalid- please try again.\nDetails:\n',API_KEY,err);
    }
    else {
      console.error('Oops- I encountered an error executing the machine:',err);
    }
  }
  else {
    console.log('Machine executed successfully.', result);
  }
});
```
