
import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/Firebase.config";
export const Authentication = createContext();
import '../styles/globals.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";







export default function App({ Component, pageProps }) {

// authenticatio related app
const auth = getAuth(app)
  // authenticatio related app
  // const auth = getAuth(app)

  // Provider for google sign up
  const provider = new GoogleAuthProvider()
  
  
  // Setting the user
const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)



// observing auth for user changes
useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , (currentUser)=>{
        setUser(currentUser);
        setLoading(false)

    })
    return ()=> unsubscribe()
},[])

// Using email sign up
const signUpWithEmailandPassword = (email,password)=>{
  return createUserWithEmailAndPassword(auth,email,password);
}

// USing google social login
const signUpWithEmail = () =>{
  return signInWithPopup(auth,provider)
}

//Using email and password to login
const loginWithemailandpassword=(email,password)=>{
  console.log(email);
  return signInWithEmailAndPassword(auth,email,password)
}


// Handling password reset 
const forgotpass = (email) =>{
  return sendPasswordResetEmail(auth,email)
}

// Handling signout
const logout = () =>{
  return signOut(auth)
}

// Updating profile
const update = (data) =>{
  console.log(data);
  return updateProfile(auth.currentUser,data)
}

const queryClient = new QueryClient();
// Context api values
const value = {
 user
,loading
,setLoading
,signUpWithEmailandPassword
,signUpWithEmail
,loginWithemailandpassword
,forgotpass
,logout
,update}


  return <Authentication.Provider value={value}>
    
   <QueryClientProvider client={queryClient}>
   <Component {...pageProps} />
    <ToastContainer />
   </QueryClientProvider>
    </Authentication.Provider>
}
