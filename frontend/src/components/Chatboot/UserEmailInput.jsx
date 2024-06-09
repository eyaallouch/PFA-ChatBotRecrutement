import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous que Bootstrap est importé

const UserEmailInput = ({ actionProvider }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    actionProvider.handleUserEmail(email);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
      <div className="form-group">
        <label htmlFor="userEmail" className="form-label">Enter your email:</label>
        <input
          type="email"
          id="userEmail"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2 text-success">Submit</button>
    </form>
  );
};

export default UserEmailInput;
