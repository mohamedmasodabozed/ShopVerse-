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
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userCollection",
        required:true
    }


}, {timestamps:true})


productSchema.virtual('finalPrice').get( function (){
    if(!this.productDiscount && !this.productDiscount > 0) return this.productPrice
    return this.productPrice - (this.productPrice * this.productDiscount/100)
})

productSchema.set('toJSON',{virtuals:true})
// productSchema.set("toObject", { virtuals: true });
export const productCollection = mongoose.model("productCollection",productSchema)
