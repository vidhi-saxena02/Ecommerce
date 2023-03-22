import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GeistProvider } from "@geist-ui/core";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GeistProvider>
      <App />
    </GeistProvider>
  </Provider>
);
