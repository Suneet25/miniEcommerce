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
import about from "../Assets/images/about.jpeg";
const About = () => {
  return (
    <Layout title="About us-Awesomerce App">
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
          <Image margin="auto" w={"500px"} src={about}></Image>
        </GridItem>
        <GridItem className="deatils" p={10}>
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
              ABOUT US
            </Heading>
            <Text textAlign={"left"} fontSize={"lg"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              repudiandae id ut ducimus delectus iusto, non earum, laborum,
              blanditiis placeat eius. Fugit, accusamus ad cum earum animi
              doloremque possimus consequatur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Temporibus voluptatum dolorum
              quibusdam fuga eius optio, quod beatae labore quis, quae, magnam
              et?
            </Text>
          </Stack>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default About;
