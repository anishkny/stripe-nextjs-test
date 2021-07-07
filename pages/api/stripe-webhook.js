export default async function handler(req, res) {
  const event = req.body;
  console.log('Received Stripe webhook', JSON.stringify(event, null, 2));
  if (
    event.type === 'checkout.session.completed' &&
    event.data.object.payment_status === 'paid'
  ) {
    console.log('Payment was successful', event.data.object.metadata);
  }
  res.json({ received: true });
}
