import { Box, Typography, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Header from "../../components/Header";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Most Frequently Asked Questions" />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est quisquam quasi
            necessitatibus distinctio nostrum dolorum incidunt dicta quis. Sed, eum. Et pariatur
            dolores consectetur nostrum non? Odit quam natus officia! At mollitia itaque repudiandae
            reprehenderit explicabo ipsa quis natus quidem fuga minima eaque voluptatibus rem enim
            perspiciatis perferendis, velit aspernatur ipsum totam, incidunt repellat est.
            Quibusdam, deleniti. Ratione, facilis dolor!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Another Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est quisquam quasi
            necessitatibus distinctio nostrum dolorum incidunt dicta quis. Sed, eum. Et pariatur
            dolores consectetur nostrum non? Odit quam natus officia! At mollitia itaque repudiandae
            reprehenderit explicabo ipsa quis natus quidem fuga minima eaque voluptatibus rem enim
            perspiciatis perferendis, velit aspernatur ipsum totam, incidunt repellat est.
            Quibusdam, deleniti. Ratione, facilis dolor!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Your most Favorite Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est quisquam quasi
            necessitatibus distinctio nostrum dolorum incidunt dicta quis. Sed, eum. Et pariatur
            dolores consectetur nostrum non? Odit quam natus officia! At mollitia itaque repudiandae
            reprehenderit explicabo ipsa quis natus quidem fuga minima eaque voluptatibus rem enim
            perspiciatis perferendis, velit aspernatur ipsum totam, incidunt repellat est.
            Quibusdam, deleniti. Ratione, facilis dolor!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Some Random Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est quisquam quasi
            necessitatibus distinctio nostrum dolorum incidunt dicta quis. Sed, eum. Et pariatur
            dolores consectetur nostrum non? Odit quam natus officia! At mollitia itaque repudiandae
            reprehenderit explicabo ipsa quis natus quidem fuga minima eaque voluptatibus rem enim
            perspiciatis perferendis, velit aspernatur ipsum totam, incidunt repellat est.
            Quibusdam, deleniti. Ratione, facilis dolor!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Extra Questions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est quisquam quasi
            necessitatibus distinctio nostrum dolorum incidunt dicta quis. Sed, eum. Et pariatur
            dolores consectetur nostrum non? Odit quam natus officia! At mollitia itaque repudiandae
            reprehenderit explicabo ipsa quis natus quidem fuga minima eaque voluptatibus rem enim
            perspiciatis perferendis, velit aspernatur ipsum totam, incidunt repellat est.
            Quibusdam, deleniti. Ratione, facilis dolor!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
