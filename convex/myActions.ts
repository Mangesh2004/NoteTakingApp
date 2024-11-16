
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";


export const ingest = action({
  args: {
    splitText:v.any(),
    fileId:v.any(),
  },
  handler: async (ctx,args) => {
    const metadataArray = args.splitText.map(() => ({
      fileId: args.fileId, // Attach the same fileId to all texts
    }));
    await ConvexVectorStore.fromTexts(
      args.splitText,
      metadataArray,
      new GoogleGenerativeAIEmbeddings({
        apiKey:'AIzaSyBCM1mA-uNRHIKh9fHRFbwUq12CFBK2Tfw',
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId:v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
      apiKey:'AIzaSyBCM1mA-uNRHIKh9fHRFbwUq12CFBK2Tfw',
      model: "text-embedding-004", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    }), { ctx });
    const resultOne =await (await vectorStore.similaritySearch(args.query,1))
    .filter((q)=>q.metadata.fileId==args.fileId)
    // const resultOne = (await vectorStore.similaritySearch(args.query,1)).filter((q)=>q.metadata.fileId==args.fileId)
        // const filteredResults = resultOne.filter((resultOne) => (resultOne.metadata).join('') == args.fileId);
    console.log("Result of search"+resultOne);

    
    
    return JSON.stringify(resultOne);
  },
});