import { Cookie } from "@next/font/google";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { NextFetchEvent, NextResponse } from 'next/server'
import  { NextRequest } from 'next/server'
import { useContext } from "react";
import { Authentication } from "./pages/_app";
export const config ={
    matcher: ['/add-task','/my-tasks','/completed']
}

export function middleware(){
    const loggedin = false;
    if(!loggedin){
        NextResponse.redirect('http://localhost:3000/login')
    }
    else{
         NextResponse.redirect('http://localhost:3000/login')
    }
    
} 