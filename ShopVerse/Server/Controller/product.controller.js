import { productCollection } from '../Model/product.model.js'



export async function createProduct(req,res){
    try{
        console.log(process.env.CLOUDINARY_API_KEY)
        let body = req.body
        if(!body || !req.file) res.status(400).json({Message:"Error bad request"})
        const product = {
            ...body,
            productImage:{
                URL:req.file.path,
                ID:req.file.filename
            }
        }
        console.log(product)
        let insert = await productCollection.create(product)
        
        res.json({Message:insert})
    }catch(error){
        res.json({Message:`Error: ${error}`})
    }
}