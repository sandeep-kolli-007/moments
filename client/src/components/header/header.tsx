import { IonAvatar, IonBackButton, IonButtons, IonHeader, IonItem, IonTitle, IonToolbar } from "@ionic/react";
import { caretBack } from "ionicons/icons";
import React from "react";
function Header(props:any){
    return(
        <IonHeader>
        <IonToolbar>
        <IonItem>
        <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/chats"></IonBackButton>
            </IonButtons>
            {props.url && <IonAvatar slot='start'>
              <img
                src={'https://picsum.photos/80/80?random=' + 1}
                alt="avatar"
              />
            </IonAvatar>}
          <IonTitle>{props.title}</IonTitle>
        </IonItem>
        
          {/* <IonProgressBar type="determinate"></IonProgressBar> */}
        </IonToolbar>
      </IonHeader>
    )
}
export default Header;