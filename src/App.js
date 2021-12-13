import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


//Fetch Task 
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

//Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}

//Toggle reminder
const toggleReminder = async (id) => {
  const tasktoToggle = await fetchTask(id)
  const updTask = {...tasktoToggle, reminder: !tasktoToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-type': 'application/json',
    }, 
    body: JSON.stringify(updTask),
  })

  const data = await res.json ()

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}

//Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json',
    }, 
    body: JSON.stringify(task),
  })
  
  const data = await res.json()
  
  setTasks([...tasks, data])
   
//   const id =Math.floor(Math.random() * 10000) + 1 
//   const newTask = {id, ...task}
//   setTasks ([...tasks, newTask])
}

//Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE', })

  setTasks(tasks.filter((task) => task.id !== id))
}

// const deleteTask = (id) => {
//   console.log('delete', id)
// }

  return (
    <Router>
    <div className='container'>
      <Header onAdd = {() => setShowAddTask (!showAddTask)} showAdd= {showAddTask}/>

      <Route path = '/' exact render={(props)=> (
        <> 
         {showAddTask && <AddTask onAdd = {addTask} />}
          {tasks.length > 0 ? 
      (<Tasks tasks = {tasks} 
        onDelete = {deleteTask}  
        onToggle = {toggleReminder}/>) 
      : ('No Tasks To Show' )
      }
        </>
      )} />
      <Route path ='/about' component = {About}/>
      <Footer/>
        

    </div>
    </Router>
  )
}

export default App;


//Using a class: 
// import React from "react"

// class App extends React.Component {
//     render() {
//         return <h1> Hello from a class </h1>
//     }
// }

// export default App

//=================================================

// function App() {
//   const name = 'Farheen'
//   const x = true 

//   return (
//     <div className='container'>
//       <h1> Hello From React </h1>
//       <h2> Hello {1 +1} </h2>
//       <h2> Hello { x ? 'Yes': 'No'} </h2>
//       <h2> Hello {name} </h2>
//       <Header title = 'Hello' />
//       <Header/>
//     </div>
//   );
// }


 