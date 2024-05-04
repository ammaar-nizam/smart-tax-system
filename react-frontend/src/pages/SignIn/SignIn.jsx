import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../config/config";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validations
    if (!username) {
      setError("Please enter the username");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    let endpoint = "";
    endpoint = API_URL + "/agents/login";

    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // store token in session storage
        localStorage.setItem("accessToken", data.accessToken);

        // redirect to dashboard on successful login
        window.location.href = "/";
      } else {
        console.error("Login failed:", response.statusText);
        // Handle login failure, such as displaying an error message
        setError("User not found. Please check credentials and try again.");
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      return;
    } finally {
      setError(null);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>SMART TAX SYSTEM</h2>
        <h3 style={{ textAlign: "center" }}>SIGN IN</h3>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* First row */}
            <div className="form-row">
              <div className="form-field">
                <label>Username:</label>
                <input
                  {...register("username")}
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            {/* Second row */}
            <div className="form-row">
              <div className="form-field">
                <label>Password:</label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? "Submitting..." : "Sign In"}
              </button>
            </div>
            {errors.root && <div>{errors.root.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
