import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Navber from '../components/Navber'
import { useContext } from 'react'
import { Authentication } from '../Authentication/Authenticaton'
import app from '../Firebase/Firebase.config'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <div>
          <Navber></Navber>
        </div>
        <script src="../path/to/flowbite/dist/flowbite.js"></script>
      </main>
    </>
  )
}
