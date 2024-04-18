import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";

const UserCreateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const [userFirstName, setUserFirstName] = useState('');
  // const [userLastName, setUserLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [age, setAge] = useState('');
  // const [gender, setGender] = useState('Male');
  // const [phone, setPhone] = useState('');
  // const [userRole, setUserRole] = useState('Customer');
  // const [house, setHouse] = useState('');
  // const [addressLine1, setAddressLine1] = useState('');
  // const [addressLine2, setAddressLine2] = useState('');
  // const [city, setCity] = useState('');
  // const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    document.title = "Create Users | ARTIMART";
  });

  const initialValues = {
    userFirstName: "",
    userLastName: "",
    email: "",
    password: "",
    age: "",
    gender: "Male",
    phone: "",
    house: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    userRole: "Customer",
  };

  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/;
  // TODO: password validation regex not working
  const passwordRegExp =
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8}$";

  const userSchema = yup.object().shape({
    userFirstName: yup
      .string()
      .required("First name field cannot be empty."),
    userLastName: yup.string().required("Last name field cannot be empty."),
    email: yup
      .string()
      .email("Invalid email address.")
      .required("Email field cannot be empty."),
    password: yup.string().required("Password field cannot be empty."),
    // .matches(passwordRegExp, "Password should have atleast 1 uppercase, 1 lowercase, 1 number & 8 characters minimum.")
    age: yup.number().required("Age field cannot be empty."),
    gender: yup.string().required("Gender field cannot be empty. "),
    phone: yup
      .string()
      .matches(phoneRegExp, "Invalid phone number.")
      .required("Telephone number field cannot be empty."),
    userRole: yup.string().required("Role field cannot be empty."),
    house: yup.string().required("House number field cannot be empty."),
    addressLine1: yup
      .string()
      .required("Address Line 1 field cannot be empty."),
    city: yup.string().required("City field cannot be empty."),
    zipCode: yup.string().required("Zip code field cannot be empty."),
  });

  const handleFormSubmit = async (values) => {

    let userFirstName = values.userFirstName;
    let userLastName = values.userLastName;
    let email = values.email;
    let password = values.password;
    let age = values.age;
    let gender = values.gender;
    let phone = values.phone;
    let userRole = values.userRole;
    let house = values.house;
    let addressLine1 = values.addressLine1;
    let addressLine2 = values.addressLine2;
    let city = values.city;
    let zipCode = values.zipCode;

    try {
      const response = Axios.post(
        "https://artimart-api.up.railway.app/api/auth/register",
        {
          userFirstName,
          userLastName,
          email,
          password,
          age,
          gender,
          phone,
          userRole,
          house,
          addressLine1,
          addressLine2,
          city,
          zipCode,
        }
      );
      console.log((await response).data);
      // setUserFirstName('');
      // setUserLastName('');
      // setEmail('');
      // setPassword('');
      // setAge('');
      // setPhone('');
      // setHouse('');
      // setAddressLine1('');
      // setAddressLine2('');
      // setCity('');
      // setZipCode('');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Box m="20px">
      <Box ml="-20px">
        <Header title="Create User" subtitle="Create A New User Account" />
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
                value={values.userFirstName}
                name="userFirstName"
                error={
                  !!touched.userFirstName && !!errors.userFirstName
                }
                helperText={
                  touched.userFirstName && errors.userFirstName
                }
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userLastName}
                name="userLastName"
                error={!!touched.userLastName && !!errors.userLastName}
                helperText={touched.userLastName && errors.userLastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="House Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.house}
                name="house"
                error={!!touched.house && !!errors.house}
                helperText={touched.house && errors.house}
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
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl sx={{ gridColumn: "span 2" }}>
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
                  <MenuItem value="Male" label="Male">
                    Male
                  </MenuItem>
                  <MenuItem value="Female" label="Female">
                    Female
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
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />

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
                  value={values.userRole}
                  name="userRole"
                  error={!!touched.userRole && !!errors.userRole}
                  helperText={touched.userRole && errors.userRole}
                >
                  <MenuItem value="Admin" label="Select role">
                    Admin
                  </MenuItem>
                  <MenuItem value="Craftsman" label="Select role">
                    Craftsman
                  </MenuItem>
                  <MenuItem value="Customer" label="Select role">
                    Customer
                  </MenuItem>
                </Select>
              </FormControl>

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
              <Button
                type="submit"
                id="createUserBtn"
                color="secondary"
                variant="contained"
              >
                Create User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserCreateForm;
