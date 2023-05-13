import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  Image,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../Context/authContext";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
let { Option } = Select;
const AdminOrders = () => {
  let [auth] = useAuth();
  let [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  let [changeStatus, setChangeStatus] = useState("");

  let [orders, setOrders] = useState([]);

  //getOrders

  let getOrders = async () => {
    try {
      let { data } = await axios.get(
        "https://dull-teal-angelfish-wig.cyclic.app/api/v1/auth/all-orders"
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  //changeStatus

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //changeStatus
  let handleChange = async (id, value) => {
    try {
      let { data } = await axios.put(
        `https://dull-teal-angelfish-wig.cyclic.app/api/v1/auth/orders-status/${id}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Admin-Users-Awesomerce App"}>
      <Heading size={"md"} color={"teal"} marginLeft={"30px"} mt={4}>
        Admin Pannel
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        justifyContent={"space-around"}
        p={5}
      >
        <GridItem>
          <AdminMenu />
        </GridItem>
        <GridItem colSpan={4}>
          <Heading textAlign={"center"} color={"gray"}>
            All Orders
          </Heading>
          <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" mt={10}>
            {orders?.map((el, i) => (
              <>
                <TableContainer mt={10}>
                  <Box overflowX={"auto"} maxHeight={"300px"}>
                    <Table variant="striped" colorScheme="gray">
                      <Thead backgroundColor={"facebook.400"}>
                        <Tr>
                          <Th color={"white"}>#</Th>
                          <Th color={"white"}>Status</Th>
                          <Th color={"white"}>Buyer</Th>
                          <Th color={"white"}>Orders</Th>
                          <Th color={"white"}>Payment</Th>
                          <Th color={"white"}>Quantity</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>{i + 1}</Td>
                          <Td>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(el._id, value)}
                              defaultValue={el?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </Td>
                          <Td>{el?.buyer?.name}</Td>
                          <Td>{moment(el.createAt).fromNow()}</Td>
                          <Td>{!el?.payment.success ? "Success" : "Failed"}</Td>
                          <Td>{el?.products?.length}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                </TableContainer>
                {el?.products.map((el) => (
                  <Box
                    boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px "
                    p={{ base: "10", md: "10", lg: "10" }}
                  >
                    <Flex gap={{ base: "10px", md: "80px", lg: "80px" }}>
                      <Box>
                        <Image
                          src={`https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/product-image/${el._id}`}
                          w={{ base: "100px", md: "150px", lg: "150px" }}
                          h={{ base: "100px", md: "150px", lg: "150px" }}
                        ></Image>
                      </Box>
                      <Box>
                        <Flex direction={"column"} gap={4}>
                          <Text>Tiele:-{el.name}</Text>
                          <Text>Desc:-{el.description}</Text>
                          <Text>Price:-${el.price}</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </>
            ))}
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default AdminOrders;
