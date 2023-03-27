import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom'
import './index.css';
import store from './redux/store';
import { rutas } from './routes';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://fusionajobs-back-production.up.railway.app/';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={rutas} />
    </Provider>
  </React.StrictMode>
);

