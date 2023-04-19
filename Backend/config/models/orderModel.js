import mongoose from "mongoose";

let orderSchema = mongoose.Schema(
  {
    products: [{ type: mongoose.ObjectId, ref: "product" }],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

let OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
