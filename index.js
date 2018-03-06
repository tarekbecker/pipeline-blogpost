const { StringUtils } = require('string-split-join')

exports.handler = (event, context, callback) => {
  console.log('Handling event: %j', event)
  const result = {
    message: StringUtils.join(['Hello', 'World'], {separatorChar: ' '})
  }
  const response = { body: JSON.stringify(result) }
  console.log('Sending response %j', response)
  callback(null, response)
}
