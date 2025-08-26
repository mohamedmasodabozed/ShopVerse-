import { productCollection } from '../Model/product.model.js'
import { userCollection } from '../Model/user.model.js'



export async function createProduct(req,res){
    try{
        //From authentication middleware
        let sellerId = req.user._id
        
        let body = req.body
        if(!body || !req.file) res.status(400).json({Message:"Error bad request"})
        const product = {
            ...body,
            seller:sellerId,
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
        let sellerId = req.user._id
        let products = await productCollection.find({seller:sellerId})
        if(!products) res.status(404).json({Message:"You do not have any products"})
        res.json(products)
    }catch(error){
        res.status(400).json({Message:`${error}`})
    }
}

export async function getProductById(req,res){
    try{
        let productId = req.params.productId

        let product = await productCollection.findById(productId).populate("seller")
        if(!product) res.status(404).json({Message:"Product Not Found"})
        
        res.json({Message:"Success",Data:product})

    }catch(error){
        res.status(400).json({Message:`${error}`})
    }
}

