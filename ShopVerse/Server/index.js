import mongoose from 'mongoose'
import express from 'express'
import userRouter from './Routes/user.routes.js'
import productRouter from './Routes/product.routes.js'
const app = express()
const port = 3000




app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/ShopVerse')
.then(() => console.log("Successful"))
.catch((err) => {console.error(err)});


app.use('/user',userRouter)
app.use('/product',productRouter)




app.listen(port, (error) => {
    if (error) console.log(`Error in Connection: ${error}`)
    else {
        console.log(`Connected on ${port}`)
    }

})
