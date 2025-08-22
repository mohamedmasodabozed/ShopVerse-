import express from 'express'
import userRouter from './Routes/user.routes.js'
import productRouter from './Routes/product.routes.js'
import dotenv from 'dotenv'
import dbConnect from './config/db.js'
import cors from 'cors'





const app = express();
const port = 3000;


dotenv.config()

app.use(cors())
app.use(express.json())


dbConnect()





app.use('/users',userRouter)
app.use('/products',productRouter)




app.listen(port, (error) => {
    if (error) {
        console.log(`Error in Connection: ${error}`);
    } else {
        console.log(`Server running on port ${port}`);
    }
});
