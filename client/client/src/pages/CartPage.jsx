import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../Context/caartContext";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  let [cart, setCart] = useCart();
  let [auth, setAuth] = useAuth();
  let [loading, setLoading] = useState(false);
  let [clientToken, setClientToken] = useState("");
  let [instance, setinstance] = useState("");

  let toast = useToast();
  let navigate = useNavigate();
  //totlCartPrice

  let totalCartPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //removeItem
  let removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast({
        title: "Item has been removed from the cart",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get Payment-gateway Token

  let getToken = async () => {
    try {
      let { data } = await axios.get(
        "https://magenta-rose-donkey-robe.cyclic.app/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  //payment
  let handlePayment = async () => {
    // localStorage.removeItem("cart");
    // setCart([]);
    // navigate("/success");
    try {
      setLoading(true);
      let { nonce } = await instance.requestPaymentMethod();
      let { data } = await axios.post(
        "https://magenta-rose-donkey-robe.cyclic.app/api/v1/product/braintree/payment",
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/success");
      toast({
        title: "Payment completed successfully",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);
  return (
    <Layout title={"Cart-page-Awesomerce App"}>
      <Heading textAlign={"center"} size={"lg"} mt={10}>{`Hello ${
        auth?.token && auth?.user?.name
      }`}</Heading>

      <Box>
        <Heading size={"md"} textAlign={"center"} mt={5} color={"teal"}>
          {cart?.length > 0
            ? `You have ${cart?.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your cart is empty"}
        </Heading>
      </Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={10}
        mt={10}
        padding={10}
      >
        <GridItem colSpan={2}>
          <Flex direction={"column"} gap={10}>
            {cart?.map((el) => (
              <Box
                boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
                p={{ base: "10", md: "10", lg: "10" }}
              >
                <Flex gap={{ base: "10px", md: "80px", lg: "80px" }}>
                  <Box>
                    <Image
                      src={`https://magenta-rose-donkey-robe.cyclic.app/api/v1/product/product-image/${el._id}`}
                      w={{ base: "100px", md: "150px", lg: "150px" }}
                      h={{ base: "100px", md: "150px", lg: "150px" }}
                    ></Image>
                  </Box>
                  <Box>
                    <Flex direction={"column"} gap={4}>
                      <Text>{el.name}</Text>
                      <Text>{el.description}</Text>
                      <Text>${el.price}</Text>

                      <Box>
                        <Button
                          size={"sm"}
                          backgroundColor={"red.400"}
                          color={"white"}
                          _hover={{
                            backgroundColor: "red.500",
                            color: "white",
                          }}
                          onClick={() => removeCartItem(el._id)}
                        >
                          Remove item
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Flex>
        </GridItem>
        <GridItem colSpan={2}>
          <Heading size={"md"} color={"teal"} textAlign={"center"}>
            Cart Summary
          </Heading>
          <Text textAlign={"center"} mt={5}>
            Total | Checkout | Payment
          </Text>
          <br />
          <hr />
          <br />
          <Heading size={"md"} textAlign={"center"}>
            Total : {totalCartPrice()}
          </Heading>

          <Box textAlign={"center"} mt={6}>
            {auth?.user?.address ? (
              <>
                <Text>Shipping address : {auth?.user?.address}</Text>
                <Button
                  mt={6}
                  size={"sm"}
                  variant={"outline"}
                  colorScheme="yellow"
                  _hover={{ backgroundColor: "yellow.500", color: "white" }}
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Change address
                </Button>
              </>
            ) : (
              <>
                {auth?.token ? (
                  <Button
                    mt={6}
                    size={"sm"}
                    variant={"outline"}
                    colorScheme="yellow"
                    _hover={{ backgroundColor: "yellow.500", color: "white" }}
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Change address
                  </Button>
                ) : (
                  <Button
                    mt={6}
                    size={"sm"}
                    variant={"outline"}
                    colorScheme="yellow"
                    _hover={{ backgroundColor: "yellow.500", color: "white" }}
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please login to checkout
                  </Button>
                )}
              </>
            )}
            <br />
            <br />
            <hr />
            <br />
            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setinstance(instance)}
                />
                <Button
                  mt={3}
                  size={"sm"}
                  backgroundColor="purple.400"
                  color="white"
                  _hover={{ backgroundColor: "purple.500", color: "white" }}
                  onClick={handlePayment}
                  isisabled={!auth?.user?.name}
                >
                  {loading ? "Processing..." : "Make payment"}
                </Button>
              </>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CartPage;
