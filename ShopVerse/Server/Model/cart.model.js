import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userCollection",
        unique:true,
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productCollection",
        
    }]
})


export const cartCollection = mongoose.model("cartCollection",cartSchema)