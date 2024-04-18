import React, { useEffect } from "react";
import { Box, Typography, useTheme, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockOrders } from "../../../data/mockData";
import Header from "../../../components/Header";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  // change title
  useEffect(() => {
    document.title = "Orders | ARTIMART";
  });
  
  // console.log(mockDataContacts)
  // return false;
  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "name",
      headerName: "NAME",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    { field: "price", headerName: "Price", flex: 0.3 },
    { field: "city", headerName: "Address", flex: 0.2 },
    { field: "status", headerName: "STATUS", flex: 0.3 },
  ];

  return (
    <Box>
      <Header title="Orders" subtitle="Order Data" />
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
          rows={mockOrders}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
