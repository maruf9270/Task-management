
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Navber from "../components/Navber";
import { Authentication } from "./_app";


const my_tasks = () => {

    const {user,loading} = useContext(Authentication)
    const mail = user?.email
    console.log(mail);
    const [tasks,setTasks] = useState([])
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_server}/tasks`,{
            headers: {
                email: mail 
            }        })
        .then(res=>res.json())
        .then(data=>{
            setTasks(data)
        })
    },[user,mail])
    
   if(loading){
    return <div>Loading</div>
   }

   if(user?.uid){
    return (
        <div>
            <div><Navber></Navber></div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    tasks.map(t=><Card key={t._id} task={t}></Card>)
                }
            </div>
            
        </div>
    );
   }

   else{
    return <div>Please login</div>
   }
};

export default my_tasks;