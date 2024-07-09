import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";

// Box === div but it could be rendered as any HTML element as well as any React component ↓↓
export const BoxBasic = () => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      This Box renders as an HTML section element.
    </Box>
  );
};

// Just like div could be turned into any "primitive shapes" so the same thing could be done by "Box"↓↓
export const BoxSystemProps = () => {
  return (
    <Box
      height={200}
      width={200}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: "2px dotted grey", background: "lightgreen" }}
    >
      This Box uses MUI System props for quick customization.
    </Box>
  );
};

// with the sx prop on Box

export const BoxSx = () => {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: "#007FFF",
            dark: "#0066CC",
          },
        },
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      />
    </ThemeProvider>
  );
};

/*

How the Box looks like ? <Box /> is just a single div as below 

<div className="MuiBox-root">
  <!-- contents of the Box -->
</div>


*/

// API: https://mui.com/material-ui/api/box/
