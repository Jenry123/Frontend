import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Menu = ({ buttons }) => {
  const sliderRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const handleTouchStart = (e) => {
    if (sliderRef.current) {
      const touch = e.touches[0];
      setTouchStartX(touch.clientX);
      setScrollStartX(sliderRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e) => {
    if (sliderRef.current) {
      const touch = e.touches[0];
      const moveX = touch.clientX - touchStartX;
      sliderRef.current.scrollLeft = scrollStartX - moveX;
    }
  };

  return (
    <div className="slider-container" ref={sliderRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <div className="slider-content">
        {buttons.map((button, index) => (
          <NavLink 
            to={button.path} 
            key={index}
            className={({ isActive }) => isActive ? "btn btn-primary active-button" : "btn btn-primary inactive-button"}
          >
            {button.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Menu;

