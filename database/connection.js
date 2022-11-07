//Create the mongodb connection object
import mongoose from "mongoose"

const main = async() => {
    await mongoose.connect("mongodb+srv://admin:admin123@cluster0.vugzzzu.mongodb.net/?retryWrites=true&w=majority")
    console.log("Database connected")
}

export default main;