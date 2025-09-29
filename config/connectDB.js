import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDb Connected');
    } catch (error) {
        console.log(`Error  : ${error.message}`)
    }
}

export default connectDB;