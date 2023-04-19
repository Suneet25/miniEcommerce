import fs from "fs";
import ProductModel from "../models/productsModel.js";
import slugify from "slugify";
import CategoryModel from "../models/categoryModel.js";
import OrderModel from "../models/orderModel.js";
import dotenv from "dotenv";
import braintree from "braintree";
dotenv.config();

//payment gateway

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export let createProductController = async (req, res) => {
  try {
    let { name, description, price, category, quantity, shipping } = req.fields;
    let { image } = req.files;
    //validation

    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required" });
      case !description:
        return res.status(500).send({ message: "Description is required" });
      case !price:
        return res.status(500).send({ message: "Price is required" });
      case !category:
        return res.status(500).send({ message: "Category is required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is required" });
      case !shipping:
        return res.status(500).send({ message: "Shipping is required" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ message: "Image is required and should be less than 1MB" });
    }
    let products = new ProductModel({ ...req.fields, slug: slugify(name) });

    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();

    res.status(201).send({
      successs: true,
      message: "Product created successfully ",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ suucess: false, message: "Error while creating product", error });
  }
};

export let getProductController = async (req, res) => {
  try {
    let products = await ProductModel.find({})
      .select("-image") //select will help to not select the image because it will take more time which is not optimal
      .populate("category") // populate will help to show specific category(In our case kids)
      .limit(12) // limit upto 12 data
      .sort({ createdAt: -1 }); //sort w.r.t created time(asc order)
    res.status(201).send({
      success: true,
      message: "All products has been fetched",
      totalCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ suucess: false, message: "Error while getting product", error });
  }
};

export let getSingleProductController = async (req, res) => {
  try {
    let product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(201).send({
      successs: true,
      message: "Single Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      suucess: false,
      message: "Error while getting single product",
      error,
    });
  }
};

//  getRelatedProductController

export let getRelatedProductController = async (req, res) => {
  try {
    let { cid, pid } = req.params;

    let products = await ProductModel.find({ category: cid, _id: { $ne: pid } })
      .select("-image")
      .limit(3)
      .populate("category");
    res.status(201).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      suucess: false,
      message: "Error while getting related product",
      error,
    });
  }
};

//getPhotoController
export let getPhotoController = async (req, res) => {
  try {
    let product = await ProductModel.findById(req.params.pid).select("image");

    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      res.status(201).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      suucess: false,
      message: "Error while getting image of product",
      error,
    });
  }
};

//deleteProductController

export let deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-image");
    res
      .status(201)
      .send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      suucess: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//updateProductController

export let updateProductController = async (req, res) => {
  try {
    let { name, description, price, category, quantity, shipping } = req.fields;
    let { image } = req.files;
    //validation

    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required" });
      case !description:
        return res.status(500).send({ message: "Description is required" });
      case !price:
        return res.status(500).send({ message: "Price is required" });
      case !category:
        return res.status(500).send({ message: "Category is required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is required" });
      case !shipping:
        return res.status(500).send({ message: "Shipping is required" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ message: "Image is required and should be less than 1MB" });
    }
    console.log(req.fields);
    let products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();

    res.status(201).send({
      successs: true,
      message: "Product updated successfully ",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ suucess: false, message: "Error while updating product", error });
  }
};

//filterProductController

export let filterProductController = async (req, res) => {
  try {
    let { checked, radio } = req.body;

    let arg = {};
    if (checked.length > 0) {
      arg.category = checked;
    }
    if (radio.length) {
      arg.price = { $gte: radio[0], $lte: radio[1] };
    }
    let products = await ProductModel.find(arg);

    res.status(201).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Someting went wrong while filtering product",
      error,
    });
  }
};

//productCountController

export let productCountController = async (req, res) => {
  try {
    let count = await ProductModel.find({}).estimatedDocumentCount();
    res.status(201).send({ success: true, count });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Someting went wrong while counting product",
      error,
    });
  }
};

//productList Per Page

export let productListController = async (req, res) => {
  try {
    let page = req.params.page ? req.params.page : 1;
    let perPage = 3;
    let products = await ProductModel.find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(201).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Someting went wrong while fetching product-list",
      error,
    });
  }
};

//searchProductController

export let searchProductController = async (req, res) => {
  try {
    let { keyword } = req.params;

    let results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-image");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Someting went wrong while searching product",
      error,
    });
  }
};

//categoryProductController

export let categoryProductController = async (req, res) => {
  try {
    let category = await CategoryModel.findOne({ slug: req.params.slug });
    let products = await ProductModel.find({ category }).populate("category");
    res.status(201).send({ success: true, products, category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Someting went wrong while searching product by category",
      error,
    });
  }
};

//paymentApis
//token

export let braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//payment

export let braintreePaymentController = async (req, res) => {
  try {
    let { cart, nonce } = req.body;
    console.log(cart, nonce);
    let total = 0;
    cart.map((el) => {
      total += el.price;
    });

    console.log(req.user._id);
    console.log(total);
    let newTransation = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
      function(err, result) {
        if (result) {
          let order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(err);
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
};
