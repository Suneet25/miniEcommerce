import React from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../Context/authContext";

const Users = () => {
  let [auth] = useAuth();
  return (
    <Layout title={"Admin-Users-Awesomerce App"}>
      <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
        Admin Pannel
      </Heading>
      <Grid
        templateColumns="repeat(5, 1fr)"
        justifyContent={"space-around"}
        p={5}
      >
        <GridItem>
          <AdminMenu />
        </GridItem>
        <GridItem colSpan={4}>
          <Heading>Users</Heading>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Users;
