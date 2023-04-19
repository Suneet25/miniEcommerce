import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../Context/searchContext";
import {
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  let [values, setValues] = useSearch();
  let navigate = useNavigate();
  console.log(values.result);
  return (
    <Layout title={"Search results"}>
      <Heading textAlign={"center"} mt={10}>
        Searched Results
      </Heading>
      <Heading size={"md"} textAlign={"center"} color={"teal"} mt={10}>
        {values?.results.length < 1
          ? "No results found"
          : `Found ${values?.results.length}`}
      </Heading>
      <Box padding={6}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={10}
          mt={10}
        >
          {values?.results.map((el) => (
            <GridItem
              boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
              p={10}
              borderRadius={"7px"}
            >
              <Image
                src={`http://localhost:8080/api/v1/product/product-image/${el._id}`}
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

export default Search;
