//import React from 'react';
import React from "react";
import styles from "./Header.module.css";
import chatbotBanner from "../../public/botHome.png";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
const Accueil = () => {
    return (
      <>
      <br />
        <div className="container text-center mt-5">
    
            <div className="d-grid gap-3 col-6 mx-auto">
                <Link to="/register/candidate" className="btn btn-primary">Candidate</Link>
                <Link to="/register/company" className="btn btn-secondary">Company</Link>
            </div>
        </div>

<br />
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.heading}>
              "Unlock Productivity with an AI ChatBot by your Side"
            </p>
            <p className={styles.subHeading}>
              IntelliChat is a OpenAI powered tool that brings AI chatbots to the
              next level of sophistication and intelligence. IntelliChat can engage
              in multi-turn conversations, remembering previous interactions and
              providing relevant follow-up responses.
            </p>
          
              <button className={styles.btn}>Get Started</button>
      
          </div>
          <div className={styles.right}>
            <img src={chatbotBanner} alt="AI" />
          </div>
        </div>
        </>
      );
}

export default Accueil;
