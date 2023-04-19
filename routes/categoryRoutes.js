import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryController,
  getSingleCategoryController,
} from "../controllers/categoryController.js";

let categoryRoutes = express.Router();

//postCategory

categoryRoutes.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);

//updateCategory

categoryRoutes.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

//deleteCategory

categoryRoutes.delete(
  "/remove-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);

//getAllcategories
categoryRoutes.get(
  "/get-category",

  getCategoryController
);

//getSinglecategories
categoryRoutes.get(
  "/get-single-category/:slug",

  getSingleCategoryController
);

export default categoryRoutes;
