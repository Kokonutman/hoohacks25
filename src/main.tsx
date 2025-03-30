import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-e4ku1v7ew7mf7e2u.us.auth0.com"
      clientId="1zcMLi8sGrpqg73VnXsZnJ4lbcBWQBQV"
      authorizationParams={{
        redirect_uri: "https%3A%2F%2Fwww.curemedaddy.tech%2Fdashboard",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
