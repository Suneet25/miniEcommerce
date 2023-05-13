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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/authContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [auth, setAuth] = useAuth();

  const toast = useToast();
  let navigate = useNavigate();
  let location = useLocation();
  let handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Fill all inputs",
        status: "info",
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    let loginData = { email, password };
    try {
      let res = await axios.post(
        ` https://dull-teal-angelfish-wig.cyclic.app/api/v1/auth/login`,
        loginData
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
        setAuth({ ...auth, token: res.data.token, user: res.data.user });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      }
    } catch (error) {
      console.log(error);
      //   toast({
      //     title: error.message,
      //     status: "error",
      //     isClosable: true,
      //     position: "top-right",
      //   });
    }
  };

  return (
    <Layout>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
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
                  placeholder="email-admin@gmail.com"
                />
              </FormControl>
              <FormControl id="password" isInvalid={!password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password-admin"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"} href="/forgot-password">
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
