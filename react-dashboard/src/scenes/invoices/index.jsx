import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "name",
      headerName: "NAME",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "cost",
      headerName: "COST",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    { field: "phone", headerName: "PHONE", flex: 0.75 },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <Box>
      <Header title="Invoices" subtitle="Invoice Information" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataInvoices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
