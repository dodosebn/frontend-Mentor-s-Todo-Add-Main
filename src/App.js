import React, { useState } from 'react';
import Input from './components/inputfield/input';
import Dashboard from './components/dashboard';
import './App.css';
import darkMode from './images/icon-sun.svg';
import whiteMode from './images/icon-moon.svg';
import imgBlack from './images/bg-desktop-dark.jpg';
import imgWhite from './images/bg-desktop-light.jpg';

function App() {
  const [items, setItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const stylesForSection1 = {
    backgroundImage: `linear-gradient(to right, transparent, rgba(107, 24, 120, 0.7), rgba(107, 24, 120, 0.7)), url(${isDarkMode ? imgBlack : imgWhite})`,
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'color-dodge',
  };

  const handleAddItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const handleUpdateItem = (index, updatedItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? updatedItem : item
    );
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleReorderItems = (updatedItems) => {
    setItems(updatedItems);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ backgroundColor: isDarkMode ? 'var(--VeryDarkBlue)' : 'var(--VeryLightGrayishBlue)' }}>
      <section className="theTopImgSide" style={stylesForSection1}>
        <div>
          <h1>TODO</h1>
          <img src={isDarkMode ? whiteMode : darkMode} alt="Toggle Theme" onClick={toggleTheme} />
        </div>      
        <div className="input-cont">
          <Input onAddItem={handleAddItem} />
        </div>
      </section>

      <main>
        <div className="dashboard">
          <Dashboard 
            items={items} 
            updateItem={handleUpdateItem} 
            deleteItem={handleDeleteItem} 
            reorderItems={handleReorderItems} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;