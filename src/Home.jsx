import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function getRandomPositionAvoidingMultipleZones(excludeBoxes, size = 50) {
  let top, left, iconBox;
  let attempts = 0;

  do {
    top = Math.random() * (window.innerHeight - size);
    left = Math.random() * (window.innerWidth - size);

    iconBox = {
      top,
      left,
      bottom: top + size,
      right: left + size
    };

    const overlaps = excludeBoxes.some((box) =>
      !(iconBox.right < box.left || iconBox.left > box.right || iconBox.bottom < box.top || iconBox.top > box.bottom)
    );

    if (!overlaps) break;
    attempts++;
  } while (attempts < 100);

  return { top, left };
}

export default function Home() {
  const titleRef = useRef();
  const descRef = useRef();
  const [floatingIcons, setFloatingIcons] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const boxes = [];
  
      if (titleRef.current) {
        const box = titleRef.current.getBoundingClientRect();
        console.log("Title box:", box); // 👈 check this in dev tools
        boxes.push(box);
      }
  
      if (descRef.current) {
        const box = descRef.current.getBoundingClientRect();
        console.log("Desc box:", box);
        boxes.push(box);
      }
  
      const icons = [];
  
      for (let i = 0; i < 25; i++) {
        const pos = getRandomPositionAvoidingMultipleZones(boxes);
        icons.push(pos);
      }
  
      setFloatingIcons(icons);
    }, 0); // ensures refs are fully rendered before measuring
  }, []);

  return (
    <div className="homepage home-layout">
      {/* Floating Icons */}
      <div className="floating-icons-global">
        {floatingIcons.map((pos, i) => (
          <img
            key={i}
            src="/rotate.jpeg"
            className="floating-icon-global"
            style={{
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              zIndex: 0,
              filter: 'brightness(1.4)',
            }}
            alt="floating"
          />
        ))}
      </div>

      {/* Side Image */}
      <img
        src="/icecream.jpeg"
        alt="Left"
        className="side-image"
        style={{ zIndex: 2, position: 'relative' }}
      />

      {/* Main Content */}
      <div className="home-content" style={{ zIndex: 2, position: 'relative' }}>
        <h1 className="homeTitle" ref={titleRef}>Welcome to FekuFeku.com</h1>
        <img src="/mitler.jpeg" alt="My Friend" className="friend-image" />
        <p className="homedescription" ref={descRef}>
          This webpage is dedicated to FekuMaharaj Meeth Baba. Over the years Baba's feku facts have baffled people around him,
          leaving each bhakt wondering if the fact was a story with just a bit of mirch masala or 100% horse shit.
        </p>
        <div className="buttons">
          <Link to="/slider">
            <button className="btn">Feku Facts</button>
          </Link>
          <Link to="/game">
            <button className="btn">Feku Game</button>
          </Link>
        </div>
      </div>

      {/* Right Side Image */}
      <img
        src="/meetursa.jpeg"
        alt="Right"
        className="side-image"
        style={{ zIndex: 2, position: 'relative' }}
      />
    </div>
  );
}
