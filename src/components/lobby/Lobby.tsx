
import React, { useState} from 'react';

function Lobby({socket}: any) {


  const [isDisable, setIsDisabel] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('joined', name)

    console.log(socket.id)
    setIsDisabel(true)
  }



  return (
    <div>
      <h1 >Ingrese a su chat</h1>
      <form onSubmit={handleSubmit} className="bg-zinc-200 p-10">
        <h2>Digite un nombre de usuario</h2>
        <input style={{"color":"black"}} placeholder='user'  disabled={isDisable} value={name} onChange={e => setName(e.target.value)}/>
        <button >send</button>
       
      </form>

    </div>
  );
}

export default Lobby;
