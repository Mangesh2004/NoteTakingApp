import React from "react";
import TextAlign from "@tiptap/extension-text-align";
import { toast } from "sonner"

import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Highlighter,
  Sparkles,
} from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "@/Models/AiModel";
import { useUser } from "@clerk/nextjs";

export default function EditorExtinction({ editor }: any) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myActions.search);
  const {user}=useUser()

  const saveNotes=useMutation(api.notes.Addnotes)

  const OnAiClick = async () => {
    toast('Ai is getting your answer... ')
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    const result = await SearchAI({
      query: selectedText,
      fileId: fileId as string,
    });

    const UnformattedAns=JSON.parse(result)
    console.log(UnformattedAns);
    
    let AllUnformattedAns=''
    UnformattedAns&&UnformattedAns.forEach((ans:any)=>{
      AllUnformattedAns=AllUnformattedAns+ans.pageContent
    })
    console.log(AllUnformattedAns);
    

    const Prompt="For Question: "+selectedText+"With the given content as answer please give an appropriate answer in HTML format. Note dont give me anything than answer I am rendering your answer directly on editor and there I want answer only nothing else no images etc. Also dont give me any commands and stick to question asked you give a lot of other info I want answer in short. The answer content is: "+AllUnformattedAns
    // const Prompt="For Question: "+selectedText+"Give me answer on this"+AllUnformattedAns

    const AiModelResult=await chatSession.sendMessage(Prompt)
    const FinalAns= AiModelResult.response.text().replace('```','').replace('html','').replace('```','')
    // const FinalAns= AiModelResult.response.text()
    // console.log(FinalAns);
    

    const Alltext=editor.getHTML()
    editor.commands.setContent(Alltext+'<p> <strong>Answer:</strong> '+FinalAns+'</p>')

     await saveNotes({
      notes:editor.getHTML(),
      fileId:fileId as string,
      createdBy:user?.primaryEmailAddress?.emailAddress as string
    })

  };
  return (
    editor && (
      <div className="p-5 ">
        <div className="control-group">
          <div className="button-group">
            <div className="flex gap-3">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "text-blue-700" : ""}
              >
                <Bold />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "text-blue-700" : ""}
              >
                <Italic />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "text-blue-700" : ""
                }
              >
                <AlignLeft />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" })
                    ? "text-blue-700"
                    : ""
                }
              >
                <AlignCenter />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "text-blue-700" : ""
                }
              >
                <AlignRight />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                  editor.isActive({ textAlign: "justify" })
                    ? "text-blue-700"
                    : ""
                }
              >
                <AlignJustify />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={editor.isActive({ level: 1 }) ? "text-blue-700" : ""}
              >
                <Heading1 />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={editor.isActive({ level: 2 }) ? "text-blue-700" : ""}
              >
                <Heading2 />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive("highlight") ? "text-blue-700" : ""}
              >
                <Highlighter />
              </button>
              <button onClick={() => OnAiClick()} className={""}>
                <Sparkles />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
