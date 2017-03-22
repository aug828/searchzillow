import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import App from './App';
import {searchZillowReducer} from './reducer';
import initialState from './initialState';
import './style/index.css';

// use Redux DevTools Extension to debug redux store
// need to install the extension in the browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// promise middleware will turn Promise into FSA (Flux Standard Action)
const middleware = [promiseMiddleware, createLogger()];

// create store
const store = createStore(
   searchZillowReducer,
   initialState,
   composeEnhancers(
      applyMiddleware(...middleware)
   )
);

// mount Redux store on HTML <root> element
// <root> element is defined in ../public/index.html
ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
  document.getElementById('root')
);
