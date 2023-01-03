
import React, { useState} from 'react';


interface messagesList {
  body: string,
  from: string,
  room: string
}

function Rooms({socket, data}: any) {

  const [message, setMessage] = useState<messagesList>(data)
  const [joined, setJoined] = useState<string>('')
  const [messages, setMessages] = useState<messagesList[]>([])
  const newmessage = (body: string, from: string) =>{

    const room: string=message.room;
    return {
      body,
      from,
      room
    }
  }
  const handleSubmit = (e: React.SyntheticEvent) => {

    e.preventDefault()
    socket.emit('message', message)
    setMessages([newmessage(message.body,'me'), ...messages])
    setMessage(newmessage('',''))

  }

  socket.on('Connect', ()=>{
    console.log("User connected: "+ socket.id)
  })
  socket.on('joined', (data: any)=>{
    setJoined(data)
  })
  const receiveMessage = (message: messagesList) =>{
     
    setMessages([message, ...messages])
  }

  socket.on('message', receiveMessage)
  return (
    <div>
             <h1 >Chat</h1>
  

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

export default Rooms;
