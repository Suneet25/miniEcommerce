import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [answer, setAnswer] = useState("");

  const toast = useToast();
  let navigate = useNavigate();

  let handleSubmit = async () => {
    if (!email || !newPassword || !answer) {
      toast({
        title: "Fill all inputs",
        status: "info",
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    let resetData = { email, newPassword, answer };
    console.log(resetData);
    try {
      let res = await axios.post(
        ` https://magenta-rose-donkey-robe.cyclic.app/api/v1/auth/forgot-password`,
        resetData
      );

      if (!res.data.success) {
        toast({
          title: res.data.message,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
          position: "top-right",
        });

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Forgot-Password-Awesomerce">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Reset Password</Heading>
            <Text fontSize={"lg"} color={"gray.600"}></Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={!email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="answer" isInvalid={!answer}>
                <FormLabel>Secret Answer</FormLabel>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </FormControl>
              <FormControl id="newPassword" isInvalid={!newPassword}>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Reset Password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                  onClick={handleSubmit}
                >
                  Reset
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default ForgotPassword;
