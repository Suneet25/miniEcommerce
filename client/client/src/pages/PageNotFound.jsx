import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout/Layout";

const PageNotFound = () => {
  return (
    <Layout title="Go back - page not found-Awesomerce App">
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={8}
        minHeight={"65vh"}
      >
        <Heading as="h1" size="4xl">
          404
        </Heading>
        <Text fontSize="3xl">Oops ! Page Not Found</Text>
        <Button
          _hover={{ backgroundColor: "teal.400", color: "white" }}
          colorScheme="teal"
          variant={"outline"}
        >
          Go Back
        </Button>
      </Flex>
    </Layout>
  );
};

export default PageNotFound;
