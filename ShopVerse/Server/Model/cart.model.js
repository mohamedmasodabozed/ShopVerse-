import mongoose from 'mongoose'
import { productCollection } from './product.model.js'

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
        unique: true,
        required: true
    },
    products: [{

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productCollection",
        },
        quantity: {
            type: Number
        }
    }]
})

cartSchema.pre('findOneAndUpdate', async function (next) {
    try {

        const obj = this.getFilter()
        const update = this.getUpdate()
        console.log(update)
        if (!update['$inc']) {
            next()
        }

        const addedQuantity = update['$inc']['products.$.quantity']
        const productId = obj['products.product']
        let product = await productCollection.findOne({ _id: productId })
        let cartProduct = await cartCollection.findOne({ user: obj.user })
        // console.log(cartProduct)
        let filtered = cartProduct.products.filter((product) => product.product == productId)
        // console.log(filtered)
        if (filtered[0].quantity + addedQuantity <= product.productQuantity) next()
        else {
            return next(new Error("Quantity Exceeds Product Quantity"))
        }
    } catch (error) {
        next(error)
    }

})

export const cartCollection = mongoose.model("cartCollection", cartSchema)