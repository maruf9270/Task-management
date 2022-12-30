import { Cookie } from "@next/font/google";
import Link from "next/link";
import Router from "next/router";
import { useContext, useReducer, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navber from "../components/Navber";
import { Authentication } from "./_app";

const index = () => {
   
    const {forgotpass,signUpWithEmail,loginWithemailandpassword,user}= useContext(Authentication)

    console.log(user);
    // Login Error state
    const [logError,setLogError,] = useState(null)

     // handling google signUpWithEmail
     const handleGogle = () =>{
        signUpWithEmail()
        .then(res=>res.json())
        .then(data=>{
          Router.push('/')

        })
        .catch(err=>{
            console.log(err);
        })
     }

    //  Using use reducer to manage staate\\.
    const initialValue = {
      email:'',
      password:''
    }
    const reducer = (state,action) =>{
      if(action.type === "email"){
        state[action.type] = action.payload
        return state
      }
      if(action.type ==="password"){
        const password = action.payload;
        if(password.length < 6){
          toast.error("Password must be at least six charecter long",{ toastId: 'passerror1',})
          return state
        } 
       else{
        state[action.type] = action.payload;
        return state
       }
      }
      return state;


    }
    const [state,dispatch] = useReducer(reducer,initialValue)



    // Handling form submit
    const handleSubmit =(e)=>{
      e.preventDefault()
      loginWithemailandpassword(state.email,state.password)
      .then(data=>{
        Router.push('/')
      })
      .catch(err=>{toast.error(err.message) 
      console.log(err)})
    
    }
  return (
    <div>
      <div>
        <Navber></Navber>
      </div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Sign in with</p>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    onClick={handleGogle}
                  >
                   <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path    fill="currentColor" d="M224 96C135.6 96 64 167.6 64 256s71.6 160 160 160c77.4 0 142-55 156.8-128H256c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32c0 123.7-100.3 224-224 224S0 379.7 0 256S100.3 32 224 32c57.4 0 109.7 21.6 149.3 57c13.2 11.8 14.3 32 2.5 45.2s-32 14.3-45.2 2.5C302.3 111.4 265 96 224 96z"/></svg>
                  </button>

                  
                  
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>

                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput"
                    placeholder="Email address"
                    onBlur={(e)=>dispatch({type:'email', payload:e.target.value})}

                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    onBlur={(e)=>dispatch({type:'password', payload:e.target.value})}
                    autoComplete='on'
                  />
                </div>

                {/* <div className="flex justify-between items-center mb-6"> */}
                  {/* <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                      onClick={}
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div> */}
                  {/* <a href="#!" className="text-gray-800">
                    Forgot password?
                  </a> */}
                {/* </div> */}

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link
                      href="signup"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default index;
