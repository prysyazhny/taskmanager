import './App.css';
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button, TextareaAutosize, TextField } from '@mui/material';
import { Stack } from '@mui/system';

function App() {

  const taskCollectionRef = collection(db, "tasks");

  async function viewTasks() {
    const taskArray = [];
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      var taskData = doc.data().title + ": <br/>" + doc.data().description + "<br/> Time Due: "+ doc.data().time + " - ID: "+ doc.id;
      taskArray.push(taskData);
    });
  
    var tasks = "";
    for(var i = 0; i < taskArray.length; i++){
      tasks += taskArray[i] + "<br/>"+ "----------" + "<br/>";
    }
    var label = document.getElementById("tasksLabel");
    label.innerHTML = tasks;
  }

  const createTask = async () => {
    await addDoc(taskCollectionRef, { title: newTitle, description: newDescription, time: newTime});
    viewTasks();
  };

  const deleteTask = async () => {
    const taskDoc = doc(db, "tasks", newID);
    await deleteDoc(taskDoc);
    viewTasks();
  };

  const editTask = async () => {
    const userDoc = doc(db, "tasks", newID);
    const newFields = { title: newTitle, description: newDescription, time: newTime };
    await updateDoc(userDoc, newFields);
    viewTasks();
  };

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newID, setNewID] = useState("");

  return (
    <div className='App' >

      <Stack direction = {'row'}>

        <Stack paddingLeft={15} paddingTop={10}>

          <h1><u><b>Tasks:</b></u></h1>

          <p id="tasksLabel" style={{fontSize: "16px", color: "black"}}>
             
          </p>

        </Stack>

        <Stack paddingLeft={30} paddingTop={10}>

          <Stack paddingTop={10}>

          <TextareaAutosize

            minRows={2}
            placeholder="Title"
            onChange={(event) => {
            setNewTitle(event.target.value);
            
          }}
          />


          <TextareaAutosize
            placeholder="Description"

            minRows={15}
        
            onChange={(event) => {
            setNewDescription(event.target.value);
            }}

          />

          <TextareaAutosize

            minRows={2}

            placeholder="Time Due"
            onChange={(event) => {
            setNewTime(event.target.value);
            
          }}
          />
      
          </Stack>

          
          <Stack paddingTop={5} spacing = {1} direction = {'row'} >

            <Button color='success' variant='contained' onClick = {createTask} style = {{width: 200, height: 50}}>Create Task</Button>

            <Button variant='contained' onClick = {viewTasks} style = {{width: 200, height: 50}}>Update Task List</Button>


          </Stack>

          <Stack paddingTop={5} direction = {'row'} >

          <TextareaAutosize

            minRows={2.5}
            
            style = {{width: 200}}

            placeholder="ID to Change"
            onChange={(event) => {
            setNewID(event.target.value);

            }}
          />

          </Stack>

          <Stack spacing = {1} paddingTop={5} direction = {'row'} >

            <Button variant='contained' onClick = {editTask} style = {{width: 200, height: 50}}>Edit Task</Button>
            <Button color='error' variant='contained' onClick = {deleteTask} style = {{width: 200, height: 50}}>Delete Task</Button>

          </Stack>

        </Stack>

      </Stack>

    </div>
  
  );
}

export default App;
