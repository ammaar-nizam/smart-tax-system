import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/agents/request", data);
      alert("Registration request received! We will contact you soon.");
      reset();
      window.location.href = "/";
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Failed to submit registration request. Please try again later.");
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <div className="register-form-container">
        <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-field">
              <label>Company or Business Name:</label>
              <input
                {...register("from_name", { required: true })}
                type="text"
                id="from_name"
              />
              {errors.from_name && <span style={{ color: "red", textAlign: "center" }}>Company or Business is required.</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Business Registration Number:</label>
              <input
                {...register("number", { required: true })}
                type="text"
                id="number"
              />
              {errors.number && (
                <span style={{ color: "red", textAlign: "center" }}>Business Registration Number is required.</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Business Email:</label>
              <input
                {...register("email", { required: true })}
                type="text"
                id="email"
              />
              {errors.email && <span style={{ color: "red", textAlign: "center" }}>Business Email is required.</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Hotline:</label>
              <input
                {...register("telephone", { required: true })}
                type="text"
                id="telephone"
              />
              {errors.telephone && <span style={{ color: "red", textAlign: "center" }}>Hotline is required.</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Registered Address:</label>
              <input
                {...register("address", { required: true })}
                type="text"
                id="address"
              />
              {errors.address && <span style={{ color: "red", textAlign: "center" }}>Registered Address is required.</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Tell About Your Business:</label>
              <textarea
                {...register("message", { required: true })}
                type="text"
                id="message"
              />
              {errors.message && <span style={{ color: "red", textAlign: "center" }}>Message is required.</span>}
            </div>
          </div>
          {loading && <p>Loading...</p>}
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="submit-button">
              Apply to Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
