import React, { useState } from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = (props) => {
 
  const handleCheckboxChange = (value) => {
    
    props.completeFunc(value,props.id);
    
  };

  function handleTrash(){
    props.trashFunc(props.id);
  }

  function handleEdit(){
    props.editFunc(props.id);
  }

  return (
    <div className={`todo-item ${props.completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox
            checked={!!props.completed}
            onChange={handleCheckboxChange}
          />

          <h4>{props.title}</h4>
        </div>
        <div>
          <i className="fa fa-pencil" aria-hidden="true" onClick={handleEdit}></i>
          <i className="fa fa-trash" aria-hidden="true" onClick={handleTrash} ></i>
        </div>
      </div>

      <div className="separator"></div>

      <p>
        {props.desc}
      </p>
    </div>
  );
};

export default TodoItem;
