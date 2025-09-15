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
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        size: {
            type: String,

        },
        color: {
            type: String
        },
        _id: false
    }]
})

cartSchema.pre('findOneAndUpdate', async function (next) {
    try {

        const filter = this.getFilter()
        const update = this.getUpdate()
        let productExistsInCart
        if (update['$inc']) {
            const arrayFilters = this.getOptions().arrayFilters[0]
            if(arrayFilters['element.size'] && arrayFilters['element.color']){
                productExistsInCart = await cartCollection.findOne({
                    user: filter.user,
                     products: {
                        $elemMatch: {
                            product: arrayFilters['element.product'],
                            size: arrayFilters['element.size'],
                            color: arrayFilters['element.color']
                        }
                    }
                })
                // console.log(productExistsInCart)
            if (!productExistsInCart) return next()
            }
            else if(arrayFilters['element.color']){
                productExistsInCart = await cartCollection.findOne({
                    user: filter.user,
                     products: {
                        $elemMatch: {
                            product: arrayFilters['element.product'],
                            color: arrayFilters['element.color']
                        }
                    }
                })
            if (!productExistsInCart) return next()
            }
        else{

            productExistsInCart = await cartCollection.findOne({
                    user: filter.user,
                     products: {
                        $elemMatch: {
                            product: arrayFilters['element.product'],
                        }
                    }
                })
            if (!productExistsInCart) return next()
            // productExistsInCart = await cartCollection.findOne({ user: filter.user, "products.product": filter['products.product'] })
            // if (!productExistsInCart) return next()
        }
            
        // try to put the conditions in the below conditions

            const addedQuantity = update['$inc']['products.$[element].quantity']
            const productId = arrayFilters['element.product']
            let product = await productCollection.findOne({ _id: productId })
            let filteredProductCart = productExistsInCart.products.filter((products) => products.product == productId)
            // console.log(filteredProductCart)
            let filteredProduct

            if (arrayFilters['element.size'] && arrayFilters['element.color']) {
                // get the product in the cart that has the requested size and color ( same product can exist in the cart but with either a different size or color)
                filteredProductCart = filteredProductCart.filter((sizes) => sizes.size == arrayFilters['element.size']).filter((colors) => colors.color == arrayFilters['element.color'])
                
                // filteredProductCart = filteredProductCart.filter((colors) => colors.color == arrayFilters['element.color'])

                // getting the the correct size and the color, to be able to check for the quantity later and compare it with the cart
                filteredProduct = product.sizes.filter((sizes) => sizes.size == filteredProductCart[0].size)[0].colors.filter((colors) => colors.color == filteredProductCart[0].color)


                // filteredProduct = filteredProduct[0].colors.filter((colors) => colors.color == filteredProductCart[0].color)
            }

            else if (arrayFilters['element.color']) {   
                filteredProductCart = filteredProductCart.filter((colors) => colors.color == arrayFilters['element.color'])

                filteredProduct = product.colors.filter((colors)=>colors.color == filteredProductCart[0].color)

            }

            else{
                filteredProduct = product

                if (filteredProductCart[0].quantity + addedQuantity <= filteredProduct.stock) return next()
                else {
                    return next(new Error("Quantity Exceeds Product Quantity1"))
                }
            }
    
            if (filteredProductCart[0].quantity + addedQuantity <= filteredProduct[0].stock) return next()
                else {
                    return next(new Error("Quantity Exceeds Product Quantity"))
                }

        }
        if (!update['$inc']) return next()
    } catch (error) {
        next(error)
    }

})

export const cartCollection = mongoose.model("cartCollection", cartSchema)