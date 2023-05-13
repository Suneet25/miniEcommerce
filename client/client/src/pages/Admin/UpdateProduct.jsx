import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import AdminMenu from "../../components/Layout/AdminMenu";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [categories, setCategories] = useState([]);
  let [category, setCategory] = useState([]);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [quantity, setQuantity] = useState("");
  let [shipping, setShipping] = useState("");
  let [image, setImage] = useState("");
  let [id, setId] = useState("");
  let toast = useToast();

  //getSingleProduct

  let getSingleProduct = async () => {
    try {
      let { data } = await axios.get(
        ` https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/get-product/${params.slug}`
      );

      console.log(data);
      setId(data.product._id);
      setName(data.product.name);
      setCategory(data.product.category._id);
      setDescription(data.product.description);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setPrice(data.product.price);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //getAllCategory
  let getAllCat = async () => {
    try {
      let { data } = await axios.get(
        " https://dull-teal-angelfish-wig.cyclic.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while getting all Category",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  //Delete Product

  let handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete this product ?");
      if (!answer) return;
      let { data } = await axios.delete(
        ` https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/remove-product/${id}`
      );
      toast({
        title: "Product is deleted successfully",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while deleting products",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  //Update Product

  let handleUpdate = async () => {
    try {
      let productData = new FormData(); //browser Provides form Data
      productData.append("name", name);
      productData.append("price", price);
      productData.append("description", description);
      image && productData.append("image", image);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);

      let { data } = await axios.put(
        ` https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast({
          title: data?.message,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Product updated successfully",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while updating products",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getAllCat();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout title={"Admin-Products-Awesomerce App"}>
      <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
        Admin Pannel
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        justifyContent={"space-around"}
        p={5}
      >
        <GridItem>
          <AdminMenu />
        </GridItem>
        <GridItem colSpan={4}>
          <Heading textAlign={"center"} color={"gray"}>
            Manage Products
          </Heading>
          <VStack>
            <Select
              placeholder="Select category"
              mt={10}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {categories?.map((el) => (
                <option key={el._id} value={el._id}>
                  {el.name}
                </option>
              ))}
            </Select>
            <Box>
              <Button
                variant={"outline"}
                colorScheme="blue"
                width={{ base: "280px", md: "500px", lg: "1060px" }}
              >
                <label>
                  <Input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                  {image ? image.name : "Upload Image"}
                </label>
              </Button>
            </Box>
            <Box>
              {image ? (
                <Image
                  src={URL.createObjectURL(image)} //browser Properties to get image
                  alt="product-image"
                  height="200px"
                  width={"200px"}
                  margin={"auto"}
                />
              ) : (
                <Image
                  src={` https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/product-image/${id}`}
                  alt="product-image"
                  height="200px"
                  width={"200px"}
                  margin={"auto"}
                />
              )}
            </Box>
            <Box width={{ base: "280px", md: "500px", lg: "1060px" }}>
              <Input
                type="text"
                placeholder="Enter Name of the product"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box width={{ base: "280px", md: "500px", lg: "1060px" }}>
              <Input
                type="number"
                placeholder="Enter Price of the product"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>
            <Box width={{ base: "280px", md: "500px", lg: "1060px" }}>
              <Input
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Box>
            <Box width={{ base: "280px", md: "500px", lg: "1060px" }}>
              <Textarea
                placeholder="Write Description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box width={{ base: "280px", md: "500px", lg: "1060px" }}>
              <Select
                onChange={(e) => setShipping(e.target.value)}
                value={shipping}
              >
                <option>Select Shipping</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </Box>
            <Box>
              <Flex gap={5}>
                <Button
                  backgroundColor={"blue.400"}
                  color={"white"}
                  _hover={{ backgroundColor: "blue.500", color: "white" }}
                  onClick={handleUpdate}
                >
                  Update Product
                </Button>
                <Button
                  backgroundColor={"red.400"}
                  color={"white"}
                  _hover={{ backgroundColor: "red.500", color: "white" }}
                  onClick={handleDelete}
                >
                  Delete Product
                </Button>
              </Flex>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default UpdateProduct;
