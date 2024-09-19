// Dashboard.jsx
import React from 'react';
import deleteIcon from '../images/icon-cross.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = ({ items, updateItem, deleteItem, reorderItems }) => {
  if (!items || !Array.isArray(items)) {
    return <p>Get productive! Add a todo</p>;
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
  // const handleDelCompletedItems = () => {
  //   const newItems = items.filter(item => !item.isChecked);
  //   setItems(newItems);
  // };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.index === destination.index) return;

    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);

    reorderItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-todo-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="input-container dashboard-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
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
                      <button onClick={() => handleDelete(index)} className="delete-button">
                        <img src={deleteIcon} alt='Delete' />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <article className="total-count">
        <div className="downbelow">
          <div className="total-text">All: {items.length}</div>
          <div className='active'>Active</div>
          <div className="total-text">Completed: {completedCount}</div>
          {/* <button onClick={handleDelCompletedItems}>Delete Completed Items</button> */}
        </div>
      </article>
    </DragDropContext>
  );
};

export default Dashboard;