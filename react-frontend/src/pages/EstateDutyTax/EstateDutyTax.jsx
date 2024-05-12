import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { calculateEstateDutyTax } from "./CalculateEstateDutyTax.js";

const schema = yup.object({
  purchaserNIC: yup
    .string()
    .required("Required Field")
    .matches(/^(?:\d{9}[Vv])$|^(?:\d{12})$/, "Invalid NIC format"),
  purchaserName: yup.string().required("Required Field"),
  purchaserAddress: yup.string().required("Required Field"),
  dob: yup.date().required("Required Field"),
  isFirstProperty: yup.string().required("Required Field"),
  isSriLankanResident: yup.string().required("Required Field"),
  isCompany: yup.string().required("Required Field"),
  propertyAddress: yup.string().required("Required Field"),
  type: yup.string().required("Required Field"),
  consideration: yup
    .number()
    .required("Required Field")
    .positive("Consideration must be a positive value"),
  effectiveDate: yup.date().required("Required Field"),
  vendorName: yup.string().required("Required Field"),
  vendorNIC: yup
    .string()
    .required("Required Field")
    .matches(/^(?:\d{9}[Vv])$|^(?:\d{12})$/, "Invalid Vendor NIC format"),
  vendorAgentName: yup.string().required("Required Field"),
  vendorAgentAddress: yup.string().required("Required Field"),
});

const EstateDutyTax = () => {
  const [id, setId] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentAddress, setAgentAddress] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [taxResult, setTaxResult] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showCalculateButton, setShowCalculateButton] = useState(true);
  const [confirmationClicked, setConfirmationClicked] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setAccessToken(accessToken);
      // Decode the access token to extract the agent's details
      const decodedToken = jwtDecode(accessToken);
      setId(decodedToken.id);
      setAgentName(decodedToken.agentName);
      setAgentEmail(decodedToken.agentEmail);
      setAgentAddress(decodedToken.agentAddress);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        isCompany:
          data.isCompany === "true"
            ? true
            : data.isCompany === "false"
            ? false
            : data.isCompany,
        isSriLankanResident:
          data.isSriLankanResident === "true"
            ? true
            : data.isSriLankanResident === "false"
            ? false
            : data.isSriLankanResident,
        isFirstProperty:
          data.isFirstProperty === "true"
            ? true
            : data.isFirstProperty === "false"
            ? false
            : data.isFirstProperty,
        purchaserAgentName: agentName,
        purchaserAgentEmail: agentEmail,
        purchaserAgentAddress: agentAddress,
        id: id,
        purchaserId: "Purchaser ID comes here after an API call",
      };

      console.log(formData);

      // Calculate tax using the provided function
      const taxResult = calculateEstateDutyTax(formData);

      // Set the tax result in state
      setTaxResult(taxResult);
      setShowConfirmButton(true);
      setShowCalculateButton(false);
      console.log(taxResult);
    } catch (error) {
      setError("root", {
        message: "An error occurred while submitting the form",
      });
    }
  };

  const onConfirm = () => {
    setShowConfirmButton(false);
    setShowSubmitButton(true);
    setConfirmationClicked(true);
  };

  const onFinalSubmit = () => {
    // Perform the API call to insert data into tables in the database
    // Here, you can send the taxResult along with other form data to the API
    console.log("Final submit");
  };

  return (
    <>
      <div>
        <Outlet />
        <h2 style={{ textAlign: "center" }}>Estate Duty Tax Return Filing</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First row */}
            <div className="form-row">
              <div className="form-field">
                <label>Property Address:</label>
                <input
                  {...register("propertyAddress")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.propertyAddress && (
                  <div className="error-message">
                    {errors.propertyAddress.message}
                  </div>
                )}
              </div>
            </div>

            {/* Second row */}
            <div className="form-row">
              <div className="form-field">
                <label>Type of Property:</label>
                <select {...register("type")} defaultValue="" disabled={confirmationClicked}>
                  <option value="">Select</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="multiDwelling">Multi-Dwelling</option>
                </select>
                {errors.type && (
                  <div className="error-message">{errors.type.message}</div>
                )}
              </div>
              <div className="form-field">
                <label>Consideration:</label>
                <input
                  {...register("consideration")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.consideration && (
                  <div className="error-message">
                    {errors.consideration.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Effective Date:</label>
                <input {...register("effectiveDate")} type="date" disabled={confirmationClicked}/>
                {errors.effectiveDate && (
                  <div className="error-message">
                    {errors.effectiveDate.message}
                  </div>
                )}
              </div>
            </div>

            {/* Third row */}
            <div className="form-row">
              <div className="form-field">
                <label>Purchaser Name:</label>
                <input
                  {...register("purchaserName")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.purchaserName && (
                  <div className="error-message">
                    {errors.purchaserName.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Purchaser NIC Number:</label>
                <input
                  {...register("purchaserNIC")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.purchaserNIC && (
                  <div className="error-message">
                    {errors.purchaserNIC.message}
                  </div>
                )}
              </div>
            </div>
            {/* Fourth row */}
            <div className="form-row">
              <div className="form-field">
                <label>Purchaser Address:</label>
                <input
                  {...register("purchaserAddress")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.purchaserAddress && (
                  <div className="error-message">
                    {errors.purchaserAddress.message}
                  </div>
                )}
              </div>
            </div>
            {/* Fifth row */}
            <div className="form-row">
              <div className="form-field">
                <label>First Time Buyer?:</label>
                <select {...register("isFirstProperty")} defaultValue="" disabled={confirmationClicked}>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.isFirstProperty && (
                  <div className="error-message">
                    {errors.isFirstProperty.message}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label>Purchaser a Company?:</label>
                <select {...register("isCompany")} defaultValue="" disabled={confirmationClicked}>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.isCompany && (
                  <div className="error-message">
                    {errors.isCompany.message}
                  </div>
                )}
              </div>
            </div>
            {/* Sixth row */}
            <div className="form-row">
              <div className="form-field">
                <label>Sri Lankan Resident?:</label>
                <select {...register("isSriLankanResident")} defaultValue="" disabled={confirmationClicked}>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.isSriLankanResident && (
                  <div className="error-message">
                    {errors.isSriLankanResident.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Purchaser Date of Birth:</label>
                <input {...register("dob")} type="date" disabled={confirmationClicked}/>
                {errors.dob && (
                  <div className="error-message">{errors.dob.message}</div>
                )}
              </div>
            </div>
            {/* Seventh row */}
            <div className="form-row">
              <div className="form-field">
                <label>Purchaser Agent Name:</label>
                <input
                  {...register("purchaserAgentName")}
                  defaultValue={agentName}
                  type="text"
                  disabled={confirmationClicked}
                  readOnly
                />
              </div>
              <div className="form-field">
                <label>Purchaser Agent Email:</label>
                <input
                  {...register("purchaserAgentEmail")}
                  defaultValue={agentEmail}
                  type="text"
                  disabled={confirmationClicked}
                  readOnly
                />
              </div>
            </div>
            {/* Eigth row */}
            <div className="form-row">
              <div className="form-field">
                <label>Purchaser Agent Address:</label>
                <input
                  {...register("purchaserAgentAddress")}
                  defaultValue={agentAddress}
                  type="text"
                  disabled={confirmationClicked}
                  readOnly
                />
              </div>
            </div>
            {/* Nineth row */}

            <div className="form-row">
              <div className="form-field">
                <label>Seller Name:</label>
                <input
                  {...register("vendorName")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.vendorName && (
                  <div className="error-message">
                    {errors.vendorName.message}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label>Seller NIC Number:</label>
                <input
                  {...register("vendorNIC")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.vendorNIC && (
                  <div className="error-message">
                    {errors.vendorNIC.message}
                  </div>
                )}
              </div>
            </div>
            {/* Tenth row */}
            <div className="form-row">
              <div className="form-field">
                <label>Seller Agent Name:</label>
                <input
                  {...register("vendorAgentName")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.vendorAgentName && (
                  <div className="error-message">
                    {errors.vendorAgentName.message}
                  </div>
                )}
              </div>
            </div>

            {/* Eleventh row */}
            <div className="form-row">
              <div className="form-field">
                <label>Seller Agent Address:</label>
                <input
                  {...register("vendorAgentAddress")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.vendorAgentAddress && (
                  <div className="error-message">
                    {errors.vendorAgentAddress.message}
                  </div>
                )}
              </div>
            </div>

            {taxResult && (
              <div>
                <h3>Calculated Tax Details</h3>
                <p>Estate Duty Tax Due: {taxResult.tax}</p>
                <p>Penalty Charged: {taxResult.penalty}</p>
                <p>Total Tax Due: {taxResult.totalTax}</p>
              </div>
            )}

            {showConfirmButton && (
              <button className="submit-button" onClick={onConfirm}>
                Confirm Calculation
              </button>
            )}

            {showSubmitButton && (
              <button className="submit-button" onClick={onFinalSubmit}>
                Submit Tax Return
              </button>
            )}

            {showCalculateButton && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? "Calculating..." : "Calculate EDT"}
              </button>
            )}

            {errors.root && <div>{errors.root.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default EstateDutyTax;
