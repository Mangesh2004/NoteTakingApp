'use client';
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";

export default function UploadPDF({children}:any) {
  const generateUploadURL=useMutation(api.fileStorage.generateUploadUrl)
  const InsertFileEntry=useMutation(api.fileStorage.AddFileEntrytoDB)
  const getFileurl=useMutation(api.fileStorage.getFileURL)
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const {user}=useUser()

  const OnFileSelect=(e:any)=>{
    setFile(e.target.files[0])
  }
  
  const OnUpload=async()=>{
    setLoading(true)
    //get a short lived upload URL
    const posturl=await generateUploadURL()

    //Post the file to the URL
    const result=await fetch(posturl,{
      method:'POST',
      headers:{"Content-Type":file?.type} as any,
      body:file
    })
    const {storageId}=await result.json()
    console.log(storageId);
    //Save the newely added storageId to db
    const fileId=uuid4()
    const fileUrl=await getFileurl({storageId:storageId})
    const response=await InsertFileEntry({
      fileId:fileId,
      storageId:storageId,
      fileName:fileName??'Untitled File',
      fileURL:fileUrl || '',
      createdBy:user?.primaryEmailAddress?.emailAddress || ''
    })
    console.log(response);
    

    setLoading(false)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription asChild>
                <div className="p-1 ">
                    <div className="p-3 shadow-lg ">
                        <h2 className="pb-1">Select the file to upload</h2>
                        <input type="file" accept="application/pdf" onChange={(e)=>OnFileSelect(e)} />
                    </div>
                    <div className="pt-3 shadow-lg ">
                        <label > FileName</label>
                        <Input placeholder="Enter the name of the file" onChange={(e)=>setFileName(e.target.value)} />

                    </div>
                </div>
              
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} >
            {loading? <Loader2Icon className="animate-spin" />:"Upload"}

            </Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


