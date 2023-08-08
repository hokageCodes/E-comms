import React, { useState } from 'react';
import './hero.css';

const slides = [
  {
    title: 'T-Shirt / Tops',
    subtitle: 'Summer Value Pack',
    description: 'Cool / Colorful / Comfy.',
    buttonText: 'Shop Now',
    background: 'https://i.ibb.co/4mk535V/shop-hero-1-product-slide-1.jpg',
  },
  {
    title: 'New Collection',
    subtitle: 'Fall Fashion Trends',
    description: 'Discover the latest styles for the season.',
    buttonText: 'Explore',
    background: '../../assets/pslide.jpg',
  },
  {
    title: 'Accessories',
    subtitle: 'Complete Your Look',
    description: 'Find the perfect accessories to match your style.',
    buttonText: 'View Accessories',
    background: '../../assets/pslide.jpg',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <section className="hero-container">
      <div className="hero-content">
        <h4>{slides[currentSlide].title}</h4>
        <h1>{slides[currentSlide].subtitle}</h1>
        <p>{slides[currentSlide].description}</p>
        <a href="/">{slides[currentSlide].buttonText}</a>
      </div>

      <div className="hero-navigation">
        <button className="prev-button" onClick={prevSlide}>Prev</button>
        <div className="slide-bar">
          {slides.map((_, index) => (
            <div key={index} className={`slide-dot ${currentSlide === index ? 'active' : ''}`} />
          ))}
        </div>
        <button className="next-button" onClick={nextSlide}>Next</button>
      </div>
    </section>
  );
}