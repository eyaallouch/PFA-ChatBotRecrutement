import React, {useEffect, useState } from 'react';
import Accueil from './components/Accueil';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Company from './components/Company';
import Candidat from './components/Candidat';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useLocation } from 'react-router-dom';
//***for chat */

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "./components/Chatboot/MessageParser";
import ActionProvider from "./components/Chatboot/actionProvider";
import config from "./components/Chatboot/config";
import axios from 'axios';
import './App.css';

function App() {
//  const [data, setData] = useState('');//setData rempli le data
  const [chatBotVisible, setChatBotVisible] = useState(false);
  const [currentPort, setCurrentPort] = useState(5005); 
  let port = 5005;
  const location = useLocation();
  useEffect(() => {
    const checkUrlAndChangeModel = async () => {
      const path = location.pathname;

      let model = '';
      if (path === '/login') {
        model = 'index';
        port = 5005;
      } else if (path === '/candidat') {
        model = 'candidat';
        port = 5006;
      } else if (path === '/company') {
        model = 'RH';
        port = 5007;
      }

      if (model) {
        try {
          setCurrentPort(port);
          await axios.post('http://localhost:3001/start-rasa', { model });
          console.log(`Rasa model changed to ${model}`);
         // setCurrentPort(port); // Update the port state
        } catch (error) {
          console.error('Error changing Rasa model:', error);
        }
      }
    };

    checkUrlAndChangeModel()


  }, [location]);
 /*  const fetchData = () => {
    axios.get('http://localhost:3001/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }; */
  const toggleChatBotVisibility = () => {
    setChatBotVisible(!chatBotVisible);
  };
  return (
    <>
    <div style={{marginTop : '-3.5rem'}}>
     
      <Routes>
  <Route path="/" element={<Accueil />} />
  <Route path="/register/:type" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/company" element={<Company />} />
  <Route path="/candidat" element={<Candidat />} />
</Routes>
  
    </div>
       <button className="chatbot-toggle-button" onClick={toggleChatBotVisibility}>
       {chatBotVisible ? <i className="material-icons">close</i> : <i className="material-icons">chat</i>}
     </button>
     <div style={{ display: "flex", justifyContent: "center" }}>
     {chatBotVisible &&  <Chatbot
   currentPort={currentPort}
       className="chatbot-position"
         config={config}
         
         messageParser={MessageParser}
         actionProvider={ActionProvider}
      //  messageParser={(actionProvider, state) => new MessageParser(actionProvider, state)}
       // actionProvider={(createChatBotMessage, setStateFunc, createClientMessage, stateRef, createCustomMessage,{ currentPort }) => 
         // new ActionProvider(createChatBotMessage, setStateFunc, createClientMessage, stateRef, createCustomMessage, { currentPort })
      //  }
       />}
     </div>
 
   </>
  )
}

export default App
