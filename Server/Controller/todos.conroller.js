import { readFileSync, writeFileSync } from 'fs'
import {todoCollection} from '../Model/todos.model.js'

export async function createTodo (req,res){
    try{
        if(!req.body) res.status(400).json({Message:"No request body found"})
        let {...data} = req.body
        let New = await todoCollection.create(data)
        New = await todoCollection.find({Title:New.Title}).populate("userID")
        res.json({Message:New})
    }catch(err){
        res.status(404).json({error:err})
    }   
}

export async function editByID(req,res){
        try{
            console.log('ASfasf')
            let {ID} = req.params
            if(!req.body) res.status(400).json({Message:"No request body found"})
            let {...data} = req.body
            let Updated = await todoCollection.findByIdAndUpdate(ID,data,{new:true})
            if(!Updated) res.status(404).json({Message:"Todo ID not found"})
            console.log(Updated)
            res.json({Message:Updated})
        }catch(err){
            console.log(`This is the error ${err}`)
            res.status(400).json({Error:err})
        }
}
export async function getAll (req,res){
    try{
        let New = await todoCollection.find().populate("userID", )
        
        res.json({Message:New})
    }catch(err){
        res.status(404).json({error:err})
    }   
}

export async function delByID(req,res){
        try{
            let {ID} = req.params

            let deletedTodo = await todoCollection.findByIdAndDelete(ID)
            if(!deletedTodo) res.status(404).json({Message:"Todo ID not found"})
            console.log(deletedTodo)
            res.json({Message:deletedTodo})
        }catch(err){
            console.log(`This is the error ${err}`)
            res.status(400).json({Error:err})
        }
}

export async function QueryString(req,res){
    let limit = req.query.limit
    let skip = req.query.skip
    
    if(limit ==  null) {limit = 10}
    if(skip == null) {skip = 0}
    
    let New = await todoCollection.find({}).skip(skip).limit(limit)
    // let json = JSON.parse(readFileSync('./text.json' , {encoding:"utf-8"}))
    // let newJson = json.slice(skip)
    // console.log(skip,limit)
    // newJson = newJson.slice(0,limit)
    // console.log(newJson)
    res.json({Message:New})
}



// export function Delete(req,res){
//     let {ID}= req.params
//     let json = JSON.parse(readFileSync('./text.json' , {encoding:"utf-8"}))
//     let Index = json.findIndex((todo) => todo._id === Number(ID) )
//     json.splice(Index,1)
//     writeFileSync('./text.json', JSON.stringify(json))
//     return res.status(200).json({Messsage:"Successful"})
// }

// export function getByID(req,res){
//     let {ID}= req.params
    
//     let json = JSON.parse(readFileSync('./text.json' , {encoding:"utf-8"}))
    
//     let todo = json.find(todo => todo._id == Number(ID))
//     console.log(todo)
//     return res.status(200).json({Data:todo})

// }

// export function InsertTodo(req,res){
//     let {Title} = req.body
//     let json = JSON.parse(readFileSync('./text.json' , {encoding:"utf-8"}))
//     let NewObj = {_id:json.length+1,Title:Title,Status:"New",}
//     console.log(NewObj)
//     json.push(NewObj)
//     writeFileSync('./text.json', JSON.stringify(json))
//     res.json({message:"Inserted Successfully"})

// }

// export function UpdateTodo(req,res){
//     let {ID} = req.params
//     let {...newTodo} = req.body
//     let json = JSON.parse(readFileSync('./text.json' , {encoding:"utf-8"}))
//     let todo = json.find(todo => todo._id == Number(ID))
//     Object.assign(todo,newTodo)
//     writeFileSync('./text.json', JSON.stringify(json))
//     res.json({message:"Edited Successfully"})

// }

// export function QueryString(req,res){
//     let limit = req.query.limit
//     let skip = req.query.skip
    
//     if(limit ==  null) {limit = 10}
//     if(skip == null) {skip = 0}
    
//     let json = JSON.parse(readFileSync('./text.json' , {encoding:"utf-8"}))
//     let newJson = json.slice(skip)
//     console.log(skip,limit)
//     newJson = newJson.slice(0,limit)
//     console.log(newJson)
//     res.json({Message:newJson})
// }