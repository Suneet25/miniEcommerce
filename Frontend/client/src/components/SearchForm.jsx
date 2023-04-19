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
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
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
          placeholder="Search"
          size="sm"
          border={"2px solid teal"}
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <Button
          type="submit"
          size={buttonSize}
          variant={"outline"}
          colorScheme="teal"
        >
          <SearchIcon />
        </Button>
      </Flex>
    </form>
  );
}

export default SearchForm;
