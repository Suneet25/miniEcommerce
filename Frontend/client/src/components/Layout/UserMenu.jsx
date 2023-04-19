import React from "react";
import Layout from "./Layout";
import { Box, StackDivider, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const UserMenu = () => {
  let navigate = useNavigate();
  return (
    <Box>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        w={"160px"}
      >
        <Box
          h="30px"
          w="150px"
          bgColor={"gray.200"}
          borderRadius="5px"
          _hover={{
            backgroundColor: "teal.400",
            color: "white",

            borderRadius: "5px",
          }}
          textAlign={"center"}
          onClick={() => navigate("/dashboard/user/profile")}
        >
          Your Profile
        </Box>
        <Box
          h="30px"
          w="150px"
          bgColor={"gray.200"}
          borderRadius="5px"
          _hover={{
            backgroundColor: "teal.400",
            color: "white",

            borderRadius: "5px",
          }}
          textAlign={"center"}
          onClick={() => navigate("/dashboard/user/orders")}
        >
          Orders
        </Box>
      </VStack>
    </Box>
  );
};

export default UserMenu;
