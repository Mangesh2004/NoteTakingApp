import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(request: NextRequest) {

    const reqUrl=request.url
    const {searchParams}:any=new URL(reqUrl)
    const pdfUrl=searchParams.get('pdfUrl')
    console.log(pdfUrl);
    
    const response=await fetch(pdfUrl)
    const data=await response.blob()
    const loader=new WebPDFLoader(data)
    const docs=await loader.load()

    let Pdftextcontent=''
    docs.forEach((doc)=>{
        Pdftextcontent+=doc.pageContent
    })

    //split the text into small chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1500,
        chunkOverlap: 20,
      });

      const output = await textSplitter.createDocuments([Pdftextcontent]);

      const splitterList : any=[]
        output.forEach((doc)=>{
            splitterList.push(doc.pageContent)
        })


    return NextResponse.json({result:splitterList})
    
}