'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorExtinction from './EditorExtinction'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect } from 'react'


const TextEditor = ({fileId}:any) => {

  const notes=useQuery(api.notes.getNotes,{
    fileId:fileId as any
  })

  const editor = useEditor({
   
    extensions: [StarterKit,
        Placeholder.configure({
            placeholder: 'Take your notes here...',
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
          Highlight.configure({ multicolor: true })
    ],
    
    editorProps:{
        attributes:{
            class:'focus:outline-none h-screen p-5'
        }

    }
  })

  useEffect(()=>{
    editor&&editor?.commands.setContent(notes as string)
  },[notes&&editor])

  return (
    <div>
        <EditorExtinction editor={editor} />
        <div className='overflow-scroll h-[90vh] '>
        <EditorContent editor={editor} /> 

        </div>
    </div>
  )
}

export default TextEditor
