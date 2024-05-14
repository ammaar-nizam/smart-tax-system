import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const EDTReturns = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [edtReturns, setEdtReturns] = useState([]);
  
    const getEdtReturns = async () => {
      try{
        const data = await Axios.get("http://localhost:8000/api/edt-returns/");
        console.log(data.data);
        setEdtReturns(data.data);
      }catch(error){
        console.log(error)
      }
    }
  
    // change title
    useEffect(() => {
      document.title = "EDT Returns | SMART TAX";
      getEdtReturns();
    }, []);
  
    const columns = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "type", headerName: "TYPE", flex: 0.2 },
      { field: "taxDue", headerName: "TAX DUE", flex: 0.3 },
      { field: "submitDate", headerName: "SUBMIT DATE", flex: 0.5 },
      { field: "deadlineDate", headerName: "DEADLINE DATE", flex: 0.5 },
      { field: "status", headerName: "STATUS", flex: 0.3 },
      { field: "transactionId", headerName: "TRANSACTION ID", flex: 0.3 },
      { field: "agentId", headerName: "AGENT ID", flex: 0.3 }
    ];
  
    return (
      
      <Box>
        <Header title="EDT Returns" subtitle="All EDT Returns Data" />
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
            rows={edtReturns}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  };
  
  export default EDTReturns;