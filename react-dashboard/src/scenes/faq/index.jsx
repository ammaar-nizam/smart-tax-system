import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            architecto ipsum quidem asperiores vitae, quibusdam velit commodi
            tenetur deserunt illum molestiae a aspernatur inventore, quis
            ducimus minus beatae expedita assumenda, consectetur repellat
            explicabo ullam officiis. Iure obcaecati blanditiis veritatis
            aperiam tempore natus culpa at esse, et totam quas aut vero!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            architecto ipsum quidem asperiores vitae, quibusdam velit commodi
            tenetur deserunt illum molestiae a aspernatur inventore, quis
            ducimus minus beatae expedita assumenda, consectetur repellat
            explicabo ullam officiis. Iure obcaecati blanditiis veritatis
            aperiam tempore natus culpa at esse, et totam quas aut vero!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
