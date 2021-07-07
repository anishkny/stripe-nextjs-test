function HomePage() {
  return (
    <div>
      <div>Stripe + Next.js Demo</div>
      <form action="/api/create-checkout-session" method="POST">
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
}

export default HomePage;
