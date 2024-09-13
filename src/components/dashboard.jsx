import React from 'react';
import deleteIcon from '../images/icon-cross.svg';
const Dashboard = ({ items, updateItem, deleteItem }) => {
  if (!items || !Array.isArray(items)) {
    return <p>No items to display</p>;
  }

  const handleCheckboxChange = (index) => {
    const updatedItem = { ...items[index], isChecked: !items[index].isChecked };
    updateItem(index, updatedItem);
  };

  const handleTextChange = (index, event) => {
    const updatedItem = { ...items[index], text: event.target.value };
    updateItem(index, updatedItem);
  };

  const handleDelete = (index) => {
    deleteItem(index);
  };

  const completedCount = items.filter(item => item.isChecked).length;

  return (
    <div>
      {items.length === 0 ? (
        <p>No items to display</p>
      ) : (
        items.map((item, index) => (
          <div key={index} className="input-container dashboard-item">
            <div className="input-wrapper">
              <div className="custom-checkbox" onClick={() => handleCheckboxChange(index)}>
                <input
                  type="checkbox"
                  className="checkbox-hidden"
                  checked={item.isChecked}
                  readOnly
                />
                <label className="checkbox-label"></label>
              </div>
              <input 
                type="text" 
                value={item.text}
                className={`text-input ${item.isChecked ? 'completed' : ''}`}
                onChange={(event) => handleTextChange(index, event)} 
              />
              <button onClick={() => handleDelete(index)} className="delete-button"><img src={deleteIcon} alt='colo'/></button>
            </div>
          </div>
        ))
      )}
      <div className=" total-count">
        <div className="downbelow">
          <div className="total-text">All: {items.length}</div>
          <div className='active'>Active</div>
          <div className="total-text"> Completed: {completedCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;