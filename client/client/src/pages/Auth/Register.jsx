import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [name, setName] = useState("");
  let [answer, setAnswer] = useState("");
  const toast = useToast();
  let navigate = useNavigate();
  let handleSubmit = async () => {
    if (!email || !password || !phone || !address || !name || !answer) {
      toast({
        title: "Fill all inputs",
        status: "info",
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    let registeredData = { name, email, password, phone, address, answer };
    try {
      let res = await axios.post(
        ` https://magenta-rose-donkey-robe.cyclic.app/api/v1/auth/register`,
        registeredData
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
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
    console.log(name, email, password, phone, address, answer);
  };

  return (
    <Layout>
      <Flex
        minH={"65vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="firstName" isInvalid={!name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl id="email" isInvalid={!email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isInvalid={!password}>
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
              <FormControl id="phone" isInvalid={!phone}>
                <FormLabel>Phone no</FormLabel>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl id="adress" isInvalid={!address}>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl id="answer" isInvalid={!answer}>
                <FormLabel>Question</FormLabel>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="What is your favorite color ?"
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
                  Register
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
