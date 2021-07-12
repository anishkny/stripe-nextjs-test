const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function webhook(req, res) {
  console.log('Received Stripe webhook');

  // Verify the request is coming from Stripe
  let event = null;
  const stripeSignature = req.headers['stripe-signature'];
  console.log('Stripe-Signature', stripeSignature);
  const rawBody = await getRawBody(req);
  console.log('rawBody', rawBody);
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET
    );
    console.log('event', event);
  } catch (err) {
    console.log('Error verifying webhook', err);
    return res.status(400).send('Invalid Stripe webhook');
  }

  // Process the event
  if (
    event.type === 'checkout.session.completed' &&
    event.data.object.payment_status === 'paid'
  ) {
    console.log('Payment was successful', event.data.object.metadata);
  }

  res.json({ received: true });
}

function getRawBody(req) {
  return new Promise((resolve) => {
    let bodyChunks = [];
    req.on('data', (chunk) => bodyChunks.push(chunk));
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8');
      resolve(rawBody);
    });
  });
}
