import './App.css';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import Lobby from './components/lobby/Lobby'
import CreateRoom from './components/createRoom/CreateRoom';
import JoinRoom from './components/joinRoom/JoinRoom';

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


function App() {
  const [message, setMessage] = useState<messagesList>({
    body:'',
    from:'',
    room:''
  })

  

  const [joined, setJoined] = useState<string>('')
  const [messages, setMessages] = useState<messagesList[]>([])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    socket.emit('message', message)


    setMessages([newmessage(message.body,'me'), ...messages])
    setMessage(newmessage('',''))

  }
  const newmessage = (body: string, from: string) =>{

    const room: string=message.room;
    return {
      body,
      from,
      room
    }
  }
  const handleClick=()=>{
      socket.emit('joined', 'usuario1')
  }


  useEffect(() => {
    socket.on('Connect', ()=>{
      console.log("User connected: "+ socket.id)
    })
    socket.on('joined', (data)=>{
      setJoined(data)

    })
    
    const receiveMessage = (message: messagesList) =>{
      console.log("mensaje lo emite: "+ message.from)
      setMessages([message, ...messages])
    }

    socket.on('message', receiveMessage)



    return () => {
      socket.off('message', receiveMessage)
    }


  }, [messages])



  return (
    <div> 
      <Lobby socket={socket}/>
      
      <CreateRoom  socket={socket} room={(e: any)=>setMessage({body:'',from:'',room:e})} />

      <JoinRoom socket={socket} />
      <h1 >Chat</h1>
      <button onClick={handleClick}>entrar</button>


      <p>se acaba de unir: {joined}</p>
      <form onSubmit={handleSubmit}>

        <input placeholder='message'  type="text" value={message.body} onChange={e => setMessage(newmessage(e.target.value, ''))} />
        <button >send</button>
  
        <ul>
        {messages.map((message, index) => (
          <li key={index} >
            <div>
            <p>{message.from}: {message.body}</p>
            </div>
          </li>
        ))}
      </ul>
      </form>

    </div>
  );
}

export default App;
