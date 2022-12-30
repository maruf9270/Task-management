import Navber from "../components/Navber";
import React, { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { Authentication } from "./_app";
import { toast } from "react-toastify";
import Router from "next/router";
const add_task = () => {
    const {user,loading} = useContext(Authentication)

  

  
  

    const [loaded,setLoaded] = useState(false)
    
    useEffect(() => {
       
        // conditional redirect
        if(user?.uid){
            // with router.push the page may be added to history
            // the browser on history back will  go back to this page and then forward again to the redirected page
            // you can prevent this behaviour using location.replace
            Router.push('/add-task')
           //location.replace("/hello-nextjs")
        }else{
            setLoaded(true)
            Router.push('/login')
        }
      },[]);

    
    // Time value
    const [ttime,setTime] = useState('')
const onChange = (time, timeString) => {
    setTime(time)
  };


  const [value, setValue] = useState("");

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };


// Sending the data to the data base 
const database = (props) =>{
  const data = props;
  const from = data.form
  delete data.form;
  fetch(`${process.env.NEXT_PUBLIC_server}/tasks`,{
    method:"post",
    headers:{
    "content-type":"application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    toast.success("Insrted successfully");
    from.reset()
  })
  .catch(err=>{
    console.log(err);
    toast.error("Something went wrong please try again letter")
  })

}

// Sending the image to database
const imageupdate= (props)=>{
  const task = props
  const formdata= new FormData()
  formdata.append("image",task.image)
  fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imagebb}`,{
            method:"POST",
            body: formdata
        })
        .then(res=>res.json())
        .then(data=>{
          task.image = data.data;
          database(task)
           
        })
        .catch(err=>console.log(err))

}


// Handling form submit
const handleSubmit =(e)=>{
    e.preventDefault()
    const form = e.target
    const title = form.title.value;
    const image = form.image.files[0];
    const details = form.details.value;
   
    const task = {
        user: user?.email,
        title,
        date: value,
        time: ttime,
        details,
        completed:false,
        image,
        form



    }

    imageupdate(task)
}

if(loaded || loading){
  return <div>Loading</div>
}

else{
  
  return (
    <div>
      <script src="../path/to/flowbite/dist/flowbite.js"></script>
      <Navber></Navber>
      <div className="border border-black rounded-lg">
        <div className="text-center mt-5">
          <h2 className="text-3xl font-bold text-blue-600">Add Your Task</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Title input section */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
              
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              name="title"
              required
            />
          </div>


            {/*Date  */}

          <Datepicker
            asSingle={true}
            value={value}
            onChange={handleValueChange}
            useRange={false}
          />

            {/* time picker */}
          <div>
       


{/* 
    <TimePicker use12Hours onChange={onChange} /> */}
    <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} style={{ width: 140 }} />
    {/* <TimePicker use12Hours format="h:mm a" onChange={onChange} /> */}


          </div>

            {/* photo */}
            <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Image</span>
    
  </label>
  <input type="file" className="file-input file-input-bordered w-full max-w-xs"
  required
  name="image" />
 
</div>

          {/* details */}
          <div className="form-control">
  <label className="label">
    <span className="label-text">Details</span>
   
  </label> 
  <textarea className="textarea textarea-bordered h-24" placeholder="Bio"
  name="details"></textarea>
</div>

<div>
    <button className="btn btn-primary" type="submit">Add</button>
</div>
        </form>
      </div>
    </div>
  );
}
};

export default add_task;
