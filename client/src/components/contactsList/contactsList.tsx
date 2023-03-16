// import { Contacts } from '@capacitor-community/contacts';
import React, { useEffect, useState } from 'react'
import { Plugins } from '@capacitor/core'
import CustomList from '../shared/customList'
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import Header from '../header/header'

function ContactsList() {
  const [data, setData] = useState<string[]>([])
  const [contacts, setContacts] = useState<Array<any>>([])
  const { Camera, Contacts } = Plugins
  const generateItems = () => {
    const newItems = []
    for (let i = 0; i < 50; i++) {
      newItems.push(`Item ${1 + data.length + i}`)
    }
    setData([...data, ...newItems])
  }

  useEffect(() => {
    generateItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const retrieveListOfContacts = async () => {
    const projection = {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
    }

    const result = await Contacts.getContacts({
      projection,
    })
    if (result?.contacts?.length > 0) {
      setContacts(
        result.contacts.map((c: any) => ({
          name: c?.name?.display,
          phoneNumber: c.phones
            ? c?.phones.map((ph: any) => ph?.number.split(' ').join(''))
            : [],
        })),
      )
    }
  }
  useEffect(() => {
    const checkCameraPermission = async () => {
      const { Camera } = Plugins
      const permission = await Camera.checkPermissions()
      //   setCameraPermission(permission.camera === 'granted');
    }

    const checkContactsPermission = async () => {
      const { Contacts } = Plugins
      const permission = await Contacts.requestPermissions()
      //   setContactsPermission(permission.contacts === 'granted');
    }

    checkCameraPermission()
    checkContactsPermission()
    retrieveListOfContacts()
  }, [])
  return (
    <IonPage>
      <Header title={'moments'} />
      <CustomList data={contacts} isContacts />
    </IonPage>
  )
}

export default ContactsList
