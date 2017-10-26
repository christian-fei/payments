require('dotenv').load()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.deleteSubscription = function deleteSubscription (id) {
  return stripe.subscriptions.del(id)
}
