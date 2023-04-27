import React from "react";
import Carousel from "react-multi-carousel";
import styles from "../styles/LandingPage.module.css";
import "react-multi-carousel/lib/styles.css";
import { Box, Heading, Image } from "@chakra-ui/react";
import { AnotherSliderData } from "./sliding";

const Corousel2 = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <Box style={{ display: "grid" }} mt={7}>
        <Carousel responsive={responsive} transitionDuration={1000}>
          {AnotherSliderData.map((el) => {
            return (
              <Box key={el.id}>
                <Box
                  w="100%"
                  mx="auto"
                  position="relative"
                  className={styles.ExploreBox}
                >
                  <Image
                    src={el.image}
                    maxW="90%"
                    maxH="90%"
                    objectFit="contain"
                    transform="scale(0.8)" // adjust the scale value to zoom out the image
                    transition="transform 0.3s ease-in-out"
                    _hover={{
                      transform: "scale(1.0)", // reset the scale value on hover
                    }}
                  />
                </Box>
                <Box style={{ position: "absolute", top: "80%", left: "25%" }}>
                  <Heading
                    as={"h2"}
                    size={{ base: "md", md: "md", lg: "sm" }}
                    color="#a8a8a8"
                    fontWeight="600"
                    fontSize="calc(min(2vw, 48px))"
                  >
                    {el.price}
                  </Heading>
                  <Heading
                    as={"h2"}
                    size={{ base: "md", md: "md", lg: "sm" }}
                    color="#666"
                    fontWeight="600"
                    fontSize="calc(min(2vw, 48px))"
                  >
                    {el.title}
                  </Heading>
                </Box>
              </Box>
            );
          })}
        </Carousel>
      </Box>
    </>
  );
};

export default Corousel2;
