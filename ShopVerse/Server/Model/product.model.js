import mongoose from 'mongoose'


const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true,

    },
    productDescription:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true,
        enum:['Woman\'s Fashion','Men\'s Fashion','Electronics','Home Appliances','Medicine','Sports & Outdoor','Baby\'s & Toys','Groceries & Pets','Health & Beauty']
    },
    productPrice:{
        type:Number,
        required:true

    },
    productDiscount:{
        type:Number,
        min:0,
        max:100
    },

    isDiscount:{
        type:Boolean
    },

    //discounted price will be calculated in the API and updated to the database
    discountedPrice:{
        type:Number
    },

    productQuantity:{
        type:Number,
        required:true
    },
    productImage:{
        URL:{
            type:String,
            required:true
        },
        ID:{
            type:String,
            required:true
        }
    }

}, {timestamps:true})


export const productCollection = mongoose.model("productCollection",productSchema)
