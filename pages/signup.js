import Link from "next/link";
import Router from "next/router";
import { useContext, useReducer } from "react";
import { toast } from "react-toastify";
import Navber from "../components/Navber";
import { Authentication } from "./_app";

const signup = () => {
  const { signUpWithEmail,signUpWithEmailandPassword,update,user,logout } = useContext(Authentication);
    console.log(user);
  // Handling google sign up
  const handlegoolge = () => {
    signUpWithEmail()
      .then((data) => {
        toast.success("Logoged in");
      })
      .catch((err) => toast.error(err.message));
  };

  //  Handling state using use reducer
  const initialValue = {
    email: "",
    name: "",
    image: "",
    password: "",
  };
  const reducer = (state, action) => {
    const type = action.type;
    const payload = action.payload;

    if (type === "email") {
      state[type] = payload;
      return state;
    }

    if (type === "name") {
      state[type] = payload;
      return state;
    }

    if (type === "password") {
      state[type] = payload;
      return state;
    }
    if (type === "image") {
      const formdate = new FormData();
      formdate.append("image", payload);
      state[type] = formdate;
      return state;
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

//   Sending the user data to the server
const sendData = () =>{
    fetch(`${process.env.NEXT_PUBLIC_server}/users`,{
        method:"post",headers:{"content-type":"application/json"},
        body: JSON.stringify(state)
    })
    .then(res=>res.json())
    .then(res=>
      {
        logout();
        toast.success("Please login")
        Router.push('/login')
      })
}

    //Sending the image to the server
    const handleimage = () =>{
        fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_imagebb}`,{
            method:"POST",
            body: state.image
        })
        .then(res=>res.json())
        .then(data=>{
            state.image =data.data
            handleupdate()
        })
        .catch(err=>console.log(err))
    } 

    // Handling updating profile
    const handleupdate = () =>{
        const data = {
             displayName:state.name, photoURL: state.image.display_url
        }
        update(data)
        .then(res=>{
            toast.success("success")
            sendData()
        })
        .catch(err=>console.log(err))

    }
  // Handling from submit
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpWithEmailandPassword(state.email,state.password)
    .then(data=>{
        
            handleimage()
       
    })
    
  };
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
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput"
                    placeholder="Email address"
                    onBlur={(e) =>
                      dispatch({ type: "email", payload: e.target.value })
                    }
                  />
                </div>

                {/* <!-- Name input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput"
                    placeholder="Password"
                    onBlur={(e) =>
                      dispatch({ type: "password", payload: e.target.value })
                    }
                    autoComplete="on"
                  />
                </div>
                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Name"
                    onBlur={(e) =>
                      dispatch({ type: "name", payload: e.target.value })
                    }
                    autoComplete="on"
                  />
                </div>

                <div className="mb-6">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Chose a profile image</span>
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full "
                      onBlur={(e) =>
                        dispatch({ type: "image", payload: e.target.files[0] })
                      }
                      required
                    />
                  </div>
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
                    Sign Up
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Already have an account?
                    <Link
                      href="login"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Login
                    </Link>
                  </p>
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Sign up with</p>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    onClick={handlegoolge}
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M224 96C135.6 96 64 167.6 64 256s71.6 160 160 160c77.4 0 142-55 156.8-128H256c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32c0 123.7-100.3 224-224 224S0 379.7 0 256S100.3 32 224 32c57.4 0 109.7 21.6 149.3 57c13.2 11.8 14.3 32 2.5 45.2s-32 14.3-45.2 2.5C302.3 111.4 265 96 224 96z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default signup;
