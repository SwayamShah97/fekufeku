import React, { useState, useEffect } from 'react';

export default function GamePage() {
  const [sequence, setSequence] = useState('');
  const [input, setInput] = useState('');
  const [flipped, setFlipped] = useState(false);
  const [errorType, setErrorType] = useState('');

  const generateSequence = () => {
    const length = Math.floor(Math.random() * 3) + 10; // length 10-12
    const seq = Array.from({ length }, () => (Math.random() > 0.5 ? 'b' : 'd')).join('').toLowerCase();
    setSequence(seq);
    setInput('');
    setFlipped(false);
    setErrorType('');
  };

  useEffect(() => {
    generateSequence();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (!/^\d+$/.test(trimmed)) {
      setErrorType('invalid');
      const audio = new Audio('/ralert.mp3');
      audio.play();
    } else {
      setErrorType('wrong');
      const audio = new Audio('/feku.mp3');
      audio.play();
    }
  
    setFlipped(true);
  };

  const handleRetry = () => {
    generateSequence();
  };

  return (
    <div className="page">
      {!flipped ? (
        <div className="card">
          <h2 className="gameTitle">How many b's are there?</h2>
          <p className="description lowercase-display" style={{ fontSize: '2rem', letterSpacing: '6px' }}>{sequence}</p>
          <form onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
            <div className="input-field">
              <input
                type="text"
                id="guess"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <label htmlFor="guess">Enter number</label>
            </div>
            <button type="submit" className="styled-submit">
              Submit
            </button>
          </form>

        </div>
      ) : (
        <div className="card">
          {errorType === 'invalid' ? (
            <>
              <img src="/ralert.gif" alt="Retard Alert" style={{ width: 'auto', height: '300px', objectFit: 'contain' }} />
              <h2 className="title" style={{  paddingTop:"20px", paddingBottom:"10px", color: 'black', marginTop: '20px' }}>Enter a number bruh!</h2>
            </>
          ) : (
            <>
              <img src="/wrong.jpeg" alt="Wrong!" style={{ paddingBottom:"20px", width: '250px', height: '350px', alignSelf: "center" }} />
              <h2 className="title" style={{ paddingBottom:"20px", color: 'black', marginTop: '20px' }}>Sorry 🤕 You're dyslexic.</h2>
            </>
          )}
          <button onClick={handleRetry} className="tryagain">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}