import React, { useState } from 'react';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from '../stylesfirebaseauth';
import firebase from 'firebase/compat/app';
import { PhoneAuthProvider } from '@firebase/auth';
import firebaseui from 'firebaseui';
import UsersList from '../usersList/UsersList';
import IndividualChat from '../individualChat/individualChat';
  import { IonApp } from '@ionic/react';
// import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';

// import { Route } from 'react-router';

// import { playCircle, radio, library, search } from 'ionicons/icons';
const PhoneAuth = () => {
 

  const [phoneNumber, setPhoneNumber] = useState<number|string|null>();
  // const [user, loading, error] = useAuthState(firebase.auth());
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
            {provider:firebase.auth.PhoneAuthProvider.PROVIDER_ID,defaultCountry: 'IN',}
            
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult:any, redirectUrl:any) {
        // Handle the successful sign-in
        // You can access the user's phone number in the authResult object
       setPhoneNumber(authResult?.user?.phoneNumber);
        console.log(authResult)
        console.log(redirectUrl)
        // Redirect to the signed-in page
        return true;
      }
    }
  };
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    setPhoneNumber(user?.phoneNumber)
  } else {
    // No user is signed in.
  }
});

  return (
    <IonApp>
      {!phoneNumber && false ? 
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        :
          // <IndividualChat phoneNumber={phoneNumber}/>
         <UsersList  />
  
      }
    </IonApp>
  
  );
};

export default PhoneAuth;





// <IonReactRouter>
// <IonTabs>
//   <IonRouterOutlet>
//     {/* <Redirect exact path="/" to="/home" /> */}
//     {/*
//     Use the render method to reduce the number of renders your component will have due to a route change.

//     Use the component prop when your component depends on the RouterComponentProps passed in automatically.
//   */}
//     <Route path="/home" element={ <UsersList />}/>

//   </IonRouterOutlet>

//   <IonTabBar slot="bottom">
//     <IonTabButton tab="home" href="/home">
//       <IonIcon icon={playCircle} />
//       <IonLabel>Listen now</IonLabel>
//     </IonTabButton>

//     <IonTabButton tab="radio" href="/radio">
//       <IonIcon icon={radio} />
//       <IonLabel>Radio</IonLabel>
//     </IonTabButton>

//     <IonTabButton tab="library" href="/library">
//       <IonIcon icon={library} />
//       <IonLabel>Library</IonLabel>
//     </IonTabButton>

//     <IonTabButton tab="search" href="/search">
//       <IonIcon icon={search} />
//       <IonLabel>Search</IonLabel>
//     </IonTabButton>
//   </IonTabBar>
// </IonTabs>
// </IonReactRouter>