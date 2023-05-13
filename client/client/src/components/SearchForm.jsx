import { useState } from "react";
import { Input, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useSearch } from "../Context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

function SearchForm() {
  const [values, setValues] = useSearch();
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let { data } = await axios.get(
        ` https://dull-teal-angelfish-wig.cyclic.app/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const buttonSize = useBreakpointValue({ base: "sm", md: "sm" });
  const direction = useBreakpointValue({ base: "column", md: "row" });

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction={direction}>
        <Input
          type="text"
          w={"200px"}
          display={{ base: "none", md: "none", lg: "block" }}
          borderColor={"black"}
          borderWidth={"2px"}
          size={"sm"}
          placeholder="Search"
          _placeholder={{ color: "black" }}
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <Button
          display={{ base: "none", md: "none", lg: "block" }}
          borderWidth={"2px"}
          type="submit"
          size={"sm"}
          variant={"outline"}
          colorScheme="black"
          color={"black"}
        >
          <SearchIcon />
        </Button>
      </Flex>
    </form>
  );
}

export default SearchForm;

{
  /* <Flex>
      <Input
      type="text"
      w={"200px"}
      display={{ base: "none", md: "none", lg: "block" }}
      borderColor={"black"}
      borderWidth={"2px"}
      size={"sm"}
      placeholder="Search"
      _placeholder={{ color: "black" }}
    />
    <Button
      display={{ base: "none", md: "none", lg: "block" }}
      borderWidth={"2px"}
      type="submit"
      size={"sm"}
      variant={"outline"}
      colorScheme="black"
      color={"black"}
    >
      <SearchIcon />
    </Button>
  </Flex> */
}
