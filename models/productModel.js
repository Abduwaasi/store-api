import mongoose from "mongoose";

const {Schema,model} = mongoose

const productSchema = new Schema({
 name:{
    type:String,
    required:[true, "Name is a required field"]
 },
 price:{
    type:Number,
    required:[true, "Priced is a required field"]
 },
 featured:{
    type:Boolean,
    dafault:false,

 },
 rating:{
    type:Number,
    default:4.5
 },
 createdAt:{
    type:Date,
    default:Date.now()
 },
 company:{
    type:String,
    enum:{
        values: ['ikea', 'liddy', 'caressa', 'marcos'],
        message:`{VALUE} is not supported`
    }
 }
})
const productModel = model("Product",productSchema)
export default productModel


