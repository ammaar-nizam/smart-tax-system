import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Purchasers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [purchasers, setPurchasers] = useState([]);
  
    const getPurchasers = async () => {
      try{
        const data = await Axios.get("http://localhost:8000/api/purchasers");
        console.log(data.data);
        setPurchasers(data.data);
      }catch(error){
        console.log(error)
      }
    }
  
    // change title
    useEffect(() => {
      document.title = "Purchasers | SMART TAX";
      getPurchasers();
    }, []);
  
    const columns = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "purchaserName", headerName: "PURCHASER NAME", flex: 0.4 },
      { field: "nic", headerName: "NIC", flex: 0.3 },
      { field: "dob", headerName: "DATE OF BIRTH", flex: 0.5 },
      { field: "isFirstProperty", headerName: "FIRST TIME BUYER", flex: 0.3 },
      { field: "isSriLankanResident", headerName: "SRI LANKAN", flex: 0.3 },
      { field: "isCompany", headerName: "COMPANY", flex: 0.3 },
      { field: "agentId", headerName: "AGENT ID", flex: 0.3 }
    ];
  
    return (
      
      <Box>
        <Header title="Purchasers" subtitle="All Purchasers Data" />
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
            rows={purchasers}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  };
  
  export default Purchasers;