import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { playCircle, radio } from 'ionicons/icons'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import ContactsList from '../contactsList/contactsList'
import UsersList from '../usersList/UsersList'

function Tabs() {
  return (
    <IonTabs>
    <IonRouterOutlet>
      <Redirect exact path="/tabs" to="/tabs/chats" />
      <Route  path="/tabs/chats" component={UsersList} exact  />
      <Route exact
        path="/tabs/contacts"
        component={ContactsList}
      />
      
      {/* <Route
        path="/individual/:number"
        render={() => <IndividualChat />}
        exact={true}
      /> */}
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/contacts">
        <IonIcon icon={playCircle} />
        <IonLabel>Contacts</IonLabel>
      </IonTabButton>

      <IonTabButton tab="radio" href="/tabs/chats">
        <IonIcon icon={radio} />
        <IonLabel>Chats</IonLabel>
      </IonTabButton>

      {/* <IonTabButton tab="library" href="/library">
<IonIcon icon={library} />
<IonLabel>Library</IonLabel>
</IonTabButton>

<IonTabButton tab="search" href="/search">
<IonIcon icon={search} />
<IonLabel>Search</IonLabel>
</IonTabButton> */}
    </IonTabBar>
  </IonTabs>
  )
}

export default Tabs