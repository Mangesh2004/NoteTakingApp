import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const Addnotes=mutation({
    args:{
        fileId:v.string(),
        notes:v.string(),
        createdBy:v.string()
    },
    handler:async(ctx,args)=>{
        const recordId=await ctx.db.query('notes').filter((q)=>q.eq(q.field('fileId'),args.fileId)).collect()
        if (recordId?.length==0) {
            await ctx.db.insert('notes',{
                fileId:args.fileId,
                notes:args.notes,
                createdBy:args.createdBy
            })
        }else{
            await ctx.db.patch(recordId[0]._id,{notes:args.notes})
        }
    }
})

export const getNotes = query({
    args: {
      fileId: v.string() // Changed from v.any() to v.string()
    },
    handler: async (ctx, args) => {
      try {
        const result = await ctx.db
          .query("notes")
          .filter((q) => q.eq(q.field("fileId"), args.fileId))
          .collect();
  
        // Return empty string if no notes found
        if (!result || result.length === 0) {
          return "";
        }
  
        return result[0].notes ?? ""; // Use nullish coalescing for safety
      } catch (error) {
        console.error("Error fetching notes:", error);
        throw new Error("Failed to fetch notes");
      }
    }
  });