import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import "./Services.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1565C0",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontFamily: "Dosis",
  fontSize: "20px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "120px",
}));

const Services = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Retrieve the access token from the cookie
    const storedAccessToken = Cookies.get("access_token");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Box sx={{ width: "80%" }}>
        <h2>Our Services</h2>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            {accessToken ? (
              <Grid xs={6}>
                <Item component={Link} to="/estate-duty-tax">
                  Estate Duty Tax Return Filing
                </Item>
              </Grid>
            ) : (
              <Grid xs={6}>
                <Item
                  style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Estate Duty Tax Return Filing (Sign in to use this service)
                </Item>
              </Grid>
            )}
          </Grid>
          <Grid xs={6}>
            {accessToken ? (
              <Grid xs={6}>
                <Item component={Link} to="/gift-tax">
                  Gift Tax Return Filing
                </Item>
              </Grid>
            ) : (
              <Grid xs={6}>
                <Item
                  style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Gift Tax Return Filing (Sign in to use this service)
                </Item>
              </Grid>
            )}
          </Grid>

          <Grid xs={6}>
            {accessToken ? (
              <Grid xs={6}>
                <Item component={Link} to="/inheritance-tax">
                  Inheritance Tax Return Filing
                </Item>
              </Grid>
            ) : (
              <Grid xs={6}>
                <Item
                  style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Inheritance Tax Return Filing (Sign in to use this service)
                </Item>
              </Grid>
            )}
          </Grid>
          <Grid xs={6}>
            {accessToken ? (
              <Grid xs={6}>
                <Item component={Link} to="/payment-form">
                  Easy Tax Payment
                </Item>
              </Grid>
            ) : (
              <Grid xs={6}>
                <Item
                  style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Easy Tax Payment (Sign in to use this service)
                </Item>
              </Grid>
            )}
          </Grid>
          <Grid xs={6}>
            {accessToken ? (
              <Grid xs={6}>
                <Item
                  component={Link}
                  to="/under-development"
                >
                  Search Property Ownership Information
                </Item>
              </Grid>
            ) : (
              <Grid xs={6}>
                <Item
                  style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Search Property Ownership Information (Sign in to use this
                  service)
                </Item>
              </Grid>
            )}
          </Grid>
          <Grid xs={6}>
            {accessToken ? (
              <Grid xs={6}>
                <Item
                  component={Link}
                  to="/under-development"
                >
                  Gift and Inheritance Related Document Records
                </Item>
              </Grid>
            ) : (
              <Grid xs={6}>
                <Item
                  style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Gift and Inheritance Related Document Records (Sign in to use
                  this service)
                </Item>
              </Grid>
            )}
          </Grid>

          <Grid xs={6}>
            <Item component={Link} to="/under-development">
              Search House Prices
            </Item>
          </Grid>

          <Grid xs={6}>
            <Item component={Link} to="/under-development">
              Value Assessment
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item component={Link} to="/read-educational-resources">
              Read Educational Resources
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item component={Link} to="https://www.rgd.gov.lk/">
              Take Me to Land Registry
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Services;
