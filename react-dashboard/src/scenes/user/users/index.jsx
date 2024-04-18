import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try{
      const data = await Axios.get("https://artimart-api.up.railway.app/api/users");
      console.log(data.data);
      setUsers(data.data);
    }catch(error){
      console.log(error)
    }
  }

  // change title
  useEffect(() => {
    document.title = "Users | ARTIMART";
    getUsers();
  });

  const columns = [
    { field: "userFirstName", headerName: "FIRST NAME", flex: 0.3 },
    { field: "userLastName", headerName: "LAST NAME", flex: 0.3 },
    { field: "email", headerName: "EMAIL", flex: 0.5 },
    { field: "phone", headerName: "PHONE", flex: 0.2 },
    { field: "userRole", headerName: "USER ROLE", flex: 0.3 },
    { field: "age", headerName: "AGE", flex: 0.2 },
    { field: "gender", headerName: "GENDER", flex: 0.2 },
    { field: "house", headerName: "HOUSE", flex: 0.2 },
    { field: "addressLine1", headerName: "ADDRESS", flex: 0.5 },
    { field: "city", headerName: "CITY", flex: 0.3 }
  ];

  getUsers();

  return (
    
    <Box>
      <Header title="Users" subtitle="All User Data" />
      <Box
        m="0 0 5px 5px"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          // Grid Toolbar styles
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;
