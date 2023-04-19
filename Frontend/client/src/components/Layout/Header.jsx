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
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import SearchForm from "../SearchForm";
import useCategory from "../Hooks/CategoryHooks";
import { useCart } from "../../Context/caartContext";
import { Badge } from "antd";
export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  let navigate = useNavigate();
  let category = useCategory();
  return (
    <Box className="navbar">
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
          justify={{ base: "center", md: "space-between", lg: "space-between" }}
        >
          <Flex gap={2} onClick={() => navigate("/")} cursor={"pointer"}>
            <Box
              margin={"auto"}
              display={{ base: "none", md: "contents", lg: "contents" }}
            >
              <FaShoppingCart className="logo" />
            </Box>
            <Text
              className="logo"
              letterSpacing={"3px"}
              fontSize={{ base: "xs", md: "md", lg: "lg" }}
            >
              AWESOMERCE
            </Text>
          </Flex>
          <Box ml={"30px"}>
            <SearchForm />
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
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
            <Link
              href="/"
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              Home
            </Link>
            <Link
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              <Menu isOpen={isOpen}>
                <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
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
                    _hover={{ backgroundColor: "teal.400", color: "white" }}
                    onClick={() => navigate(`/category`)}
                  >
                    All Categories
                  </MenuItem>
                  {category.map((el) => (
                    <Box key={el._id}>
                      <MenuItem
                        color="black"
                        borderRadius={"4px"}
                        _hover={{ backgroundColor: "teal.400", color: "white" }}
                        onClick={() => navigate(`/category/${el.slug}`)}
                      >
                        {el.name}
                      </MenuItem>
                    </Box>
                  ))}
                </MenuList>
              </Menu>
            </Link>
            <Link
              _hover={{
                backgroundColor: "teal.400",

                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="link"
                      color={"teal"}
                      _hover={{ color: "white" }}
                    >
                      {auth?.user?.name}
                    </MenuButton>
                    <MenuList borderRadius={"5px"}>
                      <MenuItem
                        borderRadius={"4px"}
                        _hover={{ backgroundColor: "teal.400", color: "white" }}
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
                        _hover={{ backgroundColor: "teal.400", color: "white" }}
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
            <Link
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
              href="/cart"
              className="navLink "
            >
              <Badge count={cart?.length} showZero>
                Cart
              </Badge>
            </Link>
          </Flex>
        </>
      ) : (
        <>
          {" "}
          <Flex gap={5}>
            <Link
              href="/"
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              Home
            </Link>
            <Link
              href="/category"
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              Category
            </Link>
            <Link
              href="/login"
              className="navLink "
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="navLink "
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              Register
            </Link>
            <Link
              href="/cart"
              className="navLink "
              _hover={{
                backgroundColor: "teal.400",
                color: "white",
                px: "2",
                py: "1",
                borderRadius: "5px",
              }}
            >
              <Badge count={cart?.length} showZero>
                Cart
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
            <Link href="/">Home</Link>
            <Link href="/category">Category</Link>
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
                        _hover={{ backgroundColor: "teal.400", color: "white" }}
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
                        _hover={{ backgroundColor: "teal.400", color: "white" }}
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
            <Link href="/cart" className="navLink ">
              <Badge count={cart?.length} showZero>
                Cart
              </Badge>
            </Link>
          </Stack>
        </>
      ) : (
        <>
          {" "}
          <Stack gap={5}>
            <Link href="/">Home</Link>
            <Link href="/category">Category</Link>
            <Link href="/login" className="navLink ">
              Login
            </Link>
            <Link href="/register" className="navLink ">
              Register
            </Link>
            <Link href="/cart" className="navLink ">
              <Badge count={cart?.length} showZero>
                Cart
              </Badge>
            </Link>
          </Stack>
        </>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  // {
  //   label: "Home",
  //   href: "/",
  // },
  // {
  //   label: "Category",
  //   href: "/category",
  // },
];
