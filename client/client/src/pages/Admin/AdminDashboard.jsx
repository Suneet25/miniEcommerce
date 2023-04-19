import React from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../Context/authContext";

const AdminDashboard = () => {
  let [auth] = useAuth();
  return (
    <Layout title={"Admin-Dashboard-Awesomerce App"}>
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
        gap={2}
      >
        <GridItem>
          <AdminMenu />
        </GridItem>
        <GridItem colSpan={4}>
          <Flex
            direction={"column"}
            gap={4}
            justifyContent={"center"}
            alignItems={"center"}
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            paddingTop={"30px"}
            paddingBottom={"30px"}
          >
            <Heading size={{ base: "sm", lg: "md" }}>
              Admin Name :- {auth?.user?.name}
            </Heading>
            <Heading size={{ base: "sm", lg: "md" }}>
              Admin Email :- {auth?.user?.email}
            </Heading>
            <Heading size={{ base: "sm", lg: "md" }}>
              Admin Phone :- {auth?.user?.phone}
            </Heading>
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
