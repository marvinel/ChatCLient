
import React, { useState} from 'react';
//import './style.css';

function JoinRoom({socket}: any) {

  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('joinroom', name)
  }

  return (
    <div className='CreateRoom'>
      <h1 >Ingrese a su chat</h1>
      <form onSubmit={handleSubmit} className='CreateForm'>
        <h2>Digite de la sala</h2>
        <input className='CreateInput' style={{"color":"black"}} placeholder='Nombre de sala'  value={name} onChange={e => setName(e.target.value)}/>
        <button className='CreateButtom' >send</button>
       
      </form>

    </div>
  );
}

export default JoinRoom;
