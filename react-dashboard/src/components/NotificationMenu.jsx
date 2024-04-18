import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Badge from "@mui/material/Badge";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import GrainIcon from "@mui/icons-material/Grain";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function NotificationMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const NotificationItem = ({ title, subtitle }) => {
    return (
      <>
        <MenuItem
          sx={{
            px: "15px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={handleClose}
        >
          <Box>
            <Typography
              letterSpacing={2}
              fontSize={14}
              color={colors.grey[100]}
              fontWeight="bold"
            >
              {title}
            </Typography>
            <Typography
              fontSize={11}
              color={colors.greenAccent[400]}
              sx={{ mb: "5px" }}
            >
              {subtitle}
            </Typography>
          </Box>
          <ListItemIcon>
            <Tooltip title="Mark as read">
              <IconButton>
                <FiberSmartRecordIcon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        </MenuItem>
        <Divider />
      </>
    );
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={1} color="secondary">
            <NotificationOutlinedIcon />
          </Badge>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            width: 400,
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <NotificationItem
          title="Notification 01"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <NotificationItem
          title="Notification 01"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <NotificationItem
          title="Notification 01"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <NotificationItem
          title="Notification 01"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <NotificationItem
          title="Notification 01"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
      </Menu>
    </React.Fragment>
  );
}
