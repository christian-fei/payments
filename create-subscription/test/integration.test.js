const {serial} = require('ava')
const request = require('r2')
const {deleteSubscription} = require('./_stripe-utils')

const testToken = 'tok_visa'

serial('creates subscription for "monthly"', async t => {
  const body = {stripeEmail: 'integration-test@payments.cc', stripeToken: {id: testToken}}
  const response = await request.post('http://localhost:3000/', {json: body}).json
  t.true(response.hasOwnProperty('customer'))
  t.true(response.hasOwnProperty('subscription'))
  t.is(response.subscription.plan.name, 'monthly')

  await deleteSubscription(response.subscription.id)
})
