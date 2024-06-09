import axios from 'axios'; // Importez Axios ou Fetch selon votre choix

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
   // this.userContext = useContext(UserContext);// Utilisez useContext pour obtenir userName
   this.userName = localStorage.getItem('userName'); // Get userName from localStorage
  }

  // Méthode pour envoyer un message au serveur
  sendMessageUserToServer = async (message) => {
    try {
  //  const name = "test@email"; // Le nom de l'utilisateur (à partir de la session ou d'une autre source)
   // const { name } = this.userContext;
   const emailUser=localStorage.getItem('userName');
      console.log("test en messagePar",emailUser);
      const request_temp = { sender: "user", sender_id: emailUser, msg: message ,timestamp:Date.now };
      console.log(request_temp);
      await axios.post('http://localhost:3001/api/messages',{request_temp} , {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Message sent to server:', message);
    } catch (error) {
      console.error('Error sending message to server:', error);
    }
  }
  

  parse(message) {
    console.log(this.state)
    console.log(message)
    if (!this.userName) {
      this.actionProvider.requestUserEmail();
      return;
    }

    if (message.toLowerCase().includes("hello word")) {
      this.actionProvider.helloWordHandler()
    }

    // Appel de la méthode pour envoyer le message au serveur
 this.actionProvider.rasaAPI(message);   
  this.sendMessageUserToServer(message);

    // Continuer avec le reste de la logique de parsing si nécessaire
  }
}

export default MessageParser;


 