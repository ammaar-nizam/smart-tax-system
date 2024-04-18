import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputBase,
  IconButton,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../../../theme";

const UserUpdateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // change title
  useEffect(() => {
    document.title = "Update Users | ARTIMART";
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: 0,
    gender: "male",
    telephoneMobile: "",
    telephoneHome: "",
    houseNo: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    role: "admin",
  };

  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/;
  // TODO: password validation regex not working
  const passwordRegExp =
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8}$";

  const userSchema = yup.object().shape({
    firstName: yup.string().required("First name field cannot be empty."),
    lastName: yup.string().required("Last name field cannot be empty."),
    email: yup
      .string()
      .email("Invalid email address.")
      .required("Email field cannot be empty."),
    password: yup.string().required("Password field cannot be empty."),
    // .matches(passwordRegExp, "Password should have atleast 1 uppercase, 1 lowercase, 1 number & 8 characters minimum.")
    age: yup.number().required("Age field cannot be empty."),
    gender: yup.string().required("Gender field cannot be empty. "),
    telephoneMobile: yup
      .string()
      .matches(phoneRegExp, "Invalid phone number.")
      .required("Telephone number field cannot be empty."),
    telephoneHome: yup.string().matches(phoneRegExp, "Invalid phone number."),
    role: yup.string().required("Role field cannot be empty."),
    houseNo: yup.string().required("House number field cannot be empty."),
    addressLine1: yup
      .string()
      .required("Address Line 1 field cannot be empty."),
    city: yup.string().required("City field cannot be empty."),
    zipCode: yup.string().required("Zip code field cannot be empty."),
  });

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Box
        mt="-20px"
        ml="-20px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="Update User" subtitle="Update User Data" />
        <Box>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="5px"
            width={300}
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Enter User ID" />
            <IconButton type="butoon" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="House Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.houseNo}
                name="houseNo"
                error={!!touched.houseNo && !!errors.houseNo}
                helperText={touched.houseNo && errors.houseNo}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address Line 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressLine1}
                name="addressLine1"
                error={!!touched.addressLine1 && !!errors.addressLine1}
                helperText={touched.addressLine1 && errors.addressLine1}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address Line 2 (Optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressLine2}
                name="addressLine2"
                error={!!touched.addressLine2 && !!errors.addressLine2}
                helperText={touched.addressLine2 && errors.addressLine2}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 1" }}
              />

              <FormControl sx={{ gridColumn: "span 1" }}>
                <InputLabel id="gender-select" sx={{ lineHeight: 4.5 }}>
                  Gender
                </InputLabel>
                <Select
                  labelId="gender-select"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gender}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                >
                  <MenuItem value="male" label="Male">
                    Male
                  </MenuItem>
                  <MenuItem value="female" label="Female">
                    Female
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="role-select" sx={{ lineHeight: 4.5 }}>
                  Role
                </InputLabel>
                <Select
                  labelId="role-select"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={!!touched.role && !!errors.role}
                  helperText={touched.role && errors.role}
                >
                  <MenuItem value="admin" label="Select role">
                    Admin
                  </MenuItem>
                  <MenuItem value="user" label="Select role">
                    User
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telephone Number (Mobile)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telephoneMobile}
                name="telephoneMobile"
                error={!!touched.telephoneMobile && !!errors.telephoneMobile}
                helperText={touched.telephoneMobile && errors.telephoneMobile}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telephone Number (Home)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telephoneHome}
                name="telephoneHome"
                error={!!touched.telephoneHome && !!errors.telephoneHome}
                helperText={touched.telephoneHome && errors.telephoneHome}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                name="zipCode"
                error={!!touched.zipCode && !!errors.zipCode}
                helperText={touched.zipCode && errors.zipCode}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserUpdateForm;
