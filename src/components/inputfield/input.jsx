import React, { useState } from 'react';
import './input.css';

const Input = ({ onAddItem }) => {
  const [inpchange, setInpchange] = useState('');
  const [isChecked, setIsChecked] = useState(false);



  const handleChange = (event) => {
    setInpchange(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inpchange.trim()) {
      onAddItem({ text: inpchange, isChecked });
      setInpchange(''); 
      setIsChecked(false);
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="custom-checkbox">
            <input 
              type="checkbox" 
              id="checkbox"
              className="checkbox-hidden"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox" className="checkbox-label"></label>
          </div>
          <input 
            type="text" 
            placeholder='Add your next task'
            value={inpchange}  
            onChange={handleChange} 
            className="text-input"
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
