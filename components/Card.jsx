import { useState } from "react";
import { toast } from "react-toastify";

const Card = ({ task }) => {
  // Handling delete
  const handledelete = () => {
    const taskId = task._id;
    fetch(`${process.env.NEXT_PUBLIC_server}/tasks`, {
      method: "delete",
      headers: {
        taskID: taskId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Deleted successfully");
        console.log(data);
      });
  };

  // Handling Complete
  const handlecomplete = () => {
    const taskId = task._id;
    const status = !task.completed;
    console.log(status);
    const tdata = { id: taskId, completed: status };
    fetch(`${process.env.NEXT_PUBLIC_server}/tasks`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tdata),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Completed successfully");
      });
  };
 console.log(task);
  const details = task?.details;
  const time  = task?.time
  const sliced = time.slice(11,19)
  const splited = sliced.split(":")
  const first = parseInt(splited[0])
  let dtime ;
 
  if(time){

    if(first>12){
      const time = first - 12;
      splited.shift()
      splited.unshift(time)
      const final = splited.join(":") + " " + "PM"
      dtime = final
    }
    else(
      dtime = sliced + " " + "AM"
    )
   

  }

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={task.image.thumb.url} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{task.title}</h2>
          <p>
            {details.length > 100 ? <>{details.slice(0, 100)}...</> : details}
          </p>
<div className="flex">
  
<span class=" text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
           {
            task.date.startDate
           }
          </span>
          <span class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-purple-600 text-white rounded mx-3">
            {
              dtime
            }
          </span>
</div>
          <div className="card-actions">
            {task.completed ? (
              <></>
            ) : (
              <button className="btn btn-primary" onClick={handlecomplete}>
                Complete
              </button>
            )}
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-error text-white" onClick={handledelete}>
              Detele
            </button>
            {task.completed ? (
              <button className="btn btn-primary" onClick={handlecomplete}>
                Not Complete
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
