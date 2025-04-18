import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ FIXED
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom'; // ✅ IMPORTANT for <Link>

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter> {/* ✅ Needed for Link and Routes */}
      <App />
    </BrowserRouter>
  </Provider>
);
