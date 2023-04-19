import mongoose from "mongoose";

let categorySchema = mongoose.Schema({
  name: { type: String, required: true, uniquue: true },
  slug: { type: String, lowercase: true },
});

let CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
