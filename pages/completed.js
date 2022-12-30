import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import BifLoader from "../components/BifLoader";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navber from "../components/Navber";
import { Authentication } from "./_app";


const completed = () => {
    const {user,loading}= useContext(Authentication)
    const email = user?.email;
    const handleSignout = () =>{
      Router.push('/login')
      return
    }
  

    // const [loaded,setLoaded] = useState(false)
    
    // useEffect(() => {
        
    //     // conditional redirect
    //     if(user?.uid){
    //         // with router.push the page may be added to history
    //         // the browser on history back will  go back to this page and then forward again to the redirected page
    //         // you can prevent this behaviour using location.replace
    //         Router.push('/completed')
    //        //location.replace("/hello-nextjs")
    //     }else{
    //         setLoaded(true)
    //         Router.push('/login')
    //     }
    //   },[]);

    
    const [tasks,setTasks] = useState([])
useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_server}/completed`,{
        headers:{"content-type":"application/json",email:email}})
       .then((res) => res.json())
       .then(data=>setTasks(data))
},[email])

  
  if(loading){
    return <BifLoader></BifLoader>

  }
  if(user?.uid){
    return (
        <div>
            <div>
                <Navber></Navber>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              
           {
             tasks.length > 0 ?   tasks.map(t=><Card key={t._id} task={t}></Card>):<div className="h-[100vh] w-[90vw] flex justify-center items-center text-4xl font-bold" >You Do not have any task. <Link href={'/add-task'} className="text-blue-800">Add Task</Link> </div> 
           }
        </div>

        <Footer></Footer>

        </div>
    );
  }

  else{
    handleSignout()
   }
};

export default completed;