import React from "react";
import Carousel from "react-multi-carousel";
import styles from "../styles/LandingPage.module.css";
import "react-multi-carousel/lib/styles.css";
import { Box, Heading, Image } from "@chakra-ui/react";
import { SliderData } from "./sliding";

const Corousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
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
      <Heading ml={"40px"}>Still Intrested?</Heading>
      <Box style={{ display: "grid" }} mt={7}>
        <Carousel responsive={responsive} transitionDuration={1000}>
          {SliderData.map((el) => {
            return (
              <Box className={styles.ExploreBox} key={el.id}>
                <Box style={{ position: "relative" }}>
                  <Image
                    className={styles.ExploreBoxImg}
                    src={el.image}
                    alt="rty"
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

export default Corousel;
