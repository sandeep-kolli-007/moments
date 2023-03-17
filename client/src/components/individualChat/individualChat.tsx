import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import { io } from 'socket.io-client'
import { Plugins } from '@capacitor/core'

import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
//styles
import './individualChat.scss'
// import { Contacts, Contact, ContactField, ContactName,ContactFindOptions } from '@ionic-native/contacts';
import { any } from 'prop-types'
import { Contacts } from '@capacitor-community/contacts'
import { log } from 'console'
// import { Contacts } from '@capacitor-community/contacts';
import { db } from '../../index'

import { updateDoc, serverTimestamp, QuerySnapshot } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import Header from '../header/header'
import { sendOutline } from 'ionicons/icons'

function IndividualChat({ phoneNumber }: any) {
  let navigator: Navigator & { contacts: any }
  const socket = io('https://moments-node.onrender.com')
  const [present] = useIonToast()
  const [contacts, setContacts] = useState<Array<any>>([])
  const [messages, setMessages] = useState<any>([])
  const [input, setInput] = useState('')
  const [sender, setSender] = useState('')
  const [id, setId] = useState('')
  const [showToast, setShowToast] = useState(false)
  const { Permissions } = Plugins
  const [cameraPermission, setCameraPermission] = useState(false)
  const [contactsPermission, setContactsPermission] = useState(false)
  const { Camera, Contacts } = Plugins
  const { number,name }: any = useParams<{number: string, name: string}>();

  // Add the dummy data to Firestore
  // usersData.forEach((user) => {
  //   db.collection("users").add(user);
  // });
 
  db.collection('users')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        console.log(doc.data())
      })
    })
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
          phoneNumber: c.phones ? c?.phones.map((ph: any) => ph?.number) : [],
        })),
      )
    }
  }

  // const contact = new Contacts();
  // useEffect(() => {
  //   const fetchContacts = async () => {
  //       try {

  //         contact.find(["*"]).then((response:any)=>{
  //           debugger
  //            setContacts(response.map((c:any)=>({"contact":c.displayName,"phoneNumbers":c.phoneNumbers.map((pn:any)=>(pn.value))}))
  //           )
  //         })

  //           // const result = await Contacts.find(['displayName', 'phoneNumbers', 'emails']);
  //           // setContacts(result);
  //       } catch (error) {
  //           console.error(error);
  //       }
  //   };

  //   fetchContacts();
  // }, []);

 

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id) // x8WIv7-mJelg7on_ALbx
      setId(socket.id)
    })
    socket.on('chat message', (msg: any) => {
      setMessages((prev:any)=>[...prev, msg])
    })
  }, [])
  
  useEffect(()=>{
   const ele:any= document.getElementById("chat-scrollable")
    ele.scrollTo(0, ele.scrollHeight);
  },[messages])

  const handleInput = (e: any) => {
    setInput(e.target.value)
  }

  // const handleSender = (e: any) => {
  //   setSender(e.target.value)
  // }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    socket.emit('chat message', { message: input, sender: phoneNumber })
    db.collection('messages').add( 
      {
        message:input,
        recipient:number,
        sender:phoneNumber,
        sentAt:serverTimestamp()
      }
    )
    // setMessages([...messages,{
    //   message:input,
    //   recipient:number,
    //   sender:phoneNumber,
    //   sentAt:serverTimestamp()
    // }])
    setInput('')
  }

  // const presentToast = (position: 'top' | 'middle' | 'bottom') => {
  //   present({
  //     message: 'Hello World!',
  //     duration: 1500,
  //     position: position,
  //   })
  // }

  useEffect(()=>{
    db.collection('messages')
     .where("recipient", "in", [number, phoneNumber])
     .orderBy("sentAt","asc")
  .get()
    .then((querySnapshot)=>{
      if(!querySnapshot.empty){
        const data = querySnapshot.docs.map((doc) => ({...doc?.data(),id:doc.id}));
        setMessages(data);
      }
    })
  },[])

  useEffect(() => {
    // const checkCameraPermission = async () => {
    //   const { Camera } = Plugins;
    //   const permission = await Camera.checkPermissions();
    //   setCameraPermission(permission.camera === 'granted');
    // };

    // const checkContactsPermission = async () => {
    //   const { Contacts } = Plugins;
    //   const permission = await Contacts.getPermissions();
    //   setContactsPermission(permission.contacts === 'granted');
    // };

    // checkCameraPermission();
    // checkContactsPermission();
    retrieveListOfContacts()
  }, [])

  return (
   <IonPage> 
   <Header title={name} url/>
    <IonContent>
   <IonGrid>
     <IonRow className="app ">
       {/* { contacts.length>0 && JSON.stringify(contacts)} */}
       <IonCol id="chat-scrollable"
         size="12"
         style={{"maxHeight": "calc(100vh - 165px)","overflowY":"auto"}}
       >
         {messages.map((msg: any) => (
           <div
             key={msg.id}
             className={`chat-bubble-block row  m-0 px-3 ${
              msg.sender === phoneNumber
                 ? 'justify-content-end'
                 : 'justify-content-start'
             }`}
           >
             <div className="chat-bubble col-6">
               <p className="m-0 p-2 text-white">
                 {/* {msg.id === id ? 'you' : 'stranger'}: */}
                  {msg.message}
               </p>
             </div>
           </div>
         ))}
       </IonCol>
       <IonItem
         color="light"
         lines="none"
         class="w-100 ion-align-items-end"
         style={{ position: 'fixed', bottom: '10px' }}
       >
         <IonTextarea
           autoGrow={true}
           className="form-control w-100"
           value={input}
           onIonChange={handleInput}
           placeholder="Enter your message"
         ></IonTextarea>
         <IonIcon
           icon={sendOutline}
           slot="end"
           onClick={(e) => {
             handleSubmit(e)
           }}
         />
       </IonItem>
     </IonRow>
   </IonGrid>
 </IonContent>
 </IonPage>
  )
}

export default IndividualChat
