const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("../config/prismaConfig");

// Take to Checkout Page
async function createCheckoutSession(req, res) {
  try {
    const edtReturn = await prisma.eDTReturn.findUnique({
      where: { id: parseInt(req.body.returnId) },
    });

    if (!edtReturn) {
      return res.status(404).json({
        message: "EDT Return not found",
      });
    }
    const taxDueCents = parseInt(edtReturn.taxDue * 100);
    if (isNaN(taxDueCents)) {
      throw new Error("Invalid tax due amount");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: "EDT Return Payment",
              // add more details about the product if needed
            },
            unit_amount: taxDueCents, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: req.body.agentEmail,
      billing_address_collection: 'auto',
      success_url: `${process.env.WEBSITE_DOMAIN}?success=true`,
      cancel_url: `${process.env.WEBSITE_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a Payment Intent
async function createPaymentIntent(req, res) {
  const { edtReturnId } = req.params.id;

  try {
    const edtReturn = await prisma.eDTReturn.findUnique({
      where: { id: parseInt(edtReturnId) },
    });

    if (!edtReturn) {
      return res.status(404).json({
        message: "EDT Return not found",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: edtReturn.taxDue * 100, // Stripe amount is in cents
      currency: "usd",
      metadata: { edtReturnId: edtReturn.id.toString() },
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating payment intent",
      error: err,
    });
  }
}

// Handle webhook event
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Extract the metadata
      const edtReturnId = session.metadata.edtReturnId;
      console.log(`Updating EDT Return ID: ${edtReturnId} to PAID`);

      // Update the eDTReturn status
      await prisma.eDTReturn.update({
        where: { id: parseInt(edtReturnId) },
        data: { status: 'PAID' },
      });

      res.status(200).json({ received: true });
    } catch (err) {
      console.error('Error updating EDT Return status', err);
      res.status(500).json({
        message: 'Error updating EDT Return status',
        error: err,
      });
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    res.status(400).json({ message: 'Unhandled event type' });
  }
}

module.exports = {
  createCheckoutSession,
  createPaymentIntent,
  handleWebhook,
};
