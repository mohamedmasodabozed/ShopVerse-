import mongoose from 'mongoose'
function dbConnect(){
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Atlas Connection Successful"))
.catch((err) => {console.log(err)});
}



export default dbConnect