import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain= "dev-rvgb6vho60is0u2v.us.auth0.com"
      clientId= "KDUkQDTnOgbY1Zu4A6HA7JeIXMLy47Fh"
      authorizationParams={{
        redirect_uri: "http://localhost:5173"
      }}
      audience= "http://localhost:8000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
