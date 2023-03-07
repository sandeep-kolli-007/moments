import { IonButton, IonInput, useIonToast } from "@ionic/react";
import { io } from "socket.io-client";
import { Plugins } from '@capacitor/core';
import React from 'react';
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
//styles
import './usersList.scss'
function UsersList() {
  const socket = io('https://moments-node.onrender.com');
  // const socket = io('wss://moments-node.web.app:3001');
  const [present] = useIonToast();
  const { Contacts } = Plugins;
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState('');
  const [sender, setSender] = useState('');
  const [id, setId] = useState('');
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    socket.on('chat message', (msg:any) => {
      setMessages([...messages, msg]);
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
    socket.emit('chat message', { message: input, sender: "sender",id:id });
    setInput('');
  };
  
  const  getContacts=async()=> {
    try {
      const result = await Contacts.getContacts();
      console.log('Contacts:', result.contacts);
    } catch (error) {
      console.error(error);
    }
  }
  // getContacts()
  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Hello World!',
      duration: 1500,
      position: position
    });
  };
  return (
    <Row className='app'>
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
    
    export default UsersList;