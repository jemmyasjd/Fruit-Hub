const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User'); // Assuming you have a User model

const endpointSecret = 'whsec_3vsUeGLQ6Go7UsaSK1jWhy8FthLVQBze';

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  console.log(req.body);
  const payloadString = JSON.stringify(req.body, null, 2);

  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const customerEmail = session.customer_email;
    const totalAmount = session.amount_total / 100; // Convert from cents

    // Assuming the items were saved temporarily in session metadata or elsewhere
    const cartItems = session.metadata.cartItems ? JSON.parse(session.metadata.cartItems) : [];

    try {
      let user = await User.findOne({ email: customerEmail });

      if (!user) {
        user = new User({ email: customerEmail, orders: [] });
      }

      // Create the new order
      const order = {
        items: cartItems,
        totalAmount: totalAmount,
        createdAt: new Date(),
      };

      // Add the new order to the user's order history
      user.orders.push(order);
      await user.save();

      console.log('Order successfully added to the database!');
    } catch (err) {
      console.error('Error saving order to database:', err.message);
    }
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

module.exports = { handleWebhook };
