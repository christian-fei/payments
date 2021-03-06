const {serial} = require('ava')
const {post} = require('r2')
const {deleteSubscription} = require('./utils/_stripe-utils')

const stripeEmail = 'integration-test@payments.cc'
const testToken = 'tok_visa'
const stripeToken = {id: testToken}

serial('creates subscription for "monthly"', async t => {
  const json = {stripeEmail, stripeToken}
  const response = await post('http://localhost:3000/', {json}).json
  t.true(response.hasOwnProperty('customer'))
  t.true(response.hasOwnProperty('subscription'))
  t.is(response.subscription.plan.name, 'monthly')

  await deleteSubscription(response.subscription.id)
})
