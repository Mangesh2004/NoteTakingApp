import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const pdfURL="https://enduring-cuttlefish-717.convex.cloud/api/storage/5851a01f-2980-4b21-9b26-aa536ad12ddf"
export async function GET(request: NextRequest) {
    const response=await fetch(pdfURL)
    const data=await response.blob()
    const loader=new WebPDFLoader(data)
    const docs=await loader.load()

    let Pdftextcontent=''
    docs.forEach((doc)=>{
        Pdftextcontent+=doc.pageContent
    })

    //split the text into small chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 1,
      });

      const output = await textSplitter.createDocuments([Pdftextcontent]);

      let splitterList : any=[]
        output.forEach((doc)=>{
            splitterList.push(doc.pageContent)
        })


    return NextResponse.json({result:splitterList})
    
}