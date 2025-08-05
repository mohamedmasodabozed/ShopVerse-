
import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    userID:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"userCollection",
        required:true
    },
    Title: {
        type:String,
        required:true,
        minLength: [5,'Title Must be longer than that'],
        maxLength: [30,'Title cannot be longer than that']
    },
    Status: {
        type: String,
        enum: ['to-do','In-Progress','Done'],
        default: 'to-do'
    },
    
}, { timestamps: true })

export const todoCollection = mongoose.model('todoCollection',todoSchema)
