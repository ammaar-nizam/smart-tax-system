import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { format } from "date-fns";

const Receivers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [receivers, setReceivers] = useState([]);
  
    const getReceivers = async () => {
      try {
        const response = await Axios.get("https://smart-tax-api.vercel.app/api/receivers");
        const data = response.data.map((item) => ({
          ...item,
          dob: format(new Date(item.dob), "yyyy-MM-dd"),
          isFirstProperty: item.isFirstProperty ? "Yes" : "No",
          isSriLankanResident: item.isSriLankanResident ? "Yes" : "No",
          isCompany: item.isCompany ? "Yes" : "No",
        }));
        setReceivers(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    // change title
    useEffect(() => {
      document.title = "Receivers | SMART TAX";
      getReceivers();
    }, []);
  
    const columns = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "receiverName", headerName: "RECEIVER NAME", flex: 0.4 },
      { field: "nic", headerName: "NIC", flex: 0.3 },
      { field: "dob", headerName: "DATE OF BIRTH", flex: 0.5 },
      { field: "isFirstProperty", headerName: "FIRST TIME BUYER", flex: 0.3 },
      { field: "isSriLankanResident", headerName: "SRI LANKAN", flex: 0.3 },
      { field: "isCompany", headerName: "COMPANY", flex: 0.3 },
      { field: "agentId", headerName: "AGENT ID", flex: 0.3 }
    ];
  
    return (
      
      <Box>
        <Header title="Receivers" subtitle="All Receivers Data" />
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
            rows={receivers}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  };
  
  export default Receivers;