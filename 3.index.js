const { StringUtils } = require('string-split-join')

exports.handler = (event, context, callback) => {
  console.log('Handling event: %j', event)
  if (event['queryStringParameters'] && event['queryStringParameters']['crash']) {
    throw new Error('Upps, this crashes')
  }
  const result = {
    message: StringUtils.join(['Hello', 'World'], {separatorChar: ' '}),
    version: context.functionVersion
  }
  const response = { body: JSON.stringify(result) }
  console.log('Sending response %j', response)
  callback(null, response)
}
