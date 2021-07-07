function HomePage() {
  return (
    <div>
      <div>Stripe + Next.js Demo</div>
      <form action="/api/create-checkout-session" method="POST">
        <label>
          First Name:
          <input type="text" name="firstName" defaultValue="John" />
          Last Name:
          <input type="text" name="lastName" defaultValue="Doe" />
        </label>
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
}

export default HomePage;
