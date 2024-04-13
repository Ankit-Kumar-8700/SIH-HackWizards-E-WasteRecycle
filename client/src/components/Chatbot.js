import React, { useState, useEffect, useRef } from "react";
import chatbot from "../img/chatbot.png";
const Chatbot = () => {
  const [visible,setVisible]=useState(false)
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    // Add user's message to the chat
    // setMessages([...messages, { text: inputText, type: "user" }]);
    // setInputText("");
    
    // You can send the user's message to a chatbot API for a response here
    // For this example, we'll simulate a response after a short delay

    // Send user message to server for processing
    // const botResponse = "This is a sample response from the chatbot.";
    fetch('http://127.0.0.1:5000/get_response', {
      method: 'POST',
      body: new URLSearchParams({ 'user_message': inputText }),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  .then(response => response.json())
  .then(data => {
      const botResponse=data.response;
      setMessages([...messages, { text: inputText, type: "user" } , { text: botResponse, type: "bot" }]);
      setInputText("");
  })
  .catch(error => console.error('Error:', error));

  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    <div className={`fixed z-20 right-2 bottom-0  ${visible?"hidden":""}`} onClick={()=>{setVisible(!visible)}} >
    <span class="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-sky-400 opacity-75 bottom-12 right-8"></span>
      <img src={chatbot} className="animate-bounce rounded-full h-32" alt="bot.png" />
    </div>
    <div className={`transition-all duration-300 ease-in bg-blue-100 rounded shadow-4xl flex flex-col fixed z-20 right-0 bottom-0 ${visible?"w-96 h-full pt-5":"w-0 h-0 pt-0"} max-w-[100vw]`}>
      <div className="flex justify-between px-2">
        <div className="font-bold text-xl">
          Dhale-Bot
        </div>
        <div className="cursor-pointer" onClick={()=>{setVisible(!visible)}} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div className="flex-grow px-4 overflow-hidden">
        <div
          className="mb-4 h-full"
          style={{
            overflowY: 'scroll',
            paddingRight: '16px', // Adjust for scrollbar width (if needed)
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
          }}
        >
              <div
                className={'bg-white mt-10 text-gray-800 text-left float-left rounded-lg px-4 py-2 mb-2 max-w-[15rem]'}
              >
                Hello, nice to meet you. I am Dhale-Bot made by another Dhale.
              </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-slate-500"
            >
              <div
                className={`${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white self-end text-right float-right'
                    : 'bg-white text-gray-800 text-left float-left '
                } rounded-lg px-4 py-2 mb-2 max-w-[15rem] min-w-[7rem]`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div className="float-left" ref={messagesEndRef}></div>
          
      </div>
        
      </div>

      <form onSubmit={handleSubmit} className="bg-blue-100 p-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Chatbot;
