import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Navber from "../components/Navber";
import { Authentication } from "./_app";


const completed = () => {
    const {user}= useContext(Authentication)
    const email = user?.email;

    const [loaded,setLoaded] = useState(false)
    
    useEffect(() => {
        
        // conditional redirect
        if(user?.uid){
            // with router.push the page may be added to history
            // the browser on history back will  go back to this page and then forward again to the redirected page
            // you can prevent this behaviour using location.replace
            Router.push('/completed')
           //location.replace("/hello-nextjs")
        }else{
            setLoaded(true)
            Router.push('/login')
        }
      },[]);

    
    const [tasks,setTasks] = useState([])
useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_server}/completed`,{
        headers:{"content-type":"application/json",email:email}})
       .then((res) => res.json())
       .then(data=>setTasks(data))
},[email])

  
  if(loaded){
    return <div>Loading</div>

  }
  else{
    return (
        <div>
            <div>
                <Navber></Navber>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
           {
            tasks.map(t=><Card task={t} key={t._id}></Card>)
           }
        </div>

        </div>
    );
  }
};

export default completed;