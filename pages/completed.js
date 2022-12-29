import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Navber from "../components/Navber";
import { Authentication } from "./_app";


const completed = () => {
    const {user}= useContext(Authentication)
    const email = user?.email;
    const [tasks,setTasks] = useState([])
useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_server}/completed`,{
        headers:{"content-type":"application/json",email:email}})
       .then((res) => res.json())
       .then(data=>setTasks(data))
},[email])

  console.log(tasks)
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
};

export default completed;