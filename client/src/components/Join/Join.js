import React,{useState} from 'react'
import "./Join.css"
import{Link} from "react-router-dom"
import logo from "../../Images/logo.jpg"

let user;
const Join = () => {

    const [name, setname] = useState("");

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt="logo"/>
            <h1>WeChat</h1>
            <input onChange={(e) => setname(e.target.value)} placeholder='Enter your name' type="text" id = "joinInput"/>
            <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat"><button onClick ={sendUser} className='joinbtn'>LOGIN</button></Link>
        </div>
    </div>
  )
}

export default Join
export {user}  
