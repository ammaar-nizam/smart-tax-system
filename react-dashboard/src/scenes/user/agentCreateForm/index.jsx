import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AgentCreateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [agentName, setAgentName] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState("");
  const [agentAddress, setAgentAddress] = useState("");
  const [agentTelephone, setAgentTelephone] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentUsername, setAgentUsername] = useState("");
  const [agentPassword, setAgentPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    document.title = "Create Agents | SMART TAX";
  });

  const initialValues = {
    agentName: "",
    businessRegistrationNumber: "",
    agentAddress: "",
    agentTelephone: "",
    agentEmail: "",
    agentUsername: "",
    agentPassword: "",
  };

  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/;
  // TODO: password validation regex not working
  const passwordRegExp =
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8}$";

  const agentSchema = yup.object().shape({
    agentName: yup.string().required("Agent name cannot be empty."),
    agentEmail: yup
      .string()
      .email("Invalid email address.")
      .required("Email cannot be empty."),
    agentUsername: yup.string().required("Username cannot be empty."),
    agentPassword: yup.string().required("Password cannot be empty."),
    // .matches(passwordRegExp, "Password should have atleast 1 uppercase, 1 lowercase, 1 number & 8 characters minimum.")

    businessRegistrationNumber: yup
      .string()
      .required("Business Registration Number cannot be empty. "),
    agentTelephone: yup
      .string()
      .matches(phoneRegExp, "Invalid phone number.")
      .required("Telephone number cannot be empty."),
    agentAddress: yup.string().required("Address cannot be empty."),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    let agentName = values.agentName;
    let businessRegistrationNumber = values.businessRegistrationNumber;
    let agentAddress = values.agentAddress;
    let agentTelephone = values.agentTelephone;
    let agentEmail = values.agentEmail;
    let agentUsername = values.agentUsername;
    let agentPassword = values.agentPassword;

    try {
      const response = Axios.post("http://localhost:8000/api/agents/register", {
        agentName,
        businessRegistrationNumber,
        agentAddress,
        agentTelephone,
        agentEmail,
        agentUsername,
        agentPassword,
      });
      setSuccessMessage("Agent created successfully.");
      setOpenSnackbar(true);
      resetForm();
      console.log((await response).data);
      setAgentName("");
      setBusinessRegistrationNumber("");
      setAgentAddress("");
      setAgentTelephone("");
      setAgentEmail("");
      setAgentUsername("");
      setAgentPassword("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Box m="20px">
      <Box ml="-20px">
        <Header title="Create Agent" subtitle="Create a New Agent Account" />
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={agentSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Agent Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agentName}
                name="agentName"
                error={!!touched.agentName && !!errors.agentName}
                helperText={touched.agentName && errors.agentName}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Business Registration Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.businessRegistrationNumber}
                name="businessRegistrationNumber"
                error={
                  !!touched.businessRegistrationNumber &&
                  !!errors.businessRegistrationNumber
                }
                helperText={
                  touched.businessRegistrationNumber &&
                  errors.businessRegistrationNumber
                }
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Agent Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agentAddress}
                name="agentAddress"
                error={!!touched.agentAddress && !!errors.agentAddress}
                helperText={touched.agentAddress && errors.agentAddress}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Agent Telephone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agentTelephone}
                name="agentTelephone"
                error={!!touched.agentTelephone && !!errors.agentTelephone}
                helperText={touched.agentTelephone && errors.agentTelephone}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Agent Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agentEmail}
                name="agentEmail"
                error={!!touched.agentEmail && !!errors.agentEmail}
                helperText={touched.agentEmail && errors.agentEmail}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agentUsername}
                name="agentUsername"
                error={!!touched.agentUsername && !!errors.agentUsername}
                helperText={touched.agentUsername && errors.agentUsername}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agentPassword}
                name="agentPassword"
                error={!!touched.agentPassword && !!errors.agentPassword}
                helperText={touched.agentPassword && errors.agentPassword}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                id="createAgentBtn"
                color="secondary"
                variant="contained"
              >
                Create Agent
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Snackbar for displaying success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => setOpenSnackbar(false)}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AgentCreateForm;
