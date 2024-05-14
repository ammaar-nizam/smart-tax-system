import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const RespondModal = ({ open, onClose, onSubmit }) => {
  const [responseText, setResponseText] = useState("");

  const handleChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(responseText); // Pass the response text to the parent component's submit function
    onClose(); // Close the modal after submit
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Respond to Feedback</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Response"
          multiline
          fullWidth
          value={responseText}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Response
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RespondModal;