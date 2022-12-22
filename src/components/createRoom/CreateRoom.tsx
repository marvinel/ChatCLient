
import React, { useState} from 'react';

function CreateRoom({socket, room}: any) {

  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('createroom', name)
    room(name)
  }

  return (
    <div>
      <h1 >Crea una sala de chat</h1>
      <form onSubmit={handleSubmit} className="bg-zinc-200 p-10">
        <h2>Digite el nombre de su sala</h2>
        <input style={{"color":"black"}} placeholder='Room123'   value={name} onChange={e => setName(e.target.value)}/>
        <button >send</button>
       
      </form>

    </div>
  );
}

export default CreateRoom;
