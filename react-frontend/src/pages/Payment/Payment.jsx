import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Outlet } from 'react-router-dom';

const PaymentForm = () => {
  const [edtReturnId, setEdtReturnId] = useState('');
  const [edtReturn, setEdtReturn] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const fetchEDTReturn = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/edt-returns/${edtReturnId}`);
      setEdtReturn(response.data);
    } catch (error) {
      console.error('Error fetching EDT Return', error);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/edt-returns/payment-intent', { edtReturnId });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Error confirming card payment', error);
    } else {
      console.log('Payment successful', paymentIntent);
    }
  };

  return (
    <>
      <div>
        <Outlet />
        <h2 style={{ textAlign: 'center' }}>Payment Form</h2>
        <div className="form-container">
          <div className="form-row">
            <div className="form-field">
              <label>Enter EDT Return ID:</label>
              <input
                type="text"
                value={edtReturnId}
                onChange={(e) => setEdtReturnId(e.target.value)}
                placeholder="Enter EDT Return ID"
              />
            </div>
            <button onClick={fetchEDTReturn} disabled={!edtReturnId}>
              Load EDT Return
            </button>
          </div>

          {edtReturn && (
            <>
              <div>
                <h3>EDT Return Details</h3>
                <p>ID: {edtReturn.id}</p>
                <p>Tax Due: ${edtReturn.taxDue}</p>
                <button onClick={createPaymentIntent}>Pay Tax</button>
              </div>

              {clientSecret && (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <CardElement />
                    </div>
                  </div>
                  <button type="submit" disabled={!stripe || !elements}>
                    Pay
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
