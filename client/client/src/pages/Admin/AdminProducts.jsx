import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  let [items, setItems] = useState([]);
  let toast = useToast();

  //getAllProducts

  let getAllProducts = async () => {
    try {
      let { data } = await axios.get(
        " https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/get-product"
      );
      setItems(data.products);
    } catch (error) {
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
    getAllProducts();
  }, []);

  return (
    <Layout title={"Admin-Category-Awesomerce App"}>
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
            All Products
          </Heading>
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
              <Link key={el._id} to={`/dashboard/admin/product/${el.slug}`}>
                <GridItem
                  boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
                  p={10}
                  borderRadius={"7px"}
                >
                  <Image
                    src={` https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/product-image/${el._id}`}
                  />
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
                  <Text mt={3} fontWeight={500}>
                    Category:-{el?.category?.name}
                  </Text>
                  <Text fontWeight={400} mt={3}>
                    {el.description}
                  </Text>
                </GridItem>
              </Link>
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default AdminProducts;
