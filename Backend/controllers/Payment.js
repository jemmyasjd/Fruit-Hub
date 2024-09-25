const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {User} = require('../models/User');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const app = express();
app.use(bodyParser.json());

// Payment function
async function Payment(req, res) {
  try {
    const { totalAmount, email } = req.body;

    if (!totalAmount) {
      return res.status(400).json({ error: 'Total amount is required' });
    }

    const product = await stripe.products.create({
      name: "Total Amount",
      images: ["https://cdn-icons-png.freepik.com/512/3/3729.png"],
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: totalAmount * 100, // Convert to cents/paise
      currency: 'inr',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://freshfruithub.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://freshfruithub.vercel.app/cancel`,
      customer_email: email,
      metadata: {
        cartItems: JSON.stringify(cartItems)  // Pass cart items as metadata
      }
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Webhook handler to listen for successful payments
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const customerEmail = session.customer_email;
    const totalAmount = session.amount_total / 100; // Convert from cents

    // Assuming the items were saved temporarily in session metadata or elsewhere,
    // you would retrieve them here. Since they are not passed directly by Stripe,
    // this assumes you have the cart items in a safe place during the session.

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
});

// Stripe raw body for webhooks
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

module.exports = { Payment };
