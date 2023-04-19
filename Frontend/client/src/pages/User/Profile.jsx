import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";

import { useAuth } from "../../Context/authContext";
import UserMenu from "../../components/Layout/UserMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Profile = () => {
  let [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [name, setName] = useState("");

  const toast = useToast();
  console.log(auth);
  let handleSubmit = async () => {
    let updatingdData = { name, password, phone, address };
    try {
      let { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`,
        updatingdData
      );

      if (data?.error) {
        toast({
          title: data.error,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast({
          title: "Profile updated successfully",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    let { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  return (
    <Layout title={"User-Profile-Awesomerce App"}>
      <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
        User Pannel
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        justifyContent={"space-around"}
        p={5}
        gap={10}
      >
        <GridItem>
          <UserMenu />
        </GridItem>
        <GridItem colSpan={4}>
          <Box backgroundImage={"linear-gradient( purple.200,blue.200)"}>
            <Flex minH={"65vh"} align={"center"} justify={"center"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                      User Profile
                    </Heading>
                    <FormControl id="firstName">
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl id="email">
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="phone">
                      <FormLabel>Phone no</FormLabel>
                      <Input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="adress">
                      <FormLabel>Address</FormLabel>
                      <Input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>

                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"teal.400"}
                        color={"white"}
                        _hover={{
                          bg: "teal.500",
                        }}
                        onClick={handleSubmit}
                      >
                        UPDATE
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Profile;
