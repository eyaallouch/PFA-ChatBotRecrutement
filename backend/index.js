const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Schéma pour les candidats
const CandidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Modèle pour les candidats
const CandidateModel = mongoose.model('CandidateRegister', CandidateSchema);

// Schéma pour les entreprises
const CompanySchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Modèle pour les entreprises
const CompanyModel = mongoose.model('CompanyRegister', CompanySchema);

mongoose.connect('mongodb://127.0.0.1:27017/chatBot');mongodb://localhost:27017/

// Point de terminaison pour l'enregistrement d'un candidat
app.post('/register/candidates', (req, res) => {
    const { name, email, password } = req.body;
    CandidateModel.findOne({ email: email })
    .then(candidate => {
        if(candidate){
            res.json("Candidate already registered")
        }
        else{
            CandidateModel.create({ name, email, password })
            .then(candidate => res.json(candidate))
            .catch(err => res.json(err))
        }
    })
});

// Point de terminaison pour l'enregistrement d'une entreprise
app.post('/register/companies', (req, res) => {
    const { name, email, password } = req.body;
    CompanyModel.findOne({ email: email })
    .then(company => {
        if(company){
            res.json("Company already registered")
        }
        else{
            CompanyModel.create({ name, email, password })
            .then(company => res.json(company))
            .catch(err => res.json(err))
        }
    })
});

// Point de terminaison pour l'authentification
app.post('/login', (req, res)=>{
    const { email, password } = req.body;
    CandidateModel.findOne({ email: email, password: password })
    .then(candidate => {
        if(candidate){
            res.json("Candidate Success");
        }
        else{
            CompanyModel.findOne({ email: email, password: password })
            .then(company => {
                if(company){
                    res.json("Company Success");
                }
                else{
                    res.json("Wrong email or password");
                }
            })
        }
    })
    .catch(err => res.json(err));
});
//rasa shell
const { exec } = require('child_process');
let rasaProcess = null;
let actionProcess = null;
const startRasa = (path, port, actionPort) => {
  // Stop any running Rasa processes
  if (rasaProcess) {
    rasaProcess.kill();
    console.log('Killed previous Rasa server process.');
  }
  if (actionProcess) {
    actionProcess.kill();
    console.log('Killed previous Rasa action server process.');
  }

  // Start Rasa action server
  actionProcess = exec(`cd ${path} && rasa run actions --port ${actionPort}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running Rasa actions: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Rasa actions stderr: ${stderr}`);
      return;
    }
    console.log(`Rasa actions stdout: ${stdout}`);
  });

  // Start Rasa server
  rasaProcess = exec(`cd ${path} && rasa run --cors "*" --enable-api --port ${port}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running Rasa: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Rasa stderr: ${stderr}`);
      return;
    }
    console.log(`Rasa stdout: ${stdout}`);
  });
};


app.post('/start-rasa', (req, res) => {
  const { model } = req.body;

  switch (model) {
    case 'index':
      startRasa('data/index', 5005, 5055);
      break;
    case 'candidat':
      startRasa('data/candidat', 5006, 5056);
      break;
    case 'RH':
      startRasa('data/RH',5007, 5057);
      break;
    default:
      return res.status(400).send('Invalid model');
  }

  res.send('Rasa started with model ' + model);
});

//*********** 
//Rasa connect*/
mongoose.connect('mongodb://127.0.0.1:27017/chatBot')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Définition du schéma de message
    const messageSchema = new mongoose.Schema({
      sender: String,
     // send_id: String,
      msg: String,
     timestamp: { type: Date, default: Date.now }
    });

    // Définition du schéma d'utilisateur
    const userSchema = new mongoose.Schema({
      user_email: String,//recup par la session
      messages: [messageSchema]
    });

    // Création du modèle User
    const User = mongoose.model('User', userSchema);
   // console.log(User);

    // Route pour gérer les nouveaux messages
    app.post('/api/messages', (req, res) => {
      const message = req.body;console.log("message **",message.request_temp);
     
      const userEmail=message.request_temp.sender_id;console.log("m=",userEmail);
      // Recherche de l'utilisateur avec le nom d'utilisateur "eya"
      
      User.findOne({ user_email: userEmail  })
        .then(user => {
          if (user) {
            // Si l'utilisateur est trouvé, ajoutez le nouveau message à son tableau de messages
            user.messages.push(message.request_temp);
            // Enregistrez les modifications dans la base de données
            return user.save();
          } else {
            // Si l'utilisateur n'est pas trouvé, créez un nouvel utilisateur avec le nom d'utilisateur "eya" et le nouveau message
            return User.create({
              user_email: userEmail,
          
              messages: [message.request_temp]
            });
          }
        })

        .then(() => {
          console.log('Message saved successfully:', message);
          res.send('Message received and saved successfully');
        })
        .catch((error) => {
          console.error('Error saving message:', error);
          res.status(500).send('Error saving message');
        });
    });
    

    // Démarrage du serveur
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
