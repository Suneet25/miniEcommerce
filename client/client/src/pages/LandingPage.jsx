import React from "react";
import Layout from "../components/Layout/Layout";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import men from "../Images/mens-shoes-1.webp";
import women from "../Images/women-shoes-1.webp";
import kids from "../Images/kids-shoes-2.webp";
import banner from "../Images/banner.webp";
import Corousel from "../components/Corousel";
import Corousel2 from "../components/Corousel2";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <>
      <Box w={"100%"} h={"40px"} bgColor={"black"} py={2}>
        <Text
          fontWeight={"600"}
          fontSize={"sm"}
          color={"white"}
          textAlign={"center"}
        >
          FREE DELIVERY FREE RETURNS
        </Text>
      </Box>
      <Layout title={"Home Page - Awesomerce"}>
        <Box h={"auto"} bgColor={"#a39582"} p={6}>
          <Heading
            color={"white"}
            w={{ base: "90%", md: "90%", lg: "40%" }}
            mt={"5"}
          >
            First time on discount minimum 30% off
          </Heading>
          <Box mt={8}>
            <Text fontSize={"sm"} color={"white"} fontWeight={"600"}>
              Summer Celebration is on!
            </Text>
            <Grid
              mt={"5"}
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              justifyContent={"space-around"}
              w={{ base: "100%", md: "100%", lg: "70%" }}
              gap={10}
            >
              <GridItem borderRadius={"5px"} bgColor={"#f0f8ff "} h={"auto"}>
                <Flex
                  justifyContent={"space-around"}
                  alignItems={"center"}
                  p={5}
                >
                  <Image src={men} w={"25%"} />
                  <Link
                    fontSize={"sm"}
                    fontWeight={"600"}
                    mt={"2"}
                    borderBottom={"1px solid black"}
                    textDecoration={"none"}
                    href={"/category/mens"}
                  >
                    Shop Men
                  </Link>
                </Flex>
              </GridItem>
              <GridItem borderRadius={"5px"} bgColor={"#f0f8ff "}>
                <Flex
                  justifyContent={"space-around"}
                  alignItems={"center"}
                  p={5}
                >
                  <Image src={women} w={"25%"} />
                  <Link
                    fontSize={"sm"}
                    fontWeight={"600"}
                    mt={"2"}
                    borderBottom={"1px solid black"}
                    textDecoration={"none"}
                    href={"/category/womens"}
                  >
                    Shop Women
                  </Link>
                </Flex>
              </GridItem>
              <GridItem bgColor={"#f0f8ff "} borderRadius={"5px"}>
                <Flex
                  justifyContent={"space-around"}
                  alignItems={"center"}
                  p={5}
                >
                  <Image src={kids} w={"25%"} />
                  <Link
                    fontSize={"sm"}
                    fontWeight={"600"}
                    mt={"2"}
                    borderBottom={"1px solid black"}
                    textDecoration={"none"}
                    href={"/category/kids"}
                  >
                    Shop Kids
                  </Link>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        {/* Banner */}
        <Box position={"relative"}>
          <Image
            src={banner}
            w={"100%"}
            h={{ base: "200px", md: "300px", lg: "500px" }}
          />

          <Button
            position={"absolute"}
            top="40%"
            left={{ base: "60%", md: "70%", lg: "70%" }}
            color={"white"}
            bgColor={"black"}
            _hover={{ color: "white", bgColor: "black" }}
            size={{ base: "sm", md: "lg", lg: "lg" }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
        </Box>
        {/* slider */}
        <Box>
          <Corousel />
        </Box>
        <Box>
          <Heading ml={"40px"} mt={"5"} size={"lg"}>
            Now Popular in Kid's
          </Heading>
          <Grid
            mt={"5"}
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            p={10}
            justifyContent={"space-around"}
            w={{ base: "100%", md: "100%", lg: "100%" }}
            gap={10}
          >
            <GridItem h={"auto"}>
              <Text
                borderBottom={"2px solid gray"}
                fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
                fontWeight={"500"}
              >
                shoes
              </Text>
            </GridItem>
            <GridItem>
              <Text
                borderBottom={"2px solid gray"}
                fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
                fontWeight={"500"}
              >
                watches
              </Text>
            </GridItem>
            <GridItem>
              <Text
                borderBottom={"2px solid gray"}
                fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
                fontWeight={"500"}
              >
                slides
              </Text>
            </GridItem>
            <GridItem>
              <Text
                borderBottom={"2px solid gray"}
                fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
                fontWeight={"500"}
              >
                sandals
              </Text>
            </GridItem>
            <GridItem>
              <Text
                borderBottom={"2px solid gray"}
                fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
                fontWeight={"500"}
              >
                superstar
              </Text>
            </GridItem>
            <GridItem>
              <Text
                borderBottom={"2px solid gray"}
                fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
                fontWeight={"500"}
              >
                socks
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Box>
          <Heading ml={"40px"} mt={"5"} size={"lg"}>
            You can also look at
          </Heading>
          <Corousel2 />
        </Box>
        <Box backgroundColor={"#f5f5e5"} p={10}>
          <Grid
            mt={"5"}
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            p={10}
            justifyContent={"space-around"}
            w={{ base: "100%", md: "100%", lg: "100%" }}
            gap={10}
          >
            <GridItem h={"auto"}>
              <Heading>
                STORIES, STYLES AND SPORTSWEAR AT ADIDAS, SINCE 1949
              </Heading>
              <Text fontSize={"md"}>
                Sport keeps us fit. Keeps you mindful. Brings us together.
                Through sport we have the power to change lives. Whether it is
                through stories of inspiring athletes. Helping you to get up and
                get moving. Sportswear featuring the latest technologies, to up
                your performance. Beat your PB. adidas offers a home to the
                runner, the basketball player, the soccer kid, the fitness
                enthusiast. The weekend hiker that loves to escape the city. The
                yoga teacher that spreads the moves. The 3-Stripes are seen in
                the music scene. On stage, at festivals. Our sports clothing
                keeps you focused before that whistle blows. During the race.
                And at the finish lines. We’re here to support creators. Improve
                their game. Their lives. And change the world. adidas is about
                more than sportswear and workout clothes. We partner with the
                best in the industry to co-create. This way we offer our fans
                the sports apparel and style that match their athletic needs,
                while keeping sustainability in mind. We’re here to support
                creators. Improve their game. Create change. And we think about
                the impact we have on our world.
              </Text>
            </GridItem>
            <GridItem>
              <Heading>WORKOUT CLOTHES, FOR ANY SPORT</Heading>
              <Text fontSize={"md"} mt={10}>
                adidas designs for and with athletes of all kinds. Creators, who
                love to change the game. Challenge conventions. Break the rules
                and define new ones. Then break them again. We supply teams and
                individuals with athletic clothing pre-match. To stay focussed.
                We design sports apparel that get you to the finish line. To win
                the match. We support women, with bras and tights made for
                purpose. From low to high support. Maximum comfort. We design,
                innovate and itterate. Testing new technologies in action. On
                the pitch, the tracks, the court, the pool. Retro workout
                clothes inspire new streetwear essentials. Like NMD, Ozweego and
                our Firebird tracksuits. Classic sports models are brought back
                to life. Like Stan Smith. And Superstar. Now seen on the streets
                and the stages. Through our collections we blur the borders
                between high fashion and high performance. Like our adidas by
                Stella McCartney athletic clothing collection – designed to look
                the part inside and outside of the gym. Or some of our adidas
                Originals lifestyle pieces, that can be worn as sportswear too.
                Our lives are constantly changing. Becoming more and more
                versatile. And adidas designs with that in mind.
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Box h={"120px"} backgroundColor={"#ede734"} margin={"auto"}>
          <Flex
            gap={{ base: "4", md: "6", lg: "10" }}
            justifyContent={"center"}
            alignItems={"center"}
            pt={10}
            direction={{ base: "column", md: "row", lg: "row" }}
          >
            <Heading size={{ base: "sm", md: "md", lg: "lg" }}>
              JOIN AWESOMERCE AND GET 15% OFF
            </Heading>
            <Button
              size={{ base: "sm", md: "md", lg: "md" }}
              bgColor={"black"}
              color={"white"}
              _hover={{ bgColor: "black", color: "white" }}
              rightIcon={<ArrowRightIcon />}
              onClick={() => navigate("/register")}
            >
              SIGNUP FOR FREE
            </Button>
          </Flex>
        </Box>
        <Box backgroundColor={"white"} p={10}>
          <Grid
            mt={"5"}
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            p={10}
            justifyContent={"space-around"}
            w={{ base: "100%", md: "100%", lg: "100%" }}
            gap={10}
          >
            <GridItem h={"auto"}>
              <Heading size={"sm"}>PRODUCTS</Heading>
              <UnorderedList mt={5}>
                <ListItem>Footware</ListItem>
                <ListItem>Clothing</ListItem>
                <ListItem>Accesories</ListItem>
                <ListItem>New Arrivals</ListItem>
              </UnorderedList>
            </GridItem>
            <GridItem>
              <Heading size={"sm"}>SPORTS</Heading>
              <UnorderedList mt={5}>
                <ListItem>Footware</ListItem>
                <ListItem>Clothing</ListItem>
                <ListItem>Accesories</ListItem>
                <ListItem>New Arrivals</ListItem>
              </UnorderedList>
            </GridItem>
            <GridItem>
              <Heading size={"sm"}>COLLECTIONS</Heading>
              <UnorderedList mt={5}>
                <ListItem>Footware</ListItem>
                <ListItem>Clothing</ListItem>
                <ListItem>Accesories</ListItem>
                <ListItem>New Arrivals</ListItem>
              </UnorderedList>
            </GridItem>
            <GridItem>
              <Heading size={"sm"}>SUPPORT</Heading>
              <UnorderedList mt={5}>
                <ListItem>Footware</ListItem>
                <ListItem>Clothing</ListItem>
                <ListItem>Accesories</ListItem>
                <ListItem>New Arrivals</ListItem>
              </UnorderedList>
            </GridItem>
            <GridItem>
              <Heading size={"sm"}>COMPANY INFO</Heading>
              <UnorderedList mt={5}>
                <ListItem onClick={() => navigate("/about")}>About</ListItem>
                <ListItem onClick={() => navigate("/contact")}>
                  Contact Us
                </ListItem>
                <ListItem onClick={() => navigate("/policy")}>Policy</ListItem>
              </UnorderedList>
            </GridItem>
            <GridItem>
              <Heading size={"sm"}>FOLLOW US</Heading>
              <Box mt={5}>
                <Flex gap={4}>
                  <Box>
                    <FaInstagram size={"20px"} />
                  </Box>
                  <Box>
                    <FaLinkedin size={"20px"} />
                  </Box>
                  <Box>
                    <FaTwitter size={"20px"} />
                  </Box>
                  <Box>
                    <FaFacebook size={"20px"} />
                  </Box>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default LandingPage;
