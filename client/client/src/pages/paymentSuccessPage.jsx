import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Box, Heading } from "@chakra-ui/react";

const Success = () => {
  const [heading, setHeading] = useState(
    "please wait, transection is processing..."
  );
  const [Image, setImage] = useState("https://i.gifer.com/BvMu.gif");

  const handleSuccess = () => {
    setHeading("Payment Successful");
    setImage("https://c.tenor.com/xVfFIHxAzW4AAAAC/success.gif");
  };

  useEffect(() => {
    setTimeout(() => {
      handleSuccess();
    }, 3000);
  }, []);
  return (
    <Layout title={"success-page-Awesomerce"}>
      <Heading textAlign={"center"} mt={10}>
        {heading}
      </Heading>
      <Box display={"flex"} justifyContent={"center"} mt={10} mb={10}>
        <img src={Image} alt="success" />
      </Box>
    </Layout>
  );
};

export default Success;
