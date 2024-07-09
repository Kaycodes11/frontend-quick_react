import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import { ChildrenProp } from "../../../types/common";

// API: https://mui.com/material-ui/api/container/

// Fluid container: (100% width & 100% height) is container is not fixed (intentionally)
export const FullWidthHeightContainer: React.FC<ChildrenProp> = ({
  children,
}) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: "100vh", width: "100vw" }}
    >
      <Box
        sx={{
          overflow: "hidden",
          height: "100%",
          width: "100%",
          padding: "1.25rem",
          // background: "lightgreen",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

// Fixed container (width-wise): This container with Fixed width (intentionally) and 100% height

export const FixedContainer: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* By default, "fixed" refers to "lg" */}
      {/* To remove default left and right, use "disableGutters" */}
      <Container fixed sx={{ height: "100vh" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            padding: "1.25rem",
            background: "lightgreen",
          }}
        >
          {children}
        </Box>
        {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>{children}</Box> */}
      </Container>
    </React.Fragment>
  );
};
