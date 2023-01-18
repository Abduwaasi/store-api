import express from "express"
import { getAllProducts, getAllProductsStatic } from "../controller/productController.js"


const router = express.Router()


router.route("/static").get(getAllProductsStatic)
router.route("/").get(getAllProducts)


export default router

