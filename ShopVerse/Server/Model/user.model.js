
import { Timestamp } from 'bson'
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:[6,'UserName must be between 6-30 characters'],
        maxLength:[30,'UserName must be between 6-30 characters'],

    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'password must be higher than or equal 8']
    },
    role:{
        type:String,
        enum:['customer','seller','admin'],
        required:true
    },
    product_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productCollection"
    }]

}, {timestamps:true})

export const userCollection = mongoose.model("userCollection",userSchema)
