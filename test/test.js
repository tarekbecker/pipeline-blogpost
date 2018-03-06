/* eslint-env mocha */
const index = require('../index.js')
const assert = require('assert')

describe('Index', function () {
  describe('#handle()', function () {
    it('should return Hello World as JSON.', function (done) {
      index.handler({}, {}, (err, result) => {
        if (err) {
          return done('Err should be null')
        }
        const parsed = JSON.parse(result.body)
        assert.deepEqual(parsed.message, 'Hello World')
        return done()
      })
    })
  })
})
