import './App.css';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';


const socket = io('http://localhost:4000')

interface messagesList {
  body: string,
  from: string
}


function App() {
  const [message, setMessage] = useState<messagesList>({
    body:'',
    from:''
  })
  const [messages, setMessages] = useState<messagesList[]>([])
  const [isDisable, setIsDisabel] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('message', newmessage(message.body,name))
    setMessages([newmessage(message.body,'me'), ...messages])
    setMessage(newmessage('',''))
    setIsDisabel(true)
  }

  const newmessage = (body: string, from: string) =>{
    return {
      body,
      from
    }
  }
  useEffect(() => {

    const receiveMessage = (message: messagesList) =>{
      setMessages([message, ...messages])
    }
    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [messages])

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center flex-col rounded">
      <h1 className='text-2xl font-bold'>Chat</h1>
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <div className='flex flex-col gap-3'>
        <input placeholder='user' className='border-2 border-zinc-500 p-2 text-black ' disabled={isDisable} value={name} onChange={e => setName(e.target.value)}/>
       <div>
        <input placeholder='message' className='border-2 border-zinc-500 p-2 text-black ' type="text" value={message.body} onChange={e => setMessage(newmessage(e.target.value, ''))} />
        <button className=' ml-5 bg-blue-500 rounded p-2'>send</button>
        </div>
        </div>
       

        <ul className='h-80 overflow-y-auto mt-5'>
        {messages.map((message, index) => (
          <li key={index} className={`relative mr-2 p-2 my-2 table rounded-md ${message.from === 'me' ? " bg-sky-700 ml-auto": "bg-black"}`}>
            <p><strong>{message.from}: </strong>{message.body}</p>
            <span style={{
              "position":"absolute",
              "bottom":"0",
              "left":"32px",
              "borderTop": "16px solid transparent",
              /* border-left: 43px solid rgb(240, 173, 78); */
              "borderLeft": "18px solid rgb(240, 173, 78)",
              "borderBottom": "0px solid rgb(240, 173, 78)",
     }}></span>
          </li>
        ))}
      </ul>
      </form>



    </div>
  );
}

export default App;
