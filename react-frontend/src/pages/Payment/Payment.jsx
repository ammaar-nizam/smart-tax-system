import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const PaymentForm = () => {
  const [id, setId] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [returnType, setReturnType] = useState("");
  const [returnId, setReturnId] = useState("");
  const [returnData, setReturnData] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  useEffect(() => {

    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setAccessToken(accessToken);
      const decodedToken = jwtDecode(accessToken);
      setId(decodedToken.id);
      setAgentEmail(decodedToken.agentEmail);
    }

    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleCheckout = async () => {



    const response = await axios.post(
      "https://smart-tax-api.vercel.app/api/payments/create-checkout-session",
      {
        returnId: parseInt(returnData.id),
        agentEmail: agentEmail
      }
    );

    console.log("1")
    const session = response.data;

    console.log("2")
    if (session.url) {
      window.location.href = session.url;
    } else {
      setMessage("Failed to initiate checkout session.");
    }
  };

  const fetchReturnData = async () => {
    try {
      const response = await axios.get(
        `https://smart-tax-api.vercel.app/api/${returnType}/${returnId}`
      );
      setReturnData(response.data);
    } catch (error) {
      console.error("Error fetching return data", error);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post(
        "https://smart-tax-api.vercel.app/api/payments/payment-intent",
        {
          returnId,
          amount: returnData.taxDue * 100,
          returnUrl: "http://localhost:5173/payment-success",
        }
      );
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Error confirming card payment", error);
    } else {
      console.log("Payment successful", paymentIntent);
    }
  };

  return (
    <>
      <div>
        <Outlet />
        {message ? (
          <Message message={message} />
        ) : (
          <>
            <h2 className="payment-form-title">Payment Form</h2>
            <div className="payment-form-container">
              <div className="select-return-type">
                <label>Select Return Type:</label>
                <select
                  value={returnType}
                  onChange={(e) => setReturnType(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="edt-returns">EDT Return</option>
                  <option value="gift-returns">Gift Return</option>
                  <option value="inheritance-returns">
                    Inheritance Return
                  </option>
                </select>
              </div>
              <div className="search-form">
                <label>Enter Return ID:</label>
                <input
                  type="text"
                  value={returnId}
                  onChange={(e) => setReturnId(e.target.value)}
                  placeholder={"Enter Return ID"}
                />
                <button
                  onClick={fetchReturnData}
                  disabled={!returnType || !returnId}
                >
                  Search
                </button>
              </div>
              {returnData && (
                <div className="return-details">
                  <h3>Return Details</h3>
                  <p>ID: {returnData.id}</p>
                  <p>Tax Due: Rs. {returnData.taxDue}</p>
                  <div className="payment-button-container">
                    <button className="payment-button" onClick={handleCheckout}>
                      Pay Tax
                    </button>
                  </div>
                </div>
              )}
              {clientSecret && (
                <form onSubmit={handleSubmit} className="payment-form">
                  <div className="card-element">
                    <CardElement />
                  </div>
                  <button type="submit" disabled={!stripe || !elements}>
                    Pay
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PaymentForm;
