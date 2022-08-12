
const http = require("http")
const express = require("express")
const app = express();
const port = process.env.PORT || 4000
var cors = require('cors')
const socketIO = require("socket.io")

const server = http.createServer(app)


////import socket.io///
const io = socketIO(server)
const users =[{}]




////middlewares/////
app.use(cors())

app.get("/", (req,res)=>{
    res.send("hellow world")
})


// io.on("connection",(socket)=>{
//     console.log("new connection")

//     socket.on("joined", ({user})=>{
//         users[socket.id]=user
//       console.log(`${user} has joined a chat`)
//       socket.broadcast.emit("userJoined", {user:"Admin", message:`${users[socket.id]} has joined `})

//       socket.emit("welcome", {user:"Admin", message:"Welcome to the chat"})
//     })

// socket.on("message",(message,Id)=>{
//     /////display message for whole chat//
//     io.emit("sendmsg", {user:users[Id], message, Id})

// })

//    socket.on("disconnected",()=>{
//     socket.broadcast.emit("leave", {user:"Admin", message:`${users[socket.id]} has left the chat`})
//     console.log("user left")
//    })
   
// })
io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Hi ${users[socket.id]}, Welcome to the chat`})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendmsg',{user:users[id],message,id});
    })

    socket.on('disconnected',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});


server.listen(port, ()=>{
    console.log(`your server is running at port http://localhost:${port}`)
})