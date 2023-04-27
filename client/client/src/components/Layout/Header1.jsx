import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  useToast,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useAuth } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/caartContext";
import useCategory from "../Hooks/CategoryHooks";
import { HiOutlineShoppingBag } from "react-icons/hi";

import SearchForm from "../SearchForm";
import { Badge } from "antd";
export default function Header1() {
  const { isOpen, onToggle } = useDisclosure();
  let navigate = useNavigate();
  return (
    <Box position={"sticky"} top={"0"} zIndex={"1"}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "space-between" }}
          px={10}
        >
          <Text
            className="logo"
            letterSpacing={"3px"}
            fontSize={{ base: "xs", md: "md", lg: "lg" }}
            color={"black"}
            onClick={() => navigate("/")}
          >
            AWESOMERCE
          </Text>

          <Box>
            <SearchForm />
          </Box>
          <Flex display={{ base: "none", md: "flex" }} ml={10} gap={5}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let toast = useToast();
  let navigate = useNavigate();
  let [auth, setAuth] = useAuth();
  let [cart, setCart] = useCart();
  let category = useCategory();
  let handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast({
      title: "Logout Successfull",
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Stack direction={"row"} spacing={4}>
      {auth.user ? (
        <>
          <Flex gap={5}>
            <Link href="/products" color={"black"} fontWeight={"600"}>
              Products
            </Link>
            <Link color={"black"}>
              <Menu isOpen={isOpen}>
                <MenuButton
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  color={"black"}
                  fontWeight={"600"}
                >
                  Category
                </MenuButton>
                <MenuList
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  borderRadius={"5px"}
                >
                  <MenuItem
                    color="black"
                    borderRadius={"4px"}
                    _hover={{ backgroundColor: "facebook.400", color: "white" }}
                    onClick={() => navigate(`/category`)}
                  >
                    All Categories
                  </MenuItem>
                  {category.map((el) => (
                    <Box key={el._id}>
                      <MenuItem
                        color="black"
                        borderRadius={"4px"}
                        _hover={{
                          backgroundColor: "facebook.400",
                          color: "white",
                        }}
                        onClick={() => navigate(`/category/${el.slug}`)}
                      >
                        {el.name}
                      </MenuItem>
                    </Box>
                  ))}
                </MenuList>
              </Menu>
            </Link>
            <Link>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="link"
                      color={"black"}
                    >
                      {auth?.user?.name}
                    </MenuButton>
                    <MenuList borderRadius={"5px"}>
                      <MenuItem
                        borderRadius={"4px"}
                        _hover={{
                          backgroundColor: "facebook.400",
                          color: "white",
                        }}
                      >
                        <Link
                          className="navLink "
                          href={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                      <MenuItem
                        borderRadius={"4px"}
                        color="black"
                        _hover={{
                          backgroundColor: "facebook.400",
                          color: "white",
                        }}
                      >
                        <Link className="navLink " onClick={handleLogout}>
                          Logout
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Link>

            <Link href="/cart" className="navLink " color={"black"}>
              <Badge count={cart?.length} showZero>
                <HiOutlineShoppingBag size={"25px"} />
              </Badge>
            </Link>
          </Flex>
        </>
      ) : (
        <>
          <Flex gap={5}>
            <Link href="/products" fontWeight={600} color={"black"}>
              Products
            </Link>
            <Link href="/category" fontWeight={600} color={"black"}>
              <Menu isOpen={isOpen}>
                <MenuButton
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  color={"black"}
                  fontWeight={600}
                >
                  Category
                </MenuButton>
                <MenuList
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  borderRadius={"5px"}
                >
                  <MenuItem
                    color="black"
                    borderRadius={"4px"}
                    _hover={{ backgroundColor: "facebook.400", color: "white" }}
                    onClick={() => navigate(`/category`)}
                  >
                    All Categories
                  </MenuItem>
                  {category.map((el) => (
                    <Box key={el._id}>
                      <MenuItem
                        color="black"
                        borderRadius={"4px"}
                        _hover={{
                          backgroundColor: "facebook.400",
                          color: "white",
                        }}
                        onClick={() => navigate(`/category/${el.slug}`)}
                      >
                        {el.name}
                      </MenuItem>
                    </Box>
                  ))}
                </MenuList>
              </Menu>
            </Link>
            <Button
              as={"a"}
              href="/login"
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              size={"sm"}
              fontWeight={600}
              color={"white"}
              bgColor={"black"}
              _hover={{
                color: "white",
                bgColor: "black",
              }}
            >
              Login
            </Button>
            <Button
              href="/register"
              className="navLink "
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              size={"sm"}
              fontWeight={600}
              color={"blue"}
              bg={"white"}
            >
              Register
            </Button>

            <Link href="/cart" className="navLink " color={"black"}>
              <Badge count={cart?.length} showZero>
                <HiOutlineShoppingBag size={"25px"} />
              </Badge>
            </Link>
          </Flex>
        </>
      )}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  let toast = useToast();
  let navigate = useNavigate();
  let [auth, setAuth] = useAuth();

  let [cart, setCart] = useCart();
  let handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast({
      title: "Logout Successfull",
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {auth.user ? (
        <>
          {" "}
          <Stack gap={5}>
            <Link href="/" fontWeight={"600"}>
              Home
            </Link>
            <Link href="/products" fontWeight={"600"}>
              Products
            </Link>
            <Link href="/category" fontWeight={"600"}>
              Category
            </Link>
            <Link>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="link"
                      color={"teal"}
                    >
                      {auth?.user?.name}
                    </MenuButton>
                    <MenuList borderRadius={"5px"}>
                      <MenuItem
                        borderRadius={"4px"}
                        _hover={{
                          backgroundColor: "facebook.400",
                          color: "white",
                        }}
                      >
                        <Link
                          className="navLink "
                          href={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                      <MenuItem
                        borderRadius={"4px"}
                        _hover={{
                          backgroundColor: "facebook.400",
                          color: "white",
                        }}
                      >
                        <Link className="navLink " onClick={handleLogout}>
                          Logout
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Link>
            <Link href="/cart" className="navLink " color={"black"}>
              <Badge count={cart?.length} showZero>
                <HiOutlineShoppingBag size={"25px"} />
              </Badge>
            </Link>
          </Stack>
        </>
      ) : (
        <>
          {" "}
          <Stack gap={5}>
            <Link href="/" fontWeight={"600"}>
              Home
            </Link>
            <Link href="/products" fontWeight={"600"}>
              Products
            </Link>
            <Link href="/category" fontWeight={"600"}>
              Category
            </Link>
            <Link href="/login" className="navLink ">
              Login
            </Link>
            <Link href="/register" className="navLink ">
              Register
            </Link>
            <Link href="/cart" className="navLink " color={"black"}>
              <Badge count={cart?.length} showZero>
                <HiOutlineShoppingBag size={"25px"} />
              </Badge>
            </Link>
          </Stack>
        </>
      )}
    </Stack>
  );
};
