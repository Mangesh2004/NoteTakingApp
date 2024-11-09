'use client'
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";



export default function Home() {
  const {user}=useUser()
  const createUser=useMutation(api.users.CreateUser)
  
  const CheckUser= async ()=>{
    const result=await createUser({
      email:user?.primaryEmailAddress?.emailAddress || '',
      imageUrl:user?.imageUrl || '',
      username:user?.fullName || ''
    })
    console.log(result);
    
  }

  useEffect(()=>{
    user&&CheckUser()
  },[user])

  

  return (

    <><UserButton /><h1>hello</h1></>
  );
}
