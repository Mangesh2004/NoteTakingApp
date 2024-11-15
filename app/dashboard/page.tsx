"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function page() {
  const { user } = useUser();
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
  },[user&&CheckUser()])


  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress as any,
  });
  console.log(fileList);

  return (
    <div>
      <h1 className="font-bold text-3xl p-3">
        Workspace
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10 ">
        {(fileList ?? []).length > 0
          ? fileList?.map((file: any, index: number) => (
              <div key={index}>
                <Link href={'/workspace/'+file.fileId}>
              <div
                
                className="border shadow-lg rounded-lg flex items-center justify-center p-5 flex-col cursor-pointer hover:scale-105 transition-all "
              >
                <Image src={"/pdf.png"} height={50} width={50} alt="pdf" />
                <h2 className="font-semibold mt-2">{file.fileName}</h2>
              </div>
              </Link>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9].map(( index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-md h-[150px] animate-pulse "
              ></div>
            ))}
      </div>
    </div>
  );
}
