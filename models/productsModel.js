import mongoose, { Mongoose } from "mongoose";

let productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.ObjectId, ref: "Category", required: true },
    quantity: { type: Number, required: true },
    image: { data: Buffer, contentType: String },
    shipping: { type: Boolean },
  },
  { timestamps: true }
);

let ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
