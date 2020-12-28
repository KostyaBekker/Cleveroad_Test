import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyA3kkvN9CLky9TQP2s8wiY1J0iMWYajo-0",
  authDomain: "react-redux-87ec0.firebaseapp.com",
  databaseURL: "https://react-redux-87ec0-default-rtdb.firebaseio.com",
  projectId: "react-redux-87ec0",
  storageBucket: "react-redux-87ec0.appspot.com",
  messagingSenderId: "919465209220",
  appId: "1:919465209220:web:8dd5a59ffc40f566fdc1d1",
  measurementId: "G-4FN0JJDW5J"
};

firebase.initializeApp(firebaseConfig);
// import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// serviceWorker.register();
