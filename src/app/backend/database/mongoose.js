import mongoose from "mongoose";

export default async function connectionToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Success db connection')
    } catch (err) {
        console.log('DB connection error ', {err})
    }
}