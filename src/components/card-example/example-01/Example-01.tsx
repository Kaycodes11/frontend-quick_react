import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const CustomCard = () => {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mt: 5 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://source.unsplash.com/random"
        alt="Unsplash Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Card Heading
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is some textual information about the card. It provides
          additional details.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Paper
            sx={{
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
            }}
          >
            <FavoriteIcon color="primary" />
          </Paper>
          <Paper
            sx={{
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
            }}
          >
            <ShareIcon color="secondary" />
          </Paper>
        </Box>
      </CardContent>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button variant="contained" color="primary">
          Call to Action
        </Button>
      </Box>
    </Card>
  );
};

export { CustomCard };
