// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import UserEmailInput from "./UserEmailInput";
import bootAvatar from "../../../public/chatbot.png";
import Help from "../Choises/Help";
import Genre from "../Choises/Genre";
const botName = 'Rec-Inov Bot';
const config = {



   initialMessages: [createChatBotMessage(`Bonjour bienvenu sur notre site, je suis ${botName} pour vous aidez`),
  // createChatBotMessage(`choise a subject?`, {
   // widget: "help"
 // })
  
  ],
  botName: botName,
 
   customStyles: {
    botMessageBox: {
      backgroundColor:  '#4DB9D1',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  widgets: [
    {
      widgetName: "userEmailInput",
      widgetFunc: (props) => <UserEmailInput {...props} />,
    },
    {
      widgetName: "help",
      widgetFunc: (props) => <Help {...props} />
    },
    {
      widgetName: "genre",
      widgetFunc: (props) => <Genre {...props} />
    },
    {
      widgetName: "author",
      widgetFunc: (props) => <Author {...props} />
    },
    {
      widgetName: "book",
      widgetFunc: (props) => <Book {...props} />
    },
    {
      widgetName: "choices",
      widgetFunc: (props) => <Choices {...props} />
    },
    {
      widgetName: "newChoices",
      widgetFunc: (props) => <NewChoices {...props} />
    }
  ],
  customComponents: {
    botAvatar: (props) => (
      <div className="chat-bot-avatar" style={{ width: '30px', height: '30px' }}>
        <img src={bootAvatar} style={{ width: '100%', height: '100%' }} />
      </div>
    )
  }
  
   }
  /* function config() {
    return (

      
            <Test />
      
    ); */
//}
export default config