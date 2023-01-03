import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateRoom from "../components/createRoom/CreateRoom";
import JoinRoom from "../components/joinRoom/JoinRoom"; 
import Lobby from "../components/lobby/Lobby";
import Rooms from "../components/Rooms/Rooms";
import App from "../App";

import io from 'socket.io-client';
import '../App.css';

const socket = io('http://localhost:4000',{
query:{
  "key":"asdasfa9wa90" //asdasfa9wa90
}
})

interface messagesList {
    body: string,
    from: string,
    room: string
  }

const Router = () => {

    const [message, setMessage] = useState<messagesList>({
        body:'',
        from:'',
        room:''
      })
    
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby socket={socket} />}></Route>
          <Route path="home" element={<App />}></Route>

          <Route path="lobby" element={<Lobby socket={socket} />}></Route>
          <Route path="join-room" element={<JoinRoom socket={socket} />}></Route>
          <Route path="create-room" element={ <CreateRoom  socket={socket} room={(e: any)=>setMessage({body:'',from:'',room:e})} />}></Route>
          <Route path="rooms" element={<Rooms socket={socket} data={message}/>}></Route>
       
          <Route path="*" element={<h1>404</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </ div>
  );
};
export default Router;