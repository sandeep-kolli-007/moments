import { IonAvatar, IonBadge, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams,useHistory} from 'react-router-dom';

function CustomList(props:any) {
    const history=useHistory();
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
          // Any calls to load data go here
          
          event.detail.complete()
        }, 2000)
      }
  return (
    <>
  

    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonList lines="full"  >
        {props.data && props.data.map((item:any, index:number) => (
          <IonItem key={index} button onClick={()=>{props.isContacts?
                history.push(`/individual/${item.phoneNumber[0]}`):alert("test")
          }}>
            <IonAvatar slot='start'>
              <img
                src={'https://picsum.photos/80/80?random=' + index}
                alt="avatar"
              />
            </IonAvatar>
           {props.isContacts? 
           <IonLabel>{item.name}</IonLabel>:
           <IonLabel>
        <h3>Sandeep kolii</h3>
        <p>hello world buddy...!!!!</p>
      </IonLabel>}
           {props.badge && <IonBadge color="success" slot="end">
              80
            </IonBadge>} 
          </IonItem>
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={(ev:any) => {
        //   generateItems()
          setTimeout(() => ev.target.complete(), 500)
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  </>
  )
}

export default CustomList