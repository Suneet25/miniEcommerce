import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../components/Hooks/CategoryHooks";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
  let category = useCategory();
  let navigate = useNavigate();
  return (
    <Layout title={"All Categories - Awesomerce"}>
      <Grid
        padding={50}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={10}
        mt={10}
        justifyContent={"center"}
      >
        {category.map((el) => (
          <Button
            key={el._id}
            variant={"outline"}
            colorScheme="black"
            p={{
              base: "0",
              md: "10",
              lg: "10",
            }}
            size={{
              base: "md",
              md: "lg",
              lg: "lg",
            }}
            // backgroundColor={"purple.400"}
            // color={"white"}
            _hover={{ backgroundColor: "purple.500", color: "white" }}
            onClick={() => navigate(`/category/${el.slug}`)}
          >
            {el.name}
          </Button>
        ))}
      </Grid>
    </Layout>
  );
};

export default AllCategories;
