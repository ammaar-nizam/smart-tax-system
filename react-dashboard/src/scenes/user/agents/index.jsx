import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header";

const Agents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");

  const getAgents = async () => {
    try{
      const data = await Axios.get("https://smart-tax-api.vercel.app/api/agents");
      console.log(data.data);
      setAgents(data.data);
    }catch(error){
      console.log(error)
    }
  }

  // change title
  useEffect(() => {
    document.title = "Agents | SMART TAX";
    getAgents();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "agentName", headerName: "AGENT NAME", flex: 0.4 },
    { field: "businessRegistrationNumber", headerName: "BUSINESS REG NUMBER", flex: 0.3 },
    { field: "agentAddress", headerName: "ADDRESS", flex: 0.5 },
    { field: "agentTelephone", headerName: "TELEPHONE", flex: 0.2 },
    { field: "agentEmail", headerName: "EMAIL", flex: 0.3 },
    { field: "agentUsername", headerName: "USERNAME", flex: 0.3 }
  ];

  return (
    
    <Box>
      <Header title="Agents" subtitle="All Agents Data" />
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
          rows={agents}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Agents;
