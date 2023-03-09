import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import './index.css';
import App from './App';

const store = configureStore();
const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
	<App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
