import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "registrarId", headerName: "REGISTRAR ID", flex: 0.5 },
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
    { field: "age", headerName: "AGE" },
    { field: "phone", headerName: "PHONE", flex: 0.75 },
    {
      field: "address",
      headerName: "ADDRESS",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "city",
      headerName: "CITY",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "zipCode",
      headerName: "ZIP Code",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <Box>
      <Header title="Contacts" subtitle="Users Contact Information" />
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
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
