
import React, { useState} from 'react';

function JoinRoom({socket}: any) {

  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('joinroom', name)
  }

  return (
    <div>
      <h1 >Ingrese a su chat</h1>
      <form onSubmit={handleSubmit} className="bg-zinc-200 p-10">
        <h2>Digite de la sala</h2>
        <input style={{"color":"black"}} placeholder='Nombre de sala'  value={name} onChange={e => setName(e.target.value)}/>
        <button >send</button>
       
      </form>

    </div>
  );
}

export default JoinRoom;
