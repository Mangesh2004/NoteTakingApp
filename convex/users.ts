import { mutation } from "./_generated/server";
import {v } from "convex/values";

export const CreateUser=mutation({
    args:{
        username:v.string(),
        email:v.string(),
        imageUrl:v.string(),
    },
    handler:async (ctx,args)=>{
        const user= await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect()

        if (user?.length==0) {
            await ctx.db.insert('users',{
                
                email:args.email,
                username:args.username,
                imageUrl:args.imageUrl
            })
            return 'Inserted New User'
        }
        return 'User Already Exists'
    }
})