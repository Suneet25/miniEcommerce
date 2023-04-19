import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

function CategoryForm({ value, setValue, handleSubmit }) {
  return (
    <FormControl mt={10}>
      <FormLabel>Add Category</FormLabel>
      <Input
        type="text"
        placeholder="Enter new category"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxWidth={{ base: "60%", md: "40%", lg: "40%" }}
      />

      <Button
        onClick={handleSubmit}
        backgroundColor={"blue.500"}
        color={"white"}
        _hover={{ backgroundColor: "blue.500", color: "white" }}
        ml={2}
      >
        Submit
      </Button>
    </FormControl>
  );
}

export default CategoryForm;
