import { productCollection } from '../Model/product.model.js'
import {userCollection} from '../Model/user.model.js'


export async function createUser(req,res){
    try{
        let {...body} = req.body
        let insert = await userCollection.create(body)
        
        
        res.json({Message:insert})
    }catch(error){
        res.json({Message:`Error: ${error}`})
    }
    
}