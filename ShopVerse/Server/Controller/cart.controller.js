import { cartCollection } from "../Model/cart.model.js";
import mongoose from 'mongoose'
import { productCollection } from "../Model/product.model.js"
export async function createCart(req, res) {
    try {
        let userId = req.user._id

        await cartCollection.create({ user: userId })
        return res.json({ Message: "Success", Data: req.user })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }

}


export async function addToCart(req, res) {
    try {
        let userId = req.user._id
        let productId = req.params.productId
        let quantity = req.body.quantity
        let size = req.body.size
        let color = req.body.color


        let updatedCart
        // let cartProductExists


        if (!userId || !quantity) return res.status(400).json({ Message: "Bad Request" })
        if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ Message: "Invalid Product ID" })

        let productExists = await productCollection.findById(productId)
        if (!productExists) return res.status(404).json({ Message: "Product doesn't exist" })
        if (size && color) {
            if(!productExists.sizes) return res.status(400).json({Message:"This product does not have sizes"})

            let sizeExists = productExists.sizes.filter((sizes) => sizes.size == size)
            if(sizeExists.length === 0) return res.status(400).json({Message:"This product doesnt have the requested size"})
            productExists = productExists.sizes.filter((sizes) => sizes.size == size)[0].colors.filter((colors) => colors.color == color)
            if (productExists.length === 0) return res.status(400).json({ Message: "The requested size doesnt have that color" })
            const productExistsInCart = await cartCollection.findOne({
                user: userId,
                products: {
                    $elemMatch: {
                        product: productId,
                        size: size,
                        color: color
                    }
                }
            })


            if (productExistsInCart) {


                updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $inc: { "products.$[element].quantity": quantity } },
                    {
                        arrayFilters: [{
                            "element.product": productId, "element.size": size, "element.color": color
                        }],
                        new: true
                    })
            }

            else {
                console.log("Hello")
                if (quantity > productExists[0].stock) return res.status(400).json({ Message: "requested quantity does not exist in stock" })
                updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $push: { products: { product: productId, quantity: quantity, size: size, color: color } } }, { new: true })
            }

        }
        else if (color) {
            console.log("asfaaaaaaaaaaaaa")
            console.log(productExists)
            if(!productExists.colors) return res.status(400).json({ Message: "This product does not have colors" })
            productExists = productExists.colors.filter((colors) => colors.color == color)
            if (productExists.length === 0) return res.status(400).json({ Message: "Wrong Color" })
            const productExistsInCart = await cartCollection.findOne({
                user: userId,
                products: {
                    $elemMatch: {
                        product: productId,
                        color: color
                    }
                }
            })

            // console.log(productExistsInCart)
            if (productExistsInCart) {
                updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $inc: { "products.$[element].quantity": quantity } }, {
                    arrayFilters: [{
                        "element.product": productId, "element.color": color
                    }],
                    new: true
                })
            }
            else {
                if (quantity > productExists[0].stock) return res.status(400).json({ Message: "requested quantity does not exist in stock" })

                updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $push: { products: { product: productId, quantity: quantity, color: color } } }, { new: true })
            }
        }
        else {
            const productExistsInCart = await cartCollection.findOne({
                user: userId,
                products: {
                    $elemMatch: {
                        product: productId
                    }
                }
            })

            if (productExistsInCart) {
                updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $inc: { "products.$[element].quantity": quantity } }, {
                    arrayFilters: [{
                        "element.product": productId
                    }],
                    new: true
                })
            }
            else {
                if (quantity > productExists.stock) return res.status(400).json({ Message: "requested quantity does not exist in stock" })

                updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $push: { products: { product: productId, quantity: quantity } } }, { new: true })
            }
        }

        return res.json({ Message: "Success", Data: updatedCart })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}

export async function removeFromCart(req, res) {
    try {
        let userId = req.user._id
        let productId = req.params.productId
        if (!userId) return res.status(400).json({ Message: "Bad Request" })
        if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ Message: "Invalid Product ID" })

        let productExists = await productCollection.findById(productId)
        if (!productExists) return res.status(404).json({ Message: "Product doesn't exist" })

        let updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $pull: { products: { product: productId } } }, { new: true })

        return res.json({ Message: "Success", Data: updatedCart })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}


export async function getCartLen(req, res) {
    try {
        let userId = req.user._id
        let userCart = await cartCollection.findOne({ user: userId })
        if (!userCart) return res.status(404).json({ Message: "User Cart Not Found" })
        let cartLen = userCart.products.length
        console.log(cartLen)
        return res.json({ Message: "Success", Length: cartLen })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}

export async function getCartItems(req, res) {
    try {
        let userId = req.user._id
        let userCart = await cartCollection.findOne({ user: userId }, { "products._id": -1 }).populate("products.product")
        if (!userCart) return res.status(404).json({ Message: "User Cart Not Found" })

        return res.json({ Message: "Success", Data: userCart })
    } catch (error) {
        return res.status(400).json({ Message: `${error}` })
    }
}














// export async function addToCart(req, res) {
//     try {
//         let userId = req.user._id
//         let productId = req.params.productId
//         let quantity = req.body.quantity
//         let updatedCart
//         if (!userId || !quantity) return res.status(400).json({ Message: "Bad Request" })
//         if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ Message: "Invalid Product ID" })

//         let productExists = await productCollection.findById(productId)
//         if (!productExists) return res.status(404).json({ Message: "Product doesn't exist" })

//         let productExistsInCart = await cartCollection.findOne({
//             user: userId,
//             "products.product": productId
//         })
//         console.log(productExistsInCart)
//         if (!productExistsInCart) {
//             updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, { $push: { products: { product: productId, quantity: quantity } } }, { new: true })
//         }
//         else {
//             updatedCart = await cartCollection.findOneAndUpdate({ user: userId, "products.product": productId }, { $inc: { "products.$.quantity": quantity } }, { new: true })
//         }


//         return res.json({ Message: "Success", Data: updatedCart })
//     } catch (error) {
//         return res.status(400).json({ Message: `${error}` })
//     }
// }
