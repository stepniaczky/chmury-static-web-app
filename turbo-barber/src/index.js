import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from '../src/pages/App';
import { Provider } from 'react-redux';
import store from './store/store';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();