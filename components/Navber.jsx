import Link from "next/link";
import { useState } from "react";
import styles from '../styles/Navber.module.css'

const Navber = () => {

    // Handling navber hideen or not
    const [hidden,setHidden] = useState(false)
  const links = <> 
<Link href={'/'}>
  <li>Home</li>
</Link>
<Link href={'/'}>
  <li>Add Task</li>
</Link>
<Link href={'/'}>
  <li>My Tasks</li>
</Link>
<Link href={'/'}>
  <li>Completed Task</li>
</Link></>

  return (
    <div>
      {/* Navber starts  */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={()=>setHidden(!hidden)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
           {
            hidden ?  <ul
            tabIndex={0}
            className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ${styles.droplist}`}
          >
          {
            links
          }
          </ul>:
          ""
           }
          </div>
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2 ">
           <ul className={`list-none hidden lg:flex ${styles.hiddenlist}`}>  
            {
                links
            }
           </ul>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Navber ends */}
    </div>
  );
};

export default Navber;