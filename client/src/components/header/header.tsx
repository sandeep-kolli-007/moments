import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
function Header(props:any){
    return(
        <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          {/* <IonProgressBar type="determinate"></IonProgressBar> */}
        </IonToolbar>
      </IonHeader>
    )
}
export default Header;