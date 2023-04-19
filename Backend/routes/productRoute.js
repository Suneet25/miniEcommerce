import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  getRelatedProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
  filterProductController,
  productCountController,
  productListController,
  searchProductController,
  categoryProductController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

let productRoutes = express.Router();

//post

productRoutes.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

//get all products

productRoutes.get("/get-product", getProductController);

//get single product
productRoutes.get("/get-product/:slug", getSingleProductController);

//getimilarProduct

productRoutes.get("/related-products/:pid/:cid", getRelatedProductController);

//getImage of product

productRoutes.get("/product-image/:pid", getPhotoController);

//deleteProduct

productRoutes.delete(
  "/remove-product/:pid",
  requireSignin,
  isAdmin,
  deleteProductController
);

//updatePrduct
productRoutes.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

//filterProducts

productRoutes.post("/filter-product", filterProductController);

//productsCount

productRoutes.get("/product-count", productCountController);

//productListController

productRoutes.get("/get-product-list/:page", productListController);

//searchProduct

productRoutes.get("/search/:keyword", searchProductController);

//getCatgoryProducts

productRoutes.get("/category-product/:slug", categoryProductController);

//paymentRoutes

//token

productRoutes.get("/braintree/token", braintreeTokenController);

//paayment

productRoutes.post(
  "/braintree/payment",
  requireSignin,
  braintreePaymentController
);

export default productRoutes;
