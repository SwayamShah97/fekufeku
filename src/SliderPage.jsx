import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const cards = [
  {
    title: 'Card 1',
    image: '/image1.jpeg',
    description: 'If you stir water counterclockwise in the Southern Hemisphere, it becomes alkaline.'
  },
  {
    title: 'Card 2',
    image: '/image2.jpeg',
    description: 'Watering your plants with water that has soaked Tulsi leaves makes them grow faster.'
  },
  {
    title: 'Card 3',
    image: '/image3.jpeg',
    description: 'You burn more calories sleeping during a thunderstorm because the brain is more alert subconsciously.'
  },
  {
    title: 'Card 4',
    image: '/image4.jpeg',
    description: 'Certain snowflakes have hexagonal patterns so perfect they’ve been used to model microchip designs.'
  },
  {
    title: 'Card 5',
    image: '/image5.jpeg',
    description: 'Some clouds move faster because they were trained near airports.'
  },
];

export default function SliderPage() {
  const [index, setIndex] = useState(0);

  const prevCard = () => setIndex((index - 1 + cards.length) % cards.length);
  const nextCard = () => setIndex((index + 1) % cards.length);

  return (
    <div className="page">
      <h2 className="title">{`Feku Fact #${index+1}`}</h2>
      <div className="card-slider">
        <button onClick={prevCard}><FaArrowLeft size={24} /></button>
        <div className="card">
          <img src={cards[index].image} alt="card" className='card-image'/>
          <p>{cards[index].description}</p>
        </div>
        <button onClick={nextCard}><FaArrowRight size={24} /></button>
      </div>
    </div>
  );
}