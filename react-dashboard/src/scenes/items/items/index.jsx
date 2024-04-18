import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Items = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    try{
      const data = await Axios.get("https://artimart-api.up.railway.app/api/products");
      console.log(data.data);
      setProducts(data.data);
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    document.title = "Products | ARTIMART";

    getProducts();
    
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.2 },
    {
      field: "productName",
      headerName: "PRODUCT NAME",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      flex: 1.0,
      headerAlign: "left",
      align: "left",
    },
    { field: "dimension", headerName: "DIMENSION", flex: 0.3 },
    { field: "categoryName", headerName: "CATEGORY", flex: 0.5 },
    { field: "price", headerName: "PRICE", flex: 0.3 },
    { field: "availableQuantity", headerName: "QUANTITY", flex: 0.3 }
    

  ];

  return (
    <Box>
      <Header title="Products" subtitle="Product Data" />
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
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Items;
