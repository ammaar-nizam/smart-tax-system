import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../config/config";
import Loader from "../../components/loader";
import Cookies from "js-cookie";

const SignInForm = () => {

  const [agentUsername, setAgentUsername] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setAgentUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setAgentPassword(event.target.value);
  };

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validations
    if (!agentUsername) {
      setError("Please enter the agentUsername");
      return;
    }
    if (!agentPassword) {
      setError("Please enter the agentPassword");
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
        body: JSON.stringify({ agentUsername, agentPassword }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Set cookie with accessToken
      Cookies.set("access_token", data.accessToken);

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

  if (loading) {
    return <Loader />;
  }

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
                  {...register("agentUsername")}
                  type="text"
                  id="agentUsername"
                  value={agentUsername}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            {/* Second row */}
            <div className="form-row">
              <div className="form-field">
                <label>Password:</label>
                <input
                  {...register("agentPassword")}
                  type="password"
                  id="agentPassword"
                  value={agentPassword}
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
