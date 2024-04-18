import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "../../components/Header";
import { Box, Button, IconButton, Typography, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions, mockDataTeam } from "../../data/mockData";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Icons
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

// Charts

import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try{
      const data = await Axios.get("https://artimart-api.up.railway.app/api/users");
      setUsers(data.data);
    }catch(error){
      console.log(error)
    }
  }

  const [dataCount, setDataCount] = useState([]);

  const getDataCount = async () => {
    try{
      const data_count = await Axios.get("https://artimart-api.up.railway.app/api/count");
      setDataCount(data_count.data);
    }catch(error){
      console.log(error);
    }
  }
  
  // getDataCount();
  // change title
  useEffect(() => {
    document.title = "Dashboard | ARTIMART";

    getUsers();
  });

  const columns = [
    { field: "userFirstName", headerName: "FIRST NAME", flex: 0.2 },
    { field: "userLastName", headerName: "LAST NAME", flex: 0.2 },
    { field: "email", headerName: "EMAIL", flex: 0.4 },
    { field: "userRole", headerName: "USER ROLE", flex: 0.2 }
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="-20px"
      >
        <Header
          title="Dashboard"
          subtitle="Welcome to your personalized Dashboard"
        />

        <Box mr="20px">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "7px 15px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* Grid & Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          {/* <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Users
              </Typography>

          <TextField
                variant="filled"
                type="text"
                onChange={(e) => setDataCount(e.target.value)}
                value={dataCount.data}
                name="userCount"
              /> */}

          <StatBox
            title="12"
            subtitle="Total Users"
            progress="0.7"
            increase="+14%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="12,352"
            subtitle="Total Orders"
            progress="0.3"
            increase="+14%"
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="$12,352"
            subtitle="Total Products"
            progress="0.5"
            increase="+14%"
            icon={
              <CurrencyExchangeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="$12,352"
            subtitle="My Balance"
            progress="0.9"
            increase="+14%"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,879,09
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26p", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

        </Box>

        {/* Transactions */}
        <Box
          gridColumn="span 4"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius="10px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[700]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[700]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>

                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>

              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius="10px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[700]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Newly Registered Users
            </Typography>
          </Box>
          <Box>
            <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
