import slugify from "slugify";
import CategoryModel from "../models/categoryModel.js";

//createCategoryController
export let createCategoryController = async (req, res) => {
  try {
    let { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    //check if exist
    let exist = await CategoryModel.findOne({ name });

    if (exist) {
      return res
        .status(200)
        .send({ success: false, message: "Name already exists" });
    }

    let category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category has been created",
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error: error });
  }
};

//updateCategoryController

export let updateCategoryController = async (req, res) => {
  try {
    let { name } = req.body;
    let { id } = req.params;
    if (!name || !id) {
      return res.status(401).send({ message: "Name and id are required" });
    }
    let updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Category has been updated",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating the category",
      error,
    });
  }
};

//deleteCategoryController

export let deleteCategoryController = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(401).send({ message: "Id is required" });
    }
    let deleteCategory = await CategoryModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Category has been deleted",
      deleteCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the category",
      error,
    });
  }
};

//getCategoryController

export let getCategoryController = async (req, res) => {
  try {
    let categories = await CategoryModel.find({});
    res.status(201).send({
      success: true,
      message: "All categories has been fetched",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories",
      error,
    });
  }
};

//getSingleCategoryController

export let getSingleCategoryController = async (req, res) => {
  try {
    let getSingleCategories = await CategoryModel.findOne({
      slug: req.params.slug,
    });
    res.status(201).send({
      success: true,
      message: "Single categories has been fetched",
      getSingleCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single categories",
      error,
    });
  }
};
