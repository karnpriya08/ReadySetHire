import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // providing  access to the Redux store for  entire app 
  <Provider store= {store}>
    <App />
  </Provider>,
)
