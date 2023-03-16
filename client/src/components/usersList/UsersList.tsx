import {  IonPage,RefresherEventDetail} from '@ionic/react'
import { io } from 'socket.io-client'
import { Plugins } from '@capacitor/core'
import React from 'react'
import { useEffect, useState } from 'react'
import CustomList from '../shared/customList'
import Header from '../header/header'

function UsersList({ phoneNumber }: any) {
  const [items, setItems] = useState<string[]>([])
  const [data, setData] = useState<string[]>([])
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
    <IonPage>
      <Header title={"moments"}/>
      <CustomList  data={items} />
    </IonPage>
  )
}

export default UsersList
