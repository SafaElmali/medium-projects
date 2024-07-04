import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { client } from "./clients/apollo";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster />
    </ApolloProvider>
  </React.StrictMode>
);
