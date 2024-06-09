import React from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import image from "../../public/espace-employeur-block.jpg";
const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName } = location.state || { userName: 'Guest' };

  const handleLogout = () => {
      // Supprime l'email du localStorage
      localStorage.removeItem('userName');
      // Redirige vers la page de login
      navigate('/login');
  };
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
       <nav className="navbar navbar-expand-lg navbar-light bg-primary" style={{ zIndex: 1000 }}>
        <div className="container-fluid">
       
          <button onClick={handleLogout} className="btn btn-light">
            Logout
          </button>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary" style={{ zIndex: 1000 }}>
        <div className="container-fluid">
        <div className="navbar-brand" href="#" style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            
            <img src="https://rec-inov.com/favicon.ico" alt="logo" width="30" height="30" className="d-inline-block align-text-top"/>
            Rec-inov
       
    </div>
          <button onClick={handleLogout} className="btn btn-light">
            Logout
          </button>
        </div>
      </nav>

      
      <br /><br />
      <div style={{ flex: 1, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        
      </div>
    </div>
  );
};

export default MyPage;