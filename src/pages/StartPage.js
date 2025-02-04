import React, { useState } from 'react';

/**
 * StartPage:
 *  - Collects user email
 *  - Calls onStartQuiz callback with the email
 */
function StartPage({ onStartQuiz }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email to start the quiz!');
      return;
    }
    onStartQuiz(email);
  };

  return (
    <div className="container fade-in" style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>Welcome to the CausalFunnel Quiz!</h2>
      <p style={{ marginBottom: '20px' }}>
        Enter your email address to get started.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn">
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default StartPage;
