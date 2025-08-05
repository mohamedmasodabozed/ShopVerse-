import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userName:{ 
        type: String,
        required:true,
        unique:true,
        minLength:[8,'cannot be lower than 8']
    },
    Password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true,
        minLength:[5,'cannot be lower than 5'],
        maxLength:[15,'cannot be higher than 15']
    },
    lastName: {
        type:String,
        required:true,
        minLength:[5,'cannot be lower than 5'],
        maxLength:[15,'cannot be higher than 15']
    },
    dob: {type:Date},  
}, { timestamps: true })

export const userCollection = mongoose.model('userCollection',userSchema)