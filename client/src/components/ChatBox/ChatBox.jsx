import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatBox.css'
import { getAllMessages } from "./../../actions/message";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const ChatBox = (prop) => {


  const dispatch = useDispatch();
  const chat = useSelector((state) => state.messagesReducer);
  useEffect(() => {
    dispatch(getAllMessages(prop.from.result._id, prop.to._id));

  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllMessages(prop.from.result._id, prop.to._id));

  }, [dispatch]);

  useEffect(() => {
    setMessages(chat.data ?? []);
  }, [chat]);

  const socket = io('http://localhost:8200');
  socket.on('connect', function () {
    console.log('Connected to server');  // Log when connected
  });
  socket.on('disconnect', function () {
    console.log('Disconnected from server');  // Log when disconnected
  });

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {

      if ((data.to == prop.from.result._id && data.from == prop.to._id) || data.from == prop.from.result._id && data.to == prop.to._id)
        setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { from: prop.from.result._id, to: prop.to._id, message });
    setMessage('');
  };


  return (

    <div class="chat-container">
      <div class="header">
        <div class="user-details">

          <div class="user-info">
            <h5>{prop.to.name}</h5>
          </div>
        </div>
      </div>
      <div class="body">

        {messages.map((msg, index) => (


          <div key={index}>
            {

              prop.from.result._id == msg.from ?
                <div class="chat-box sender text-move-right">
                  <p>{msg.message}</p>
                </div>
                : <div></div>
            }
            {
              prop.from.result._id == msg.to ?
                <div class="chat-box receiver ">
                  <p>{msg.message}</p>
                </div>
                : <div></div>
            }
          </div>
        ))}
      </div>
      <div class="input-container">
        <input type="text" placeholder="Type a message..." id="messageInput" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>
          <svg fill="#fff" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z" />
          </svg>
        </button>
      </div>
    </div>

  );
};

export default ChatBox;
