import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRatingChange = (event) => {
    const ratingValue = parseInt(event.target.value, 10);

    setFormData((prevFormData) => ({
      ...prevFormData,
      rating: ratingValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("https://smart-tax-api.vercel.app/api/feedbacks/create", formData)
      .then(() => {
        alert("Feedback sent!");
        setFormData({
          name: "",
          email: "",
          feedback: "",
          rating: "",
        });
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
        alert("Failed to send feedback.");
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after the request completes
      });
  };

  return (
    <div className="feedback-form-container">
      <h2>Your Feedback</h2>
      <p>We Value Your Comments and Suggestions</p>
      <form onSubmit={handleSubmit}>
        <div className="feedback-form-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="feedback-form-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="feedback-form-field">
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="feedback-form-field">
          <label>Rating:</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleRatingChange}
            required
          >
            <option value="0">Select</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
        </div>
        {loading && <p>Loading...</p>}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
