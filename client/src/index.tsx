import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import {store,persistor} from './store';
import Counter from './components/Counter';
import { PersistGate } from 'redux-persist/integration/react';
 
import "firebase/compat/firestore";

const container = document.getElementById('root');
const root = createRoot(container!);
const firebaseConfig = {
  apiKey: "AIzaSyBUp6naYHpAUf-RYEu2VIxlg05qzfJJm_E",
  authDomain: "moments-f6a53.firebaseapp.com",
  databaseURL: "https://moments-f6a53-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moments-f6a53",
  storageBucket: "moments-f6a53.appspot.com",
  messagingSenderId: "506582725271",
  appId: "1:506582725271:web:9bb8ef6ad97fbd3d1b6fd2",
  measurementId: "G-TBWBXHT5HJ"
};
 export const app = firebase.initializeApp(firebaseConfig);
 export const db = firebase.firestore(app);
 const analytics = getAnalytics(app);
root.render(
  

  <Provider store={store}>
     <PersistGate  loading={null} persistor={persistor}>

    <App/>
   
     </PersistGate>
  </Provider>
 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



