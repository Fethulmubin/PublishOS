import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
// import createStore from 'redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {thunk} from 'redux-thunk'
import { GoogleOAuthProvider } from '@react-oauth/google';
import reducers from './reducers'
import {persistedState} from './reducers'
import './index.css'
// const store = createStore(reducers, compose(applyMiddleware(thunk)) )
const store = createStore(
  reducers,
  persistedState,
  compose(applyMiddleware(thunk)),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <GoogleOAuthProvider clientId="679833828233-hjockbsd1eqqspr7b95ldkkk9l5j7eha.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider> 
  </React.StrictMode>,
)
