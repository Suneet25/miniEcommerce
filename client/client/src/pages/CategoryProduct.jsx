import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const CategoryProduct = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [products, setProducts] = useState([]);
  let [category, setCategory] = useState([]);

  let getCategoryProduct = async () => {
    try {
      let { data } = await axios(
        `https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/category-product/${params.slug}`
      );
      setCategory(data?.category);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, [params?.slug]);
  return (
    <Layout title={"Category-Product-Awesomerce App"}>
      <Heading textAlign={"center"} mt={10}>
        Category:{category?.name}
      </Heading>
      <Heading textAlign={"center"} mt={10} size={"md"} color={"teal"}>
        {products?.length} result found
      </Heading>
      <Box padding={"10"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={10}
          mt={10}
        >
          {products?.map((el) => (
            <GridItem
              boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
              p={10}
              borderRadius={"7px"}
            >
              <Image
                src={`https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/product-image/${el._id}`}
              />
              <Heading fontSize={"sm"} mt={3}>
                {el.name}
              </Heading>
              <Text mt={3}>$ {el.price}</Text>
              <Text mt={3}>Category:-{el.category.name}</Text>
              <Text mt={3}>{el.description.substring(0, 30)}</Text>
              <Flex gap={3} mt={5}>
                <Button
                  size={"sm"}
                  backgroundColor={"blue.400"}
                  color={"white"}
                  _hover={{ backgroundColor: "blue.500", color: "white" }}
                  onClick={() => navigate(`/product/${el.slug}`)}
                >
                  More Details
                </Button>
                <Button
                  size={"sm"}
                  backgroundColor={"gray.600"}
                  color={"white"}
                  _hover={{ backgroundColor: "gray.700", color: "white" }}
                >
                  Add to Cart
                </Button>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default CategoryProduct;
