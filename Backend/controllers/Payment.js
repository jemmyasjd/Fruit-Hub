const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function Payment(req, res) {
  try {
    const { totalAmount, email, cartItems } = req.body;
    if (!totalAmount || !cartItems || !email) {
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
      success_url: `https://freshfruithub.vercel.app/`,
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

module.exports= {Payment};