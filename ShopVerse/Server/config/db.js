import mongoose from 'mongoose'
function dbConnect(){
mongoose.connect('mongodb+srv://abdalrahmanalamir8:7v165RMwiXjReLnO@cluster0.w0zhnfh.mongodb.net/shopVerse?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("Atlas Connection Successful"))
.catch((err) => {console.log(err)});
}



export default dbConnect