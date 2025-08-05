import {userCollection} from '../Model/user.model.js'

export async function registerUser(req,res){
    
    
        try{
            if(!req.body) res.status(400).json({Message:"No request body found"})
            let {...Data} = req.body
            let newUser = await userCollection.create(Data)
            res.json({Message:newUser})
        }catch(err){
            console.log(`This is the error ${err}`)
            res.status(400).json({Error:err})
        }
}

export async function returnUsers(req,res){
        try{
            let userData = await userCollection.find({},{firstName:1})
            console.log(userData)
            res.json({Message:userData})
        }catch(err){
            console.log(`This is the error ${err}`)
            res.status(400).json({Error:err})
        }
}

export async function delByID(req,res){
        try{
            let {ID} = req.params

            let deletedUser = await userCollection.findByIdAndDelete(ID)
            if(!deletedUser) res.status(404).json({Message:"User ID not found"})
            console.log(deletedUser)
            res.json({Message:deletedUser})
        }catch(err){
            console.log(`This is the error ${err}`)
            res.status(400).json({Error:err})
        }
}

export async function editByID(req,res){
        try{
            
            let {ID} = req.params
            if(!req.body) res.status(400).json({Message:"No request body found"})
            let {...data} = req.body
            console.log(data)
            let Updated = await userCollection.findByIdAndUpdate(ID,data,{new:true})
            if(!Updated) res.status(404).json({Message:"User ID not found"})
            console.log(Updated)
            res.json({Message:Updated})
        }catch(err){
            console.log(`This is the error ${err}`)
            res.status(400).json({Error:err})
        }
}