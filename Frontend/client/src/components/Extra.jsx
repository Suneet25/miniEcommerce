import React from "react";
import {
  Flex,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export default function Extra() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="App">
   
        <Menu isOpen={isOpen}>
          <MenuButton
            as={Button}
            variant="solid"
            colorScheme="teal"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            Hover Me
          </MenuButton>
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
     
    </div>
  );
}
