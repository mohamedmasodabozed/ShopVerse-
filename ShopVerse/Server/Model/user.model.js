
import { Timestamp } from 'bson'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {promisify} from 'util'
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:[6,'UserName must be between 6-30 characters'],
        maxLength:[30,'UserName must be between 6-30 characters'],
        unique:true

    },
    email:{
        type:String,
        required:true,

        unique:true
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
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productCollection"
    }]

}, {timestamps:true})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await promisify(bcrypt.hash)(this.password,salt)
    this.password = hashedPass
    
})
export const userCollection = mongoose.model("userCollection",userSchema)
