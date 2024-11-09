import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileEntrytoDB= mutation({
    args:{
        fileId:v.string(),
        storageId:v.string(),
        fileName:v.string(),
        createdBy:v.string(),
    },
    handler:async(ctx,args)=>{
        const result= await ctx.db.insert('pdfFiles',{
            fileId:args.fileId,
            storageId:args.storageId,
            fileName:args.fileName,
            createdBy:args.createdBy
        })
        return 'Inserted'
    }

})