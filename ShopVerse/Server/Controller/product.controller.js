import { productCollection } from '../Model/product.model.js'



export async function createProduct(req,res){
    try{
        let {...body} = req.body
        let insert = await productCollection.create(body)
        
        res.json({Message:insert})
    }catch(error){
        res.json({Message:`Error: ${error}`})
    }
}