import { productCollection } from '../Model/product.model.js'
import { userCollection } from '../Model/user.model.js'
import { modelMap } from '../Model/productTypes.model.js'


export async function createProduct(req, res) {
    try {
        //From authentication middleware
        let sellerId = req.user._id

        let body = req.body
        if (!body || !req.file || !body.type) return res.status(400).json({ Message: "Error bad request" })
        const product = {
            ...body,
            seller: sellerId,
            productImage: {
                URL: req.file.path,
                ID: req.file.filename
            }
        }
        console.log(body)
        const type = modelMap[body.type]
        let createdProduct = await type.create(product)

        return res.json({ Message: "Success", product: createdProduct })
    } catch (error) {

        return res.status(400).json({ Message: ` ${error}` })
    }
}

export async function getSellerProducts(req, res) {
    try {
        let sellerId = req.user._id
        let products = await productCollection.find({ seller: sellerId })
        if (!products) return res.status(404).json({ Message: "You do not have any products" })
        return res.json(products)
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}

export async function getProductById(req, res) {
    try {
        let productId = req.params.productId

        let product = await productCollection.findById(productId).populate("seller")
        if (!product) return res.status(404).json({ Message: "Product Not Found" })

        return res.json({ Message: "Success", Data: product })

    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}


// export async function getProductByCategory

export async function getProducts(req, res) {
    try {
        let category = req.query.category
        let type = req.query.type
        let filter = req.query.filter
        let products
        if (!category && !filter && !type) {
            products = await productCollection.find()
            console.log(products)
        }
        else if (category) {
            products = await productCollection.find({ productCategory: category })
        }
        else if (type){
            products = await productCollection.find({type:type})
        }
        else if (filter == "flashSales") {
            products = await productCollection.find({ flashSales: { $gt: 0 } })
        }
        else if (filter == "bestSellingProducts") {
            products = await productCollection.find().sort({ amountSold: -1 }).limit(2)
        }
        else if (filter == "newArrivals") {
            products = await productCollection.find().sort({ createdAt: -1 }).limit(4)
        }

        return res.json({ Message: "Success", products: products })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}

//Done

// THIS NEEDS TO BE UPDATED TO THE LATEST TYPE UPDATES ( SIGH )
export async function updateSellerProduct(req, res) {
    try {
        let body = req.body
        let productId = req.params.productId
        let sellerId = req.user._id

        let updatedData

        req.file ? updatedData = {
            ...body,
            productImage: {
                URL: req.file.path,
                ID: req.file.filename
            }
        } : updatedData = {
            ...body
        }
        let updatedSellerProduct = await productCollection.findOneAndUpdate({ _id: productId, seller: sellerId }, updatedData, { new: true })
        console.log(updatedSellerProduct)
        if (!updatedSellerProduct) return res.status(401).json({ Message: "You do not own this product - Unauthorized" })
        return res.json({ Message: "Success", updatedProduct: updatedSellerProduct })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }

}

//Tested - Admin related function to apply a flash sales discount on a given product
export async function applyFlashSale(req, res) {
    try {
        let productId = req.params.productId
        let { discount } = req.body
        if (!discount) return res.status(400).json({ Message: "Missing Discount" })
        let product = await productCollection.findOneAndUpdate({ _id: productId }, { flashSales: discount }, { new: true })
        if (!product) return res.status(404).json({ Message: "Product Not Found" })
        return res.json({ Message: "Success", product: product })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }

}


// export async function getFlashSales(req,res){
//     let products = await productCollection.find({flashSales: {$gt : 0}})
//     return res.json({Message:"Success",products:products})
// }
