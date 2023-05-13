import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/CategoryForm";

const CreateCategory = () => {
  let toast = useToast();
  let [categories, setCategories] = useState([]);
  let [name, setName] = useState("");
  let [updateCat, setUpdateCat] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  //handleForm

  let handleSubmit = async () => {
    try {
      let { data } = await axios.post(
        " https://dull-teal-angelfish-wig.cyclic.app/api/v1/category/create-category",
        { name }
      );
      if (data.success) {
        toast({
          title: `${name} is created`,
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        getAllCat();
      } else {
        toast({
          title: data.message,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong in input form",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  //getAll Category
  let getAllCat = async () => {
    try {
      let { data } = await axios.get(
        " https://dull-teal-angelfish-wig.cyclic.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while getting all Category",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  //delete Category
  let handleDelete = async (id, name) => {
    try {
      let { data } = await axios.delete(
        ` https://dull-teal-angelfish-wig.cyclic.app/api/v1/category/remove-category/${id}`
      );
      if (data?.success) {
        toast({
          title: `${name} is removed`,
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        getAllCat();
      } else {
        toast({
          title: data.message,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while deleting the Category",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  //update Category

  let opening = (id) => {
    onOpen();
    localStorage.setItem("updateCatId", JSON.stringify(id));
  };

  let handleUpdate = async (name) => {
    try {
      let id = JSON.parse(localStorage.getItem("updateCatId"));
      let { data } = await axios.put(
        ` https://dull-teal-angelfish-wig.cyclic.app/api/v1/category/update-category/${id}`,
        { name: updateCat }
      );
      if (data?.success) {
        toast({
          title: ` ${updateCat} is updated`,
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        getAllCat();
        onClose();
        localStorage.removeItem("updateCatId");
      } else {
        toast({
          title: data.message,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while updating Category",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  return (
    <Layout title={"Admin-Category-Awesomerce App"}>
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
            Manage Category
          </Heading>
          {/* Categoryform */}
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          {/* Table */}
          <TableContainer mt={10}>
            <Box overflowX={"auto"} maxHeight={"300px"}>
              <Table variant="striped" colorScheme="gray">
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead backgroundColor={"grey"}>
                  <Tr>
                    <Th color={"white"}>Name</Th>
                    <Th color={"white"}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categories?.map((el) => (
                    <>
                      <Tr>
                        <Td key={el._id}>{el.name}</Td>
                        <Td>
                          <Flex gap={4}>
                            <Button
                              onClick={() => opening(el._id)}
                              backgroundColor={"blue.300"}
                              _hover={{ backgroundColor: "blue.400" }}
                            >
                              Edit
                            </Button>

                            <Modal
                              initialFocusRef={initialRef}
                              finalFocusRef={finalRef}
                              isOpen={isOpen}
                              onClose={onClose}
                            >
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>Update Category</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                  <FormControl>
                                    <Input
                                      ref={initialRef}
                                      placeholder="Enter category name"
                                      value={updateCat}
                                      onChange={(e) =>
                                        setUpdateCat(e.target.value)
                                      }
                                    />
                                  </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={() => handleUpdate(el.name)}
                                  >
                                    Edit
                                  </Button>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>

                            <Button
                              backgroundColor={"red.400"}
                              _hover={{ backgroundColor: "red.500" }}
                              onClick={() => handleDelete(el._id, el.name)}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TableContainer>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CreateCategory;
