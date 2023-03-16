import React, { useEffect, useState } from 'react'
import 'firebase/compat/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import StyledFirebaseAuth from '../stylesfirebaseauth'
import firebase from 'firebase/compat/app'
import { PhoneAuthProvider } from '@firebase/auth'
import firebaseui from 'firebaseui'
import UsersList from '../usersList/UsersList'
import IndividualChat from '../individualChat/individualChat'
import { IonApp } from '@ionic/react'
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react'
import { Route, Redirect, useParams } from 'react-router-dom'

// import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router'

// import { Route } from 'react-router';

import { playCircle, radio, library, search } from 'ionicons/icons'
import ContactsList from '../contactsList/contactsList'
import Tabs from '../tabs/tabs'
import { db } from '../..'
const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState<number | string | null>()
  // const [user, loading, error] = useAuthState(firebase.auth());
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'IN',
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (
        authResult: any,
        redirectUrl: any,
      ) {
        setPhoneNumber(authResult?.user?.phoneNumber)
        db.collection('users')
          .where('phone', '==', authResult?.user?.phoneNumber)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              db.collection('users').add({
                about: 'Hey Moments Here..!!',
                lastSeen: new Date(),
                name: 'sandeep',
                phone: authResult?.user?.phoneNumber,
                photo:
                  'https://media.licdn.com/dms/image/C5103AQEcYZQ-iGnMNw/profile-displayphoto-shrink_200_200/0/1525708996475?e=1683158400&v=beta&t=kFLi3u20BIFjXimVRkNPPWCLodZ2EbXVMKz5XpEdqks',
              })
            }
          })
        return true
      },
    },
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setPhoneNumber(user?.phoneNumber)
        db.collection('users')
          .where('phone', '==', user?.phoneNumber)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              db.collection('users').add({
                about: 'Hey Moments Here..!!',
                lastSeen: new Date(),
                name: 'sandeep',
                phone: user?.phoneNumber,
                photo:
                  'https://media.licdn.com/dms/image/C5103AQEcYZQ-iGnMNw/profile-displayphoto-shrink_200_200/0/1525708996475?e=1683158400&v=beta&t=kFLi3u20BIFjXimVRkNPPWCLodZ2EbXVMKz5XpEdqks',
              })
            }
          })
      } else {
        // No user is signed in.
      }
    })
  }, [])

  return (
    <>
      {!phoneNumber ? (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Redirect exact path="/" to="/tabs" />
              <Route
                path="/individual/:number/:name"
                // component={IndividualChat}

                component={(props: any) => (
                  <IndividualChat phoneNumber={phoneNumber} />
                )}
              />
              <Route path="/tabs" component={Tabs} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      )}
    </>
  )
}

export default PhoneAuth
