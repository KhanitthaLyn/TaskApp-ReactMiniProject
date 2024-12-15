import "./App.css";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import Item from "./components/Item";
import { useState,useEffect } from "react";

function App() {
  const [tasks,setTasks]=useState(JSON.parse(localStorage.getItem("tasks"))||[])
  const [title,setTitle] = useState("")
  const [editId,setEditId] = useState(null);
  const [theme,setTheme] = useState("light");
  //pattern 3
  useEffect(()=>{
      localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])

  function deleteTask(id){
      const result = tasks.filter(item=>item.id !==id)
      setTasks(result)
  }
  function editTask(id){
      //1
      setEditId(id)
      const editTask = tasks.find((item)=>item.id === id)
      setTitle(editTask.title)
  }
  function saveTask(e){
      e.preventDefault();
      if(!title){
          alert("Plase Fill form")
      }else if(editId){
        //Update data
        const updateTask = tasks.map((item)=>{
            if(item.id === editId){
                return {...item,title:title}
            }
            return item;
        })
        setTasks(updateTask)
        setEditId(null)
        setTitle("")
      }else{
        //Add new task
        const newTask={
            id:Math.floor(Math.random()*1000),
            title:title
        }
        setTasks([...tasks,newTask])
        setTitle("")
      }
  }
  return (
    <div className={"App "+theme}>
      <Header theme={theme} setTheme={setTheme}/>
      <div className="container">
        <AddForm title={title} setTitle={setTitle} saveTask={saveTask} editId={editId}/>
        <section>
            {
              tasks.map((data)=>(
                <Item key={data.id} data={data} deleteTask={deleteTask} editTask={editTask}/>
              ))
            }
        </section>
      </div>
    </div>
  );
}

export default App;
