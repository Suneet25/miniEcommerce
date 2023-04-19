import { Box, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Spin = ({ path = "/login" }) => {
  let [count, setCount] = useState(3);

  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    let inter = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, { state: location.pathname });
    }
    return () => clearInterval(inter);
  }, [count, navigate, location, path]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
      <Heading>Redirecting to you in {count} second</Heading>
    </Box>
  );
};

export default Spin;
