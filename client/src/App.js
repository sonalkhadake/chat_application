// import socketIO from "socket.io-client"
import React from "react"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

// const ENDPOINT= 'http://localhost:4000/';
// const socket = socketIO(ENDPOINT,{transports:['websocket']});



function App() {

  return (
    <div className="App">
       <BrowserRouter>
   
          <Routes>
            <Route exact path="/" element={<Join/>} />
            <Route  path="/chat" element={<Chat/>} />
       



          </Routes>
  
      </BrowserRouter>
    </div>
  );
}

export default App;
