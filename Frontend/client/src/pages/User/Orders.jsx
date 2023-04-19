import React from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { useAuth } from "../../Context/authContext";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  let [auth] = useAuth();
  return (
    <Layout title={"User-Orders-Awesomerce App"}>
      <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
        User Pannel
      </Heading>
      <Grid
        templateColumns="repeat(5, 1fr)"
        justifyContent={"space-around"}
        p={5}
      >
        <GridItem>
          <UserMenu />
        </GridItem>
        <GridItem colSpan={4}>
          <Heading>All Orders</Heading>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Orders;
