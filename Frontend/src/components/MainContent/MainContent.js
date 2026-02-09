import React, { useState } from 'react';
import './MainContent.css';
import Card from '../Card/Card';

const MainContent = () => {
  const [count, setCount] = useState(0);

  const features = [
    {
      title: "Modern React",
      description: "Built with React 19.1.1 and modern JavaScript features",
      icon: "⚛️"
    },
    {
      title: "Component Structure",
      description: "Organized component architecture for scalable development",
      icon: "🏗️"
    },
    {
      title: "Responsive Design",
      description: "Mobile-first responsive design with CSS Grid and Flexbox",
      icon: "📱"
    },
    {
      title: "Development Ready",
      description: "Hot reload, testing setup, and build optimization included",
      icon: "🚀"
    }
  ];

  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-container">
          <h2>Welcome to Your React Environment</h2>
          <p>A modern, well-structured React application ready for development</p>
          
          <div className="counter-demo">
            <h3>Interactive Counter Demo</h3>
            <div className="counter">
              <button onClick={() => setCount(count - 1)}>-</button>
              <span className="count">{count}</span>
              <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <button 
              className="reset-btn"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h3>Features Included</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
