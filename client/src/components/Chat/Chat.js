import React, {useEffect, useState} from 'react'
import {user} from "../Join/Join"
import socketIO from "socket.io-client"
import "./Chat.css"
import send from "../../Images/send.png"
import Message from '../Message/Massage'
import closeIcon from "../../Images/closeIcon.jpg"
import ScrollToBottom from "react-scroll-to-bottom";


// const ENDPOINT= 'http://localhost:4000/';
const ENDPOINT= 'https://mernapp1.onrender.com';
let socket;

const Chat = () => {
    const [id, setid] = useState("")
    const [messages, setMessages] = useState([])
   
/////massage function///
 const sendMessage =()=>{
    const message = document.getElementById("chatInput").value;
    socket.emit("message", {message, id});
    document.getElementById("chatInput").value="";
 }


    useEffect(()=>{
        socket = socketIO(ENDPOINT,{transports:['websocket']});
        socket.on("connect", ()=>{
            alert("socket is connected")
            setid(socket.id)
        })

    console.log(socket)
        socket.emit("joined", {user:user})

        //////
        socket.on("welcome", (data)=>{
            setMessages([...messages, data]);
            console.log(data.user, data.message);

        })
        ////////
        socket.on("userJoined", (data)=>{
            setMessages([...messages, data]);
            console.log(data.user, data.message);

        })

        ///////
        socket.on("leave", (data)=>{
            setMessages([...messages, data]);
            console.log(data.user, data.message);

        })


        return ()=>{
            socket.emit('disconnected');
            socket.off();
            
        }
    }, [])
    
  
    /////
    useEffect(() => {
        socket.on('sendmsg', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])
  return (

    <div className="chatPage">
    <div className="chatContainer">
        <div className="header">
            <h2>WeChat</h2>
            <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
        <ScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ ScrollToBottom>
        <div className="inputBox">
            <input   onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : null} type="text" id="chatInput" />
            <button onClick ={sendMessage} className="sendBtn"><img src={send} alt="Send" /></button>
        </div>
    </div>

</div>
  )
}

export default Chat