import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { useSelector } from 'react-redux';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import UsersList from './components/usersList/UsersList';
import PhoneAuth from './components/phone/PhoneAuth';
import Counter from './components/Counter';

setupIonicReact();

const App: React.FC = () => 
  {
  return <IonApp>
    <PhoneAuth />
    {/* <Counter/> */}
   
  </IonApp>;
  }
 


function mapStateToProps(state:any) {
  return {
    count: state.counter.count
  };
}

function mapDispatchToProps(dispatch:any) {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' })
  };
}
export default App;


 
