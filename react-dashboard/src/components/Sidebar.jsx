import { React, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import "../App.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = "admin";

  return (
    <div className="sidebar">
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
            minHeight: "100vh",
            height: "100%",
            width: 300,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography
                    variant="h5"
                    letterSpacing={6}
                    color={colors.grey[100]}
                  >
                    SMART TAX
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {/* USER */}
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    src={`../../assets/user.jpg`}
                    width="75px"
                    height="75px"
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                    alt="user-profile"
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    sx={{ m: "10px 0 0 0" }}
                    letterSpacing={3}
                  >
                    Ammaar Nizam
                  </Typography>
                  <Typography
                    variant="h6"
                    letterSpacing={2}
                    color={colors.greenAccent[500]}
                  >
                    Admin | Smart Tax
                  </Typography>
                </Box>
              </Box>
            )}

            {/* TODO: Customize side menu according to the requirement */}

            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              {/* {user === "admin" && ( */}
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* )} */}

              <Typography
                variant="h6"
                color={colors.grey[300]}
                letterSpacing={2}
                sx={{ m: "15px 0 5px 20px" }}
              >
                AGENTS
              </Typography>

              <Item
                title="View Agents"
                to="/agents"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Create Agents"
                to="/agents/create"
                icon={<PersonAddAltIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                letterSpacing={2}
                sx={{ m: "15px 0 5px 20px" }}
              >
                FEEDBACKS
              </Typography>

              <Item
                title="Manage Feedbacks"
                to="/feedbacks"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                letterSpacing={2}
                sx={{ m: "15px 0 5px 20px" }}
              >
                TAX PAYERS
              </Typography>

              <Item
                title="View Purchasers"
                to="/purchasers"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="View Receivers"
                to="/receivers"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="View Beneficiaries"
                to="/beneficiaries"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                letterSpacing={2}
                sx={{ m: "15px 0 5px 20px" }}
              >
                TRANSACTIONS
              </Typography>

              <Item
                title="Purchase Transactions"
                to="/purchase-transactions"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Gift Transactions"
                to="/gift-transactions"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Inheritance Transactions"
                to="/inheritance-transactions"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                letterSpacing={2}
                sx={{ m: "15px 0 5px 20px" }}
              >
                FILED RETURNS
              </Typography>

              <Item
                title="Filed EDT Returns"
                to="/edt-returns/filed"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Paid EDT Returns"
                to="/edt-returns/paid"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Filed Gift Returns"
                to="/gift-tax-returns/filed"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Paid Gift Returns"
                to="/gift-tax-returns/paid"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Filed Inheritance Returns"
                to="/inheritance-tax-returns/filed"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Paid Inheritance Returns"
                to="/inheritance-tax-returns/paid"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </div>
  );
};

export default Sidebar;
