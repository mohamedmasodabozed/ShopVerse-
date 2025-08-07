import mongoose from 'mongoose'
import express from 'express'
import testingRouter from './Routes/test.routes.js'

const app = express()
const port = 3000




app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/ShopVerse')
.then(() => console.log("Successful"))
.catch((err) => {console.error(err)});


app.use('/test',testingRouter)




app.listen(port, (error) => {
    if (error) console.log(`Error in Connection: ${error}`)
    else {
        console.log(`Connected on ${port}`)
    }

})
