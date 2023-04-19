import {
  Heading,
  Grid,
  GridItem,
  Image,
  Stack,
  Flex,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  let params = useParams();
  let [product, setProduct] = useState({});
  let [relatedProducts, setRelatedProducts] = useState([]);
  let navigate = useNavigate();
  //getSingleProduct
  let getSingleProduct = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //getRelatedProduct
  let getRelatedProducts = async (pid, cid) => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);

  return (
    <Layout title={"Product Details - Awesomerce App"}>
      <Heading textAlign={"center"} mt={10}>
        Product Details
      </Heading>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        padding={"10"}
        mt={10}
        gap={"100px"}
        justifyContent={"center"}
      >
        <GridItem
          colSpan={3}
          boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
          p={10}
          borderRadius={"7px"}
        >
          <Image
            src={`http://localhost:8080/api/v1/product/product-image/${product._id}`}
            width={"500px"}
            height={"400px"}
          />
        </GridItem>
        <GridItem
          colSpan={{
            base: "3",
            md: "2",
            lg: "2",
          }}
          boxShadow=" rgba(0, 0, 0, 0.35) 0px 5px 15px"
          p={10}
          borderRadius={"7px"}
        >
          <Flex direction={"column"} gap={5}>
            <Text
              fontSize={{
                base: "xl",
                md: "2xl",
                lg: "3xl",
              }}
            >
              {product.name}
            </Text>
            <Text
              fontSize={{
                base: "md",
                md: "lg",
                lg: "xl",
              }}
            >
              Category:-{product?.category?.name}
            </Text>
            <Text
              fontSize={{
                base: "sm",
                md: "lg",
                lg: "xl",
              }}
            >
              Description:-{product.description}
            </Text>
            <Text fontSize={"lg"}>$ {product.price}</Text>
            <Text fontSize={"lg"}>Quantity:- {product.quantity}</Text>
            <Text as={"u"} color={"tomato"}>
              Shipping calculated at checkout.
            </Text>
            <Box>
              <Button
                size={"sm"}
                backgroundColor={"gray.600"}
                color={"white"}
                _hover={{ backgroundColor: "gray.700", color: "white" }}
              >
                Add to cart
              </Button>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
      <hr />
      <Heading size={"md"} p={10}>
        Similar Products
      </Heading>
      {relatedProducts.length < 1 && (
        <Text textAlign={"center"}>No similar products found</Text>
      )}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={10}
        mt={10}
        paddingLeft={10}
        paddingBottom={10}
      >
        {relatedProducts?.map((el) => (
          <GridItem
            boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
            p={10}
            borderRadius={"7px"}
          >
            <Image
              src={`http://localhost:8080/api/v1/product/product-image/${el._id}`}
              w={"100px"}
              h={"100px"}
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
    </Layout>
  );
};

export default ProductDetails;
