import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { format } from "date-fns";

const GiftTransactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [giftTransactions, setGiftTransactions] = useState([]);
  
    const getGiftTransactions = async () => {
      try {
        const response = await Axios.get("https://smart-tax-api.vercel.app/api/gift-transactions");
        const data = response.data.map((item) => ({
          ...item,
          effectiveDate: format(new Date(item.effectiveDate), "yyyy-MM-dd")
        }));
        setGiftTransactions(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    // change title
    useEffect(() => {
      document.title = "Gift Transactions | SMART TAX";
      getGiftTransactions();
    }, []);
  
    const columns = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "propertyAddress", headerName: "PROPERTY", flex: 0.5 },
      { field: "type", headerName: "TYPE", flex: 0.3 },
      { field: "consideration", headerName: "CONSIDERATION", flex: 0.3 },
      { field: "effectiveDate", headerName: "EFFECTIVE DATE", flex: 0.3 },
      { field: "giverName", headerName: "GIVER NAME", flex: 0.3 },
      { field: "giverNIC", headerName: "GIVER NIC", flex: 0.3 },
      { field: "receiverId", headerName: "RECEIVER ID", flex: 0.3 }
    ];
  
    return (
      
      <Box>
        <Header title="Gift Transactions" subtitle="All Gift Transactions Data" />
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
            rows={giftTransactions}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  };
  
  export default GiftTransactions;