import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { format } from "date-fns";

const FiledInheritanceTaxReturns = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [inheritanceReturns, setInheritanceReturns] = useState([]);
  
    const getInheritanceReturns = async () => {
      try {
        const response = await Axios.get("https://smart-tax-api.vercel.app/api/inheritance-returns/filed");
        const data = response.data.map((item) => ({
          ...item,
          submitDate: format(new Date(item.submitDate), "yyyy-MM-dd"),
          deadlineDate: format(new Date(item.deadlineDate), "yyyy-MM-dd"),
        }));
        setInheritanceReturns(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    // change title
    useEffect(() => {
      document.title = "Filed Inheritance Returns | SMART TAX";
      getInheritanceReturns();
    }, []);
  
    const columns = [
      { field: "id", headerName: "ID", flex: 0.2 },
      { field: "type", headerName: "TYPE", flex: 0.2 },
      { field: "taxDue", headerName: "TAX DUE", flex: 0.3 },
      { field: "submitDate", headerName: "SUBMIT DATE", flex: 0.3 },
      { field: "deadlineDate", headerName: "DEADLINE DATE", flex: 0.3 },
      { field: "status", headerName: "STATUS", flex: 0.3 },
      { field: "transactionId", headerName: "TRANSACTION ID", flex: 0.3 },
      { field: "agentId", headerName: "AGENT ID", flex: 0.3 }
    ];
  
    return (
      
      <Box>
        <Header title="Inheritance Returns" subtitle="All FILED Inheritance Returns Data" />
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
            rows={inheritanceReturns}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  };
  
  export default FiledInheritanceTaxReturns;