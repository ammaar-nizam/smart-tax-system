import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCell } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import RespondModal from "./RespondModal";

const Feedback = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [feedbackData, setFeedbackData] = useState([]);
  const [search, setSearch] = useState("");

  const [openRespondModal, setOpenRespondModal] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [responseText, setResponseText] = useState("");

  const handleOpenRespondModal = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setResponseText(""); // Clear response text on opening modal
    setOpenRespondModal(true);
  };

  // Added function to clear text on close
  const handleCloseModal = () => {
    setOpenRespondModal(false);
    setResponseText(""); // Clear response text on closing modal
  };

  const getFeedback = async () => {
    try {
      const data = await Axios.get("http://localhost:8000/api/feedbacks/");
      console.log(data.data);
      setFeedbackData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (text) => {
    try {
      const updatedFeedback = {
        response: text, // Use the submitted response text
        status: "RESPONDED",
      };
  
      console.log(updatedFeedback);
  
      await Axios.patch(
        `http://localhost:8000/api/feedbacks/${selectedFeedbackId}`,
        updatedFeedback
      );
      getFeedback(); // Refresh data after successful update
      setOpenRespondModal(false); // Close modal after submit
      handleCloseModal();
    } catch (error) {
      console.error("Error updating feedback:", error);
      // Handle update errors (e.g., show error message)
    }
  };
  

  useEffect(() => {
    document.title = "Feedback | SMART TAX";
    getFeedback();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.4 },
    {
      field: "feedback",
      headerName: "Feedback",
      flex: 1,
      renderCell: (params) => {
        const value = params.value;
        const isTooLong = value.length > 50; // Adjust threshold for long text

        return (
          <div>
            {isTooLong ? (
              <>
                <span>{value.substring(0, 50)}...</span>
                <button onClick={() => alert(value)}>Read More</button>
              </>
            ) : (
              <span>{value}</span>
            )}
          </div>
        );
      },
    },
    { field: "rating", headerName: "Rating", flex: 0.2 }, // Assuming rating is stored as a number
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <Button
          variant="contained"
          size="small"
          disabled={params.row.status === "RESPONDED"} // Disable button for responded feedback
          onClick={() => handleOpenRespondModal(params.row.id)}
        >
          Respond
        </Button>,
      ],
    },
  ];

  return (
    <Box>
      <Header title="Feedback" subtitle="All Feedback Data" />
      <Box
        m="0 0 5px 5px"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
        }}
      >
        <DataGrid
          rows={feedbackData}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
          actions={<GridActionsCell />} // GridActionsCell for custom actions column
        />
        <RespondModal
          open={openRespondModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default Feedback;
