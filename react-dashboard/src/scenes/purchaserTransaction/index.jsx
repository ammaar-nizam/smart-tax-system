import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const PurchaseTransactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [purchaseTransactions, setPurchaseTransactions] = useState([]);
  
    const getPurchaseTransactions = async () => {
      try{
        const data = await Axios.get("http://localhost:8000/api/purchase-transactions");
        console.log(data.data);
        setPurchaseTransactions(data.data);
      }catch(error){
        console.log(error)
      }
    }
  
    // change title
    useEffect(() => {
      document.title = "Purchase Transactions | SMART TAX";
      getPurchaseTransactions();
    }, []);
  
    const columns = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "propertyAddress", headerName: "PROPERTY", flex: 0.5 },
      { field: "type", headerName: "TYPE", flex: 0.3 },
      { field: "consideration", headerName: "CONSIDERATION", flex: 0.3 },
      { field: "effectiveDate", headerName: "EFFECTIVE DATE", flex: 0.3 },
      { field: "vendorName", headerName: "VENDOR NAME", flex: 0.3 },
      { field: "vendorNIC", headerName: "VENDOR NIC", flex: 0.3 },
      { field: "vendorAgentName", headerName: "VENDOR AGENT", flex: 0.3 },
      { field: "vendorAgentAddress", headerName: "AGENT ADDRESS", flex: 0.3 },
      { field: "purchaserId", headerName: "PURCHASER ID", flex: 0.3 }
    ];
  
    return (
      
      <Box>
        <Header title="Purchase Transactions" subtitle="All Purchase Transactions Data" />
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
            rows={purchaseTransactions}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  };
  
  export default PurchaseTransactions;