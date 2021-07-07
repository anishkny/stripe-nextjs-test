const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid').v4;
const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || 'http://localhost:3000';

export default async function handler(req, res) {
  const id = uuid();
  console.log(`Creating checkout session: ${id}`);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'T-shirt' },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${FRONTEND_BASE_URL}/success/${id}`,
    cancel_url: `${FRONTEND_BASE_URL}/cancel`,
    metadata: {
      id,
    },
  });
  console.log(session);

  res.redirect(303, session.url);
}
