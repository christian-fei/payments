require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const express = require('express')
const bodyParser = require('body-parser')

const defaultPlan = 'monthly'

const { PORT = 3000 } = process.env

const server = createServer(PORT)
server.post('/', (req, res) => {
  console.log('POST /')
  console.log('  req.body', req.body)
  let customer
  createCustomer(req.body)
    .then(_customer => {
      customer = _customer
      console.log('  customer.create', customer)
      return createSubscription(customer.id)
    })
    .then(subscription => {
      console.log('  subscriptions.create', subscription)
      res.send(JSON.stringify({customer, subscription}))
    })
})

server.listen(PORT)
console.log('listening on %s', PORT)

function createServer (port) {
  const server = express()
  server.use(bodyParser())

  return server
}

// function listPlans () {
//   const plans = await stripe.plans.list({limit: 5})
//   console.log('-- plans.list', plans)
// }

function createCustomer ({ stripeEmail: email, stripeToken: {id: source} }) {
  return stripe.customers.create({ email, source })
}

function createSubscription (customerId, plan = defaultPlan) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{
      plan
    }]
  })
}
