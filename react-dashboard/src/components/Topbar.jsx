import { React, useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import Badge from '@mui/material/Badge';
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import AccountMenu from "./AccountMenu";
import NotificationMenu from "./NotificationMenu";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="5px"
        width={300}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="butoon" sx={{p: 1}}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex"  >
        <IconButton onClick={colorMode.toggleColorMode}>
          {
            theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )
          }
        </IconButton>
        {/* <IconButton>
          <Badge badgeContent={1} color="primary">
            <NotificationOutlinedIcon />
          </Badge>
        </IconButton> */}

        <NotificationMenu />
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}

        <AccountMenu />
      </Box>
    </Box>
  );
};

export default Topbar;
