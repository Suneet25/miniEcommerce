import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, description, title, author, keyword }) => {
  return (
    <Box>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="author" content={author} />
        <meta name="keywords" content={keyword} />
        <meta name="description" content={description} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "65vh" }}>{children}</main>
      <Footer />
    </Box>
  );
};
Layout.defaultProps = {
  title: "Awesomerce-shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongo-db,chakra-ui",
  author: "Suneet",
};

export default Layout;
