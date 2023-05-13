import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { prices } from "../components/prices";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/caartContext";
import Banner from "..//Assets/images/banner.png";
const ProductsPage = () => {
  let toast = useToast();
  let navigate = useNavigate();
  let [cart, setCart] = useCart();
  let [items, setItems] = useState([]);
  let [cats, setCats] = useState([]);
  let [checked, setChecked] = useState([]);
  let [radio, setRadio] = useState([]);
  let [count, setCount] = useState(0);
  let [page, setPage] = useState(1);
  let [loading, setLoading] = useState(false);

  //getTotal Count

  let getTotal = async () => {
    try {
      let { data } = await axios.get(
        "/api/v1/product/product-count"
      );
      if (data?.count) {
        setCount(data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //loadMore

  let loadMore = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/get-product-list/${page}`
      );
      setLoading(false);
      setItems([...items, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //getAllCat

  let getAllCat = async () => {
    try {
      let { data } = await axios.get(
        "https://dull-teal-angelfish-wig.cyclic.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCats(data.categories);
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
  useEffect(() => {
    getAllCat();
    getTotal();
  }, []);

  //getAllProducts
  let getAllProducts = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/get-product-list/${page}`
      );
      setLoading(false);
      setItems(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Something went wrong while getting products",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  //filterProducts

  let filterProducts = async () => {
    try {
      let { data } = await axios.post(
        "https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/filter-product",
        { checked, radio }
      );
      setItems(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  //filterByCategory
  let handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((el) => el !== id);
    }
    setChecked(all);
  };

  return (
    <Layout title="Shop Now-Awesomerce App">
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
          {/* //filteByCategory */}
          <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
            Filter by category
          </Heading>
          <br />
          <hr />
          <br />
          <Box mt={7}>
            {cats?.map((el) => (
              <Flex direction={"column"}>
                <Checkbox
                  key={el._id}
                  onChange={(e) => handleFilter(e.target.checked, el._id)}
                >
                  {el.name}
                </Checkbox>
              </Flex>
            ))}
          </Box>
          {/* //filteByPrice */}
          <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
            Filter by Price
          </Heading>
          <br />
          <hr />
          <br />
          <Box mt={7}>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices.map((price) => (
                <Box key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </Box>
              ))}
            </Radio.Group>
          </Box>
          <Box mt={3} marginLeft={"20px"}>
            <Button
              size={"sm"}
              backgroundColor={"red.500"}
              color={"white"}
              _hover={{ backgroundColor: "red.600", color: "white" }}
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={4}>
          <Image src={Banner} w={"100%"} mt={10} mb={10} />
          <Heading textAlign={"center"}>All Products</Heading>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={10}
            mt={10}
          >
            {items?.map((el) => (
              <GridItem
                boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
                p={10}
                borderRadius={"7px"}
              >
                <Box
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                  transition="box-shadow 0.2s"
                  _hover={{ boxShadow: "lg" }}
                >
                  <Image
                    src={`https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/product-image/${el._id}`}
                  />
                </Box>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Heading fontSize={"sm"} mt={3}>
                    {el.name}
                  </Heading>
                  <Heading
                    fontSize={"md"}
                    mt={3}
                    color={"green"}
                    fontWeight={"700"}
                  >
                    $ {el.price}
                  </Heading>
                </Flex>

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
                    onClick={() => {
                      setCart([...cart, el]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, el])
                      );
                      toast({
                        title: "Item is added to cart",
                        status: "success",
                        isClosable: true,
                        position: "top-right",
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </Flex>
              </GridItem>
            ))}
          </Grid>
          <Box textAlign={"center"} mt={10}>
            {items && items.length < count && (
              <Button
                size={"sm"}
                backgroundColor={"purple.400"}
                color={"white"}
                _hover={{ backgroundColor: "purple.500", color: "white" }}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "...Loading" : "Load more"}
              </Button>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ProductsPage;
