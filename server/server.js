
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

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Hi ${users[socket.id]}, Welcome to the chat`})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendmsg',{user:users[id],message,id});
    })

    socket.on('disconnected',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has joined`});
    })
});


server.listen(port, ()=>{
    console.log(`your server is running at port http://localhost:${port}`)
})