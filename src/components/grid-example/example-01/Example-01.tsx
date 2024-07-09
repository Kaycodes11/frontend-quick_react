import { Box, Grid, Paper, styled } from "@mui/material";

// Create a styled component named Item using the Paper component as the base
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff", // Set background color based on theme mode
  ...theme.typography.body2, // Apply body2 typography styles from the theme
  padding: theme.spacing(1), // Apply padding based on the theme spacing
  textAlign: "center", // Center the text
  color: theme.palette.text.secondary, // Set text color based on the theme
}));

// https://mui.com/material-ui/react-grid/#basic-grid
export const BasicGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Box component with flexGrow set to 1 to use full width (MUI v5) */}
      <Grid container spacing={1}>
        {/* Grid container with spacing set to 2 */}
        {/* `Spacing` defines the space between the type item components. It can only be used on a type container component. It basically acts like "gap property which handles row and column gap" */}
        <Grid item xs={8}>
          {/* Grid item taking 8/12 of the width */}
          <Item>xs=8</Item> {/* Styled Paper component displaying 'xs=8' */}
        </Grid>
        <Grid item xs={4}>
          {/* Grid item taking 4/12 of the width */}
          <Item>xs=4</Item> {/* Styled Paper component displaying 'xs=4' */}
        </Grid>
        <Grid item xs={4}>
          {/* Grid item taking 4/12 of the width */}
          <Item>xs=4</Item> {/* Styled Paper component displaying 'xs=4' */}
        </Grid>
        <Grid item xs={8}>
          {/* Grid item taking 8/12 of the width */}
          <Item>xs=8</Item> {/* Styled Paper component displaying 'xs=8' */}
        </Grid>
      </Grid>
    </Box>
  );
};

