import express from "express"
import * as dotenv from "dotenv"
import "express-async-errors"


import productRoute from "./routes/productsRouter.js"
dotenv.config()
const app = express()

// Local Dependencies
import connectDB from "./db/connectDB.js"
import res from "express/lib/response.js"

const port = process.env.PORT || 8000

app.use(express.json())
app.get('/api/v1', (req, res) => {
  res.send('<h1>Product Api</h1><a href="api/v1/products">get all product</a>')
})
app.use("/api/v1/products", productRoute)


const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () => {
      console.log(`Store App is currently listening on port ${port}`)
    })
  } catch (error) {
    console.log({ error })
  }
}


start()