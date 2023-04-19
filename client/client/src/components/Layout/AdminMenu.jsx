import React from "react";
import Layout from "./Layout";
import { Box, StackDivider, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const AdminMenu = () => {
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
            backgroundColor: "blue.400",
            color: "white",

            borderRadius: "5px",
          }}
          textAlign={"center"}
          onClick={() => navigate("/dashboard/admin/create-category")}
        >
          Create Category
        </Box>
        <Box
          h="30px"
          w="150px"
          bgColor={"gray.200"}
          borderRadius="5px"
          _hover={{
            backgroundColor: "blue.400",
            color: "white",

            borderRadius: "5px",
          }}
          textAlign={"center"}
          onClick={() => navigate("/dashboard/admin/create-products")}
        >
          Create Products
        </Box>
        <Box
          h="30px"
          w="150px"
          bgColor={"gray.200"}
          borderRadius="5px"
          _hover={{
            backgroundColor: "blue.400",
            color: "white",

            borderRadius: "5px",
          }}
          textAlign={"center"}
          onClick={() => navigate("/dashboard/admin/products")}
        >
          Products
        </Box>
        <Box
          h="30px"
          w="150px"
          bgColor={"gray.200"}
          borderRadius="5px"
          _hover={{
            backgroundColor: "blue.400",
            color: "white",

            borderRadius: "5px",
          }}
          textAlign={"center"}
          onClick={() => navigate("/dashboard/admin/users")}
        >
          Users
        </Box>
      </VStack>
    </Box>
  );
};

export default AdminMenu;
