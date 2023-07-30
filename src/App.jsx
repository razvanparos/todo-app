import React, { useState} from "react";
import Card from "./components/card/Card";
import Input from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";
import TextArea from "./components/input/TextArea";
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal"
import "./App.css";

const TODOS_MOCK = [
  {
    id: 1,
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: 3,
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: 4,
    title: "Titlu task",
    description: "Ceva descriere loremmmm",
    completed: true,
  },
  {
    id: 5,
    title: "Titlu taskkk",
    description: "Ceva descriere loremmmm",
    completed: true,
  },
];




function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [mockData, setMockData] = useState(TODOS_MOCK);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editId, setEditId] = useState(-1);
  const [msgDisplay, setMsgDisplay] = useState('hidden');
  const [dataLength, setDataLength] = useState(mockData.length);
  
 




  function closeModal(){
    setModalIsOpen(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setMsgDisplay('hidden');
    
  }
  function closeEditModal(){
    setEditModalIsOpen(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setEditTaskDescription('')
    setEditTaskTitle('')
    setMsgDisplay('hidden');
    
  }

  function openModal(){
    setModalIsOpen(true);
    setNewTaskTitle('');
    setNewTaskDescription('');
    
  }

  function handleSubmit(e){
      e.preventDefault();
  
      const newTaskObj={
        id: dataLength+1,
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false
      }
      setDataLength(dataLength+1);
      
      if(newTaskTitle===''){
        setMsgDisplay('');
        return
      }

      setMockData((prevState)=> [...prevState,{...newTaskObj}] );

      console.log(mockData);

      closeModal();

  }

  function trashFunc(id){
    setMockData((prevState) => {
      const updatedData = prevState.filter((item) => item.id !== id);
      return updatedData;
    });
  }

  function completeFunc(value, id) {
    const updatedTaskList = mockData.map((task) => {
      if (task.id === id) {
        return { ...task, completed: value };
      }
      return task;
    });
    setMockData(updatedTaskList);
  }

  function editFunc(id){
    console.log(id)
    setEditId(id)
    console.log(editId)
    setEditModalIsOpen(true);
  }

  function handleEditSubmit(e){
      e.preventDefault();
      if(editTaskTitle===''){
        setMsgDisplay('');
        return
      }
      const updatedTaskList = mockData.map((task) => {
        if (task.id === editId) {
          return { ...task, title: editTaskTitle, description: editTaskDescription };
        }
        return task;
      });
      setMockData(updatedTaskList);
      setEditModalIsOpen(false);
      setEditTaskTitle('')
      setEditTaskDescription('')
      
  }

  return (
    <div className="App">
      
      <div className="app-container">
        {/* 
            This is your Create Card component.
          */}
        <Modal isOpen={modalIsOpen}  closeModalFunc={closeModal}>
          <Card closeModalFunc={closeModal}>
            <h2>Create Todo</h2>
            <form onSubmit={handleSubmit}>
              <p className={`error-msg ${msgDisplay}`}>Don't leave blank</p>
              <Input onChange={(e) => {
                setNewTaskTitle(e.target.value)
                console.log(newTaskTitle)
              }} placeholder="Title" type="text" id='newtask-title' value={newTaskTitle}/>
              
              <TextArea onChange={(e) => {
                  setNewTaskDescription(e.target.value)
                  console.log(newTaskDescription)
              }} placeholder="Description" id='newtask-description' value={newTaskDescription}/>
              
              <Button type="submit">Create</Button>
            </form>
          </Card>

        </Modal>
        
        <Modal isOpen={editModalIsOpen}  closeModalFunc={closeEditModal}>
          <Card closeModalFunc={closeEditModal}>
            <h2>Edit Todo #{editId}</h2>
            <form onSubmit={handleEditSubmit}>
              <p className={`error-msg ${msgDisplay}`}>Don't leave blank</p>
              <Input onChange={(e) => {
                setEditTaskTitle(e.target.value)
                console.log('edited '+ editTaskTitle)
              }} placeholder="New Title" type="text" id='newtask-title' value={editTaskTitle}/>
              
              <TextArea onChange={(e) => {
                  setEditTaskDescription(e.target.value)
                  console.log('edited '+editTaskDescription)
              }} placeholder="New Description" id='newtask-description' value={editTaskDescription}/>
              
              <Button type="submit">Edit Task</Button>
            </form>
          </Card>

        </Modal>
        
        {/* 
          My Todos
        */}
        <Card>
          <h1>My todos</h1>
          <Button onClick={() =>{
            console.log("Open Modal")
            openModal()
          } }>Add +</Button>

          <div className="list-container" id="todo-container-list">

            {
            mockData.map((task) => {
              if(task.completed===false){
                return(<TodoItem
                  key={task.id}
                  id={task.id}
                  completed={task.completed}
                  title={task.title}
                  desc={task.description}
                  trashFunc={trashFunc}
                  completeFunc={completeFunc}
                  editFunc={editFunc}
                  />)
              }})
            }
           
          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className={`list-container`}>
            {/* <TodoItem completed={true} />
            <TodoItem completed={true} /> */}
            {
            mockData.map((task) => {
              if(task.completed===true){
                
                return(<TodoItem
                  key={task.id}
                  id={task.id}
                  completed={task.completed}
                  title={task.title}
                  desc={task.description}
                  trashFunc={trashFunc}
                  completeFunc={completeFunc}
                  editFunc={editFunc}
                  />)
                  
              }})
            }
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
