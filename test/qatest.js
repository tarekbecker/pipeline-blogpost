/* eslint-env mocha */

const http = require('https')
const assert = require('assert')

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_DEFAULT_REGION})
const cloudformation = new AWS.CloudFormation()

const params = {
  StackName: process.argv[3]
}
cloudformation.describeStacks(params, function (err, data) {
  if (err) {
    console.log(err)
    return process.exit(1)
  } else {
    const url = data.Stacks[0].Outputs[0].OutputValue
    console.log(`Calling get on ${url}`)
    http.get(url, (res) => {
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        try {
          const result = JSON.parse(rawData)
          assert.deepEqual(result.message, 'Hello World')
        } catch (e) {
          console.log(e.message)
          process.exit(1)
        }
      })
    }).on('error', (e) => {
      console.log(e.message)
      process.exit(1)
    })
  }
})
