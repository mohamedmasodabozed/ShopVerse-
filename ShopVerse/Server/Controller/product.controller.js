import { productCollection } from '../Model/product.model.js'
import { userCollection } from '../Model/user.model.js'



export async function createProduct(req,res){
    console.log("PLEASe")
    try{
        //From authentication middleware
        // sellerId = req.user._id
        let sellerId = "68ab692a4a6e397ea82f04c5"
        let body = req.body
        if(!body || !req.file) res.status(400).json({Message:"Error bad request"})
        const product = {
            ...body,
            seller:seller,
            productImage:{
                URL:req.file.path,
                ID:req.file.filename
            }
        }
        
        let createdProduct = await productCollection.create(product)
        
        res.json({Message:"Success",product:createdProduct})
    }catch(error){
        
        res.status(400).json({Message:`Erroraaa: ${error}`})
    }
}

export async function getSellerProducts(req,res){
    try{
        // sellerId = req.user._id
        sellerId = "68ab734e1e6ccb2aab0b1cdb"
        let products = await userCollection.find({_id:sellerId},{products:1}).populate("products")
        res.json(products)
    }catch(error){
        res.status(400).json({Message:`${error}`})
    }
}

