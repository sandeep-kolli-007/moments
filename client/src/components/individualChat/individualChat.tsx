import { IonButton, IonInput, useIonToast } from "@ionic/react";
import { io } from "socket.io-client";
import { Plugins } from '@capacitor/core';

import React from 'react';
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
//styles
import './individualChat.scss'
// import { Contacts, Contact, ContactField, ContactName,ContactFindOptions } from '@ionic-native/contacts';
import { any } from "prop-types";
import { Contacts } from '@capacitor-community/contacts';
import { log } from "console";
// import { Contacts } from '@capacitor-community/contacts';
import { db } from '../../index';

import { updateDoc, serverTimestamp } from "firebase/firestore";

function IndividualChat({phoneNumber}:any) {
    let navigator: Navigator & { contacts: any };
  const socket = io('https://moments-node.onrender.com');
  const [present] = useIonToast();
  const [contacts, setContacts] = useState<Array<any>>([]);
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState('');
  const [sender, setSender] = useState('');
  const [id, setId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { Permissions } = Plugins;
  const [cameraPermission, setCameraPermission] = useState(false);
  const [contactsPermission, setContactsPermission] = useState(false);
const { Camera, Contacts } = Plugins;
// Example: Get all documents in a collection
const usersData = [
  { name: "John", age: 25 ,serverTimestamp:serverTimestamp()},
  { name: "Alice", age: 30 ,serverTimestamp:serverTimestamp()},
  { name: "Bob", age: 35 ,serverTimestamp:serverTimestamp()},
];

// Add the dummy data to Firestore
// usersData.forEach((user) => {
//   db.collection("users").add(user);
// });
db.collection('users').get().then((querySnapshot:any) => {
  querySnapshot.forEach((doc:any) => {
    console.log(doc.data());
  });
});
const retrieveListOfContacts = async () => {
  const projection = {
    // Specify which fields should be retrieved.
    name: true,
    phones: true
  };

  const result = await Contacts.getContacts({
    projection,
  });
  if(result?.contacts?.length>0){
 setContacts(result.contacts.map((c:any)=>({"name":c?.name?.display,"phoneNumber": c.phones ? c?.phones.map((ph:any)=>ph?.number) :[]})));
  }
};

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
    socket.on('chat message', (msg:any) => {
      setMessages([...messages, msg]);
      console.log("j")
    });
  }, [messages]);
  
  useEffect(()=>{
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      setId(socket.id)
    });
  },[])
  
  const handleInput = (e:any) => {
    setInput(e.target.value);
  };
  
  const handleSender = (e:any) => {
    setSender(e.target.value);
  };
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    socket.emit('chat message', { message: input, sender: phoneNumber});
    setInput('');
  };
  
 
  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Hello World!',
      duration: 1500,
      position: position
    });
  };

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
    retrieveListOfContacts();
  }, []);
  

 

  return (
    <Row className='app'>
      {phoneNumber}
     { contacts.length>0 && JSON.stringify(contacts)}
    <div style={{height:"100vh"}}>
    <div style={{position: "fixed",width:"100%",
    bottom: "16px"}}>
    {messages.map((msg:any, i:number) => (
      <div key={i} className={`chat-bubble-block row  m-0 px-3 ${msg.id === id ?'justify-content-end':"justify-content-start"}`}>
      <div className='chat-bubble col-6'>
      <p className='m-0 p-2 text-white' key={i}>{msg.id === id ?"you": "stranger"}: {msg.message}</p>
      </div>
      </div>  
      ))} 
   
      <Row className='mx-0'>
      <Col>
      <IonInput className='form-control  w-100' type="text" value={input} onIonChange={handleInput} placeholder="Enter your message" ></IonInput></Col>
      <IonButton  className="w-auto h-auto" size="default" onClick={(e)=>{handleSubmit(e)}}>Send</IonButton>
      </Row>
      </div>
      </div>
     
      </Row>
      );
    }
    
    export default IndividualChat;