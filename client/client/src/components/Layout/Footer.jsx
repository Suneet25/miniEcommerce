import { Box, Flex, Heading, Stack, Link } from "@chakra-ui/react";
import React from "react";
import { BiHeart } from "react-icons/bi";

const Footer = () => {
  return (
    <Box backgroundColor="gray" p={10} color={"black"}>
      <Heading size={"lg"} textAlign={"center"}>
        Made with love by Suneet
      </Heading>
      <Stack
        direction={"row"}
        mt={4}
        spacing={4}
        flex={{ base: 1, md: 0 }}
        justify={"center"}
      >
        <Link
          href="/about"
          color="white"
          _hover={{
            borderBottom: "2px solid white",
          }}
        >
          About{" "}
        </Link>
        <Link
          href="/contact"
          color="white"
          _hover={{
            borderBottom: "2px solid white",
          }}
        >
          Contact{" "}
        </Link>
        <Link
          href="/policy"
          color="white"
          _hover={{
            borderBottom: "2px solid white",
          }}
        >
          Policy
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
