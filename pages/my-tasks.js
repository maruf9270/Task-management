
import Router from "next/router";
import { NextResponse } from "next/server";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Navber from "../components/Navber";
import { Authentication } from "./_app";


const my_tasks = () => {
    const {user,loading} = useContext(Authentication)
    const [loaded,setLoaded] = useState(false)
    
    useEffect(() => {
        const {pathname} = Router
        // conditional redirect
        if(user?.uid){
            // with router.push the page may be added to history
            // the browser on history back will  go back to this page and then forward again to the redirected page
            // you can prevent this behaviour using location.replace
            Router.push('/my-tasks')
           //location.replace("/hello-nextjs")
        }else{
            setLoaded(true)
            Router.push('/login')
        }
      },[]);

    
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
    
   if(loading || loaded){
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