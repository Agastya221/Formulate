import mongoose from "mongoose";

export default async function connect(){
    try {
        mongoose.connect("mongodb+srv://agastyash213:5wrDyfKpL1doZYiY@cluster0.gcgfn4x.mongodb.net/intern")
        mongoose.connection.setMaxListeners(20);
        const connection =  mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })
        connection.on("error", () => {
            console.log("Error connecting to MongoDB");
        })
    } catch (error) {
        console.log(error)
    }
}