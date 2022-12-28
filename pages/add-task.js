import Navber from "../components/Navber";
import React, { useContext, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { Authentication } from "./_app";

const add_task = () => {
    const {user} = useContext(Authentication)
    console.log(user);

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



// Handling form submit
const handleSubmit =(e)=>{
    e.preventDefault()
    const form = e.target
    const title = form.title.value;
    const image = form.image.files[0];
    const details = form.details.value;
   
    const task = {
        user:"kfj",
        title,
        date: value.newValue.startDate,
        time: ttime,
        details,



    }
}
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
};

export default add_task;
