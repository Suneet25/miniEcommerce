import React from "react";
import Layout from "../components/Layout/Layout";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import contact from "../Assets/images/contactus.jpeg";
const Contact = () => {
  return (
    <Layout title="Contact us-Awesomerce App">
      
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
        }}
        minHeight={{ base: "65vh", md: "65vh", lg: "65vh" }}
        p={5}
        justifyContent={"center"}
      >
        <GridItem className="image">
          <Image src={contact}></Image>
        </GridItem>
        <GridItem className="deatils" pt={10}>
          <Stack spacing={6}>
            <Heading
              textAlign={"center"}
              margin="auto"
              w={{ base: "200px", md: "460px" }}
              p={3}
              bgColor={"black"}
              color={"white"}
              borderRadius={"10px"}
            >
              CONTACT US
            </Heading>
            <Text fontSize={"xl"} textAlign={"center"}>
              Any query about product,feel free to contact us!
            </Text>
            <Flex justify={"center"} align={"center"}>
              <BiMailSend /> - suneet@gmail.com
            </Flex>
            <Flex justify={"center"} align={"center"}>
              <BiPhoneCall /> - 91-8763486964
            </Flex>
          </Stack>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Contact;
