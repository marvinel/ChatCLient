
import React, { useState} from 'react';
import './style.css';
import {  useNavigate } from 'react-router-dom';
function CreateRoom({socket, room}: any) {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('createroom', name)
    room(name)
    navigate("/rooms");
  }

  return (
    <div className='CreateRoom'>
      <h1 >Crea una sala de chat</h1>
      <form onSubmit={handleSubmit} className='CreateForm'>
        <h2>Digite el nombre de su sala: {socket.id}</h2>
        <input className='CreateInput' style={{"color":"black"}} placeholder='Room123'   value={name} onChange={e => setName(e.target.value)}/>
        <button className='CreateButtom'>send</button>
       
      </form>

    </div>
  );
}

export default CreateRoom;
