import mongoose from 'mongoose'

export const connectDb = async()=>{
    try {
        
        if(!process.env.DATABASE_URL){
throw new Error("Mongodb url is missing")
        }

        const connectionInstannce = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Mongodb is connected HOST DB !!",connectionInstannce.connection.host)
    } catch (error) {
        console.log("Mongodb connection failure",error)
        process.exit(1);
    }
}