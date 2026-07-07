"use client"
import React from 'react'
import { Button } from './ui/button'
import {signIn, signOut, useSession} from "next-auth/react"

const Navbar = () => {
    const session =useSession();
  return (
   <nav className="flex justify-between px-2 py-4">
    <div>
        WishAura
    </div>

    <div>
        {session.data?.user &&
         <Button onClick={()=>signOut()}>Logout</Button>}
        {!session.data?.user && 
        <Button onClick={()=>signIn()}>Login</Button>}

        
        
    </div>
   </nav>
  )
}

export default Navbar