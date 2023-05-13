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
import { useNavigate } from "react-router-dom";

const CreateProducts = () => {
  let navigate = useNavigate();
  let [categories, setCategories] = useState([]);
  let [category, setCategory] = useState([]);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [quantity, setQuantity] = useState("");
  let [shipping, setShipping] = useState("");
  let [image, setImage] = useState("");
  let toast = useToast();
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
  //Add Product

  let handleAdd = async () => {
    try {
      let productData = new FormData(); //browser Provides form Data
      productData.append("name", name);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("image", image);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);

      let { data } = await axios.post(
        " https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/create-product",
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
          title: "Product created successfully",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while creating products",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getAllCat();
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
          <Heading textAlign={"center"} color={"gray"}>Manage Products</Heading>
          <VStack>
            <Select
              placeholder="Select category"
              mt={10}
              onChange={(e) => setCategory(e.target.value)}
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
              {image && (
                <Image
                  src={URL.createObjectURL(image)} //browser Properties to get image
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
              <Select onChange={(e) => setShipping(e.target.value)}>
                <option>Select Shipping</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </Box>
            <Box>
              <Button
                backgroundColor={"blue.400"}
                color={"white"}
                _hover={{ backgroundColor: "blue.500", color: "white" }}
                onClick={handleAdd}
              >
                Add Product
              </Button>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CreateProducts;
