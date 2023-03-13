import {
  IonApp,
  IonAvatar,
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonToast,
} from '@ionic/react'
import { io } from 'socket.io-client'
import { Plugins } from '@capacitor/core'

import React from 'react'
import { useEffect, useState } from 'react'

function UsersList({ phoneNumber }: any) {
  const [items, setItems] = useState<string[]>([])

  const generateItems = () => {
    const newItems = []
    for (let i = 0; i < 50; i++) {
      newItems.push(`Item ${1 + items.length + i}`)
    }
    setItems([...items, ...newItems])
  }
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      generateItems()
      event.detail.complete()
    }, 2000)
  }
  useEffect(() => {
    generateItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Moments</IonTitle>
          {/* <IonProgressBar type="determinate"></IonProgressBar> */}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList lines="full" contextMenu='ss'>
          {items.map((item, index) => (
            <IonItem key={index} button onClick={()=>{alert(index+1)}}>
              <IonAvatar slot='start'>
                <img
                  src={'https://picsum.photos/80/80?random=' + index}
                  alt="avatar"
                />
              </IonAvatar>
              <IonLabel>
          <h3>Sandeep kolii</h3>
          <p>hello world buddy...!!!!</p>
        </IonLabel>

              <IonBadge color="success" slot="end">
                80
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(ev:any) => {
            generateItems()
            setTimeout(() => ev.target.complete(), 500)
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </>
  )
}

export default UsersList
