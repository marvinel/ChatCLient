
import React, { useState} from 'react';
import './style.css';
import {  useNavigate } from 'react-router-dom';

function Lobby({socket}: any) {
  const navigate = useNavigate();

  
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('joined', name)


    navigate("/create-room");
  }

  return (
    <div className='wrapper-lobby' >
      <h1 >Ingrese a su chat</h1>
      <form onSubmit={handleSubmit} className="form-lobby">
        <label >Nick </label><input className='input-lobby' type='text' placeholder='user' value={name} onChange={e => setName(e.target.value)}/>
        
        <button className='button-lobby' > Send </button>
       
      </form>

    </div>
  );
}

export default Lobby;
