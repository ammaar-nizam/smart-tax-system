import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px" mb="30px">
      <Typography letterSpacing={2} variant="h3" color={colors.grey[100]} fontWeight="bold" >{title}</Typography>
      <Typography variant="h6" color={colors.greenAccent[400]} sx={{mb: "5px"}} >{subtitle}</Typography>
    </Box>
  );
};

export default Header;
