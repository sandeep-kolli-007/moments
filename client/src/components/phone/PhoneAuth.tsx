import React, { useState } from 'react';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { PhoneAuthProvider } from '@firebase/auth';
import firebaseui from 'firebaseui';
import UsersList from '../usersList/UsersList';

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
console.log(phoneNumber)
  return (
    <div>
      {!phoneNumber && false ? 
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        :
        <UsersList/>
      }
    </div>
  );
};

export default PhoneAuth;
