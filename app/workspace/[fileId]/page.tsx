'use client'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import PdfViewer from '../_components/PdfViewer'
import { useParams } from 'next/navigation'
import {  useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import TextEditor from '../_components/TextEditor'

export default function Workspace() {

    const { fileId } = useParams();
    const notes=useQuery(api.notes.getNotes,{
        fileId:fileId as any
    })
    const fileInfo : any =useQuery(api.fileStorage.GetFileRecord,{
        fileId:fileId
    } as any)

    useEffect(()=>{
        console.log(fileInfo);
        
    },[fileInfo])
    

  return (
    <div>
      <WorkspaceHeader fileName={fileInfo?.fileName} notes={notes as any} fileId={fileId as any} />
      <div className='grid grid-cols-2 gap-5'>
        <div>
            {/* TextEditor */}
            <TextEditor fileId={fileId} />
        </div>
        <div>
            <PdfViewer fileUrl={fileInfo?.fileURL} />
        </div>
      </div>
    </div>
  )
}
