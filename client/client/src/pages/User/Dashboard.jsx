import React from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { useAuth } from "../../Context/authContext";
import UserMenu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  let [auth] = useAuth();
  return (
    <Layout title={"User-Dashboard-Awesomerce App"}>
      <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
        User Pannel
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
          <UserMenu />
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
              User Name :- {auth?.user?.name}
            </Heading>
            <Heading size={{ base: "sm", lg: "md" }}>
              User Email :- {auth?.user?.email}
            </Heading>
            <Heading size={{ base: "sm", lg: "md" }}>
              User Phone :- {auth?.user?.phone}
            </Heading>
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
