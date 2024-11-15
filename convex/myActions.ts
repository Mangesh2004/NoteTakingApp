
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
        apiKey:'AIzaSyB6rIcL1d0siX_P25e1da3D6wDSvcNiDt0',
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
    fileId:v.any(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
      apiKey:'AIzaSyB6rIcL1d0siX_P25e1da3D6wDSvcNiDt0',
      model: "text-embedding-004", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    }), { ctx });

    const resultOne = (await vectorStore.similaritySearch(args.query,1)).filter((q)=>q.metadata.fileId==args.fileId)
        // const filteredResults = resultOne.filter((resultOne) => (resultOne.metadata).join('') == args.fileId);
    console.log(resultOne);
    
    
    return JSON.stringify(resultOne);
  },
});