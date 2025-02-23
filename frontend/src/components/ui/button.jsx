import React from 'react';

export const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`button ${className || ''}`}>
    {children}
  </button>
);
