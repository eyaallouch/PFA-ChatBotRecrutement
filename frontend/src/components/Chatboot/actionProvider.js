import axios from 'axios';

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    //...rest
    currentPort  // Accept currentPort in the constructor
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
   this.currentPort = currentPort; // Store currentPort
   //this.userContext = useContext(UserContext);// Utilisez useContext pour obtenir userName
   this.userName = localStorage.getItem('userName'); // Get userName from localStorag
  };
  // Méthode pour gérer la saisie de l'email de l'utilisateur
  handleUserEmail = (email) => {
    localStorage.setItem('userName', email);
    this.userName = email;
    const message = this.createChatBotMessage(`Merci, ${email}. Comment puis-je vous aider ?`);
    this.setChatbotMessage(message);
  }

  // Méthode pour afficher un message demandant l'email de l'utilisateur
  requestUserEmail = () => {
    const message = this.createChatBotMessage("Merci de saisir votre email avant de continuer", {
      widget: "userEmailInput"
    });
    this.setChatbotMessage(message);
  }
  // Méthode pour envoyer un message au serveur
  sendMessageBotToServer = async (message) => {
    try {
     // const name = "test@email"; // Le nom de l'utilisateur (à partir de la session ou d'une autre source)
  const emailUser=localStorage.getItem('userName');
console.log(emailUser); 
      const request_temp = { sender: "bot", sender_id: emailUser, msg: message.message, timestamp: Date.now() };
      console.log(request_temp);
      await axios.post('http://localhost:3001/api/messages', { request_temp });
      console.log('Message sent to server:', message);
    } catch (error) {
      console.error('Error sending message to server:', error);
    }
  }

  // Méthode pour gérer le message "Hello World"
  helloWordHandler = () => {
    const message = this.createChatBotMessage("Hello, How can I help you? :)");
    this.setChatbotMessage(message);
  }

  // Méthode pour appeler l'API Rasa
  rasaAPI = async ( msg) => {

    if (!this.userName) {
      this.requestUserEmail();
      return;
    }
    console.log("Reçu");
   // console.log('hhh:${this.currentPort.currentPort}');//${this.currentPort.currentPort}
   console.log(`port pour le testé:${this.currentPort.currentPort}`);

    try {
      const response = await fetch(`http://localhost:${this.currentPort.currentPort}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'charset': 'UTF-8',
        },
        credentials: "same-origin",
        body: JSON.stringify({"message": msg }),
      });

      const responseData = await response.json();

      if (responseData && responseData.length > 0) {
        console.log("Réponse reçue !");
        const temp = responseData[0];
        const recipient_id = temp["recipient_id"];
        const recipient_msg = temp["text"];
        const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
        console.log(response_temp);

        const message = this.createChatBotMessage(recipient_msg);
        this.setChatbotMessage(message);
        this.sendMessageBotToServer(message);
      }
      else{
        const message = this.createChatBotMessage("Je ne comprend pas bien ");
        this.setChatbotMessage(message);
        this.sendMessageBotToServer(message);}
    } catch (error) {
      console.error('Error calling Rasa API:', error);
    }
  }

  // Méthode pour définir un message du chatbot dans l'état
  setChatbotMessage = (message) => {
    this.setState(state => ({ ...state, messages: [...state.messages, message] }));
  }

  // Méthode pour choisir un genre (exemple)
  chooseGenre = () => {
    const message = this.createChatBotMessage(
      "Aus welchem Genre soll das Buch sein? Wenn du nach einem anderen Genre suchst, tippe den Namen ein.",
      {
        widget: "genre"
      }
    );
    this.setChatbotMessage(message);
  };
}

export default ActionProvider;
