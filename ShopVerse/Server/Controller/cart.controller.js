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
        let updatedCart
        if (!userId || !quantity) return res.status(400).json({ Message: "Bad Request" })
        if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ Message: "Invalid Product ID" })

        let productExists = await productCollection.findById(productId)
        if (!productExists) return res.status(404).json({ Message: "Product doesn't exist" })
            
        let cartProductExists = await cartCollection.findOne({ user: userId, "products.product": productId })

        if (cartProductExists) {
            updatedCart = await cartCollection.findOneAndUpdate({ user: userId, "products.product": productId }, { $inc: { "products.$.quantity": quantity } }, { new: true })
            console.log(updatedCart)
        }

        else if (!updatedCart) {
            updatedCart = await cartCollection.findOneAndUpdate({ user: userId }, {
                $push: { products: { product: productId, quantity: quantity } }
            }, { new: true })
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
        let userCart = await cartCollection.findOne({ user: userId },{"products._id":-1}).populate("products.product")
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
