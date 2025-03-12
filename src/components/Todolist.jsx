import React, { useEffect, useState } from "react"

export function TodoList() {
    const [tasks,setTasks] = useState([])
    const [taskInput,setTaskInput] = useState("")
    const [editingTaskId,setEditingTaskId] = useState(null)
    const [editingTaskText,setEditingTaskText] = useState('')

    // Load task from local storage
    useEffect(() =>{
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
        setTasks(savedTasks)
    },[])

    useEffect(()=>{
        if (tasks.length > 0){
            localStorage.setItem("tasks",JSON.stringify(tasks))
        }
    },[tasks])

    const addTask = ()=>{
        if (!taskInput.trim())return
        setTasks([...tasks,{id:Date.now(),text:taskInput,completed:false}])
        setTaskInput('')
    }

    const completeTask = (id) =>{
        setTasks(tasks.map(task=>
            task.id === id ? {...task,completed:!task.completed} :task
        ))
    }

    const editTask = (id,text) =>{
        setEditingTaskId(id)
        setEditingTaskText(text)
    }

    const saveChange = (id)=>{
        setTasks(tasks.map(task =>task.id == id ? {...task,text:editingTaskText}:task))
        setEditingTaskId(null)
    }

    const deleteTask = (id)=>{
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
        const updatedTasks = savedTasks.filter(task=> task.id !== id)
        
        localStorage.setItem("tasks",JSON.stringify(updatedTasks))
        setTasks(updatedTasks)
    }

  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-grey-800 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">To-Do List</h1>

       {/* Add Task */} 
      <div className="flex w-full max-w-md">
        <input 
          type="text" 
          value={taskInput}
          onChange={(e)=>setTaskInput(e.target.value)}
          className="p-3 text-gray-700 rounded-l shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Add a task..." 
        />
        <button onClick={addTask} className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r shadow-sm transition-colors">
          Add
        </button>
      </div>

       {/* Task List*/}
      <ul className="w-full max-w-md mt-6 space-y-3">
        {tasks.map(task=>(
            <li key={task.id} 
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            
            {/* Complete task */}
            <input type="checkbox" checked ={task.completed} onChange={()=>completeTask(task.id)} className="mr-2 cursor-pointer" />

            {/*Edit Task */}
            {editingTaskId === task.id ? (
                <input type="text" value={editingTaskText} onChange={(e)=>setEditingTaskText(e.target.value)} className="text-black p-1 rounded"></input>
            ):(<span className={`${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.text}
              </span>)}

            <div className="flex space-x-3">
              { editingTaskId == task.id ?(
                <button onClick={()=>saveChange(task.id)}  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors">Save</button>
              ):(
              <button onClick={()=>editTask(task.id,task.text)}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors">Edit</button>
              )}
              <button onClick={()=>deleteTask(task.id)} className="text-red-600 hover:text-red-800 font-medium cursor-pointer transition-colors">Delete</button>
            </div>
          </li>
        ))}  
      </ul>
    </div>
  )
}