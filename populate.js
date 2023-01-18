import * as dotenv from "dotenv"
dotenv.config()
import productModel from "./models/productModel.js"
import connectDB from "./db/connectDB.js"

// Data

import productData from "./product.json" assert { type: "json" }

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        await productModel.deleteMany()
        await productModel.create(productData)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()