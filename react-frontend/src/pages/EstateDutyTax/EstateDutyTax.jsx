import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { calculateEstateDutyTax } from "./CalculateEstateDutyTax.js";
import { formatDate } from "../../utils/dateUtils.js";
import jsPDF from "jspdf";
import { format } from "date-fns";

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
  const [formData, setFormData] = useState(null);
  const [isCalculationDone, setIsCalculationDone] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // For navigation

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

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

  const onSubmit = async (data) => {
    try {
      const formattedDOB = formatDate(data.dob);
      const formattedEffectiveDate = formatDate(data.effectiveDate);
      // Get the current date
      const currentDate = formatDate(new Date().toISOString());
      // Calculate the deadline date (14 days from the current date)
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + 14);
      const formattedDeadlineDate = formatDate(deadlineDate.toISOString());
      const formData = {
        purchaser: {
          purchaserNIC: data.purchaserNIC,
          purchaserName: data.purchaserName,
          purchaserAddress: data.purchaserAddress,
          dob: formattedDOB,
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
          agentId: id,
        },
        purchaseTransaction: {
          propertyAddress: data.propertyAddress,
          type: data.type,
          consideration: data.consideration,
          effectiveDate: formattedEffectiveDate,
          vendorName: data.vendorName,
          vendorNIC: data.vendorNIC,
          vendorAgentName: data.vendorAgentName,
          vendorAgentAddress: data.vendorAgentAddress,
          purchaserId: 0,
        },
        edtReturn: {
          type: "EDT",
          taxDue: 0,
          submitDate: currentDate,
          deadlineDate: formattedDeadlineDate,
          status: "FILED",
          agentId: id,
          transactionId: 0,
        },
      };

      setFormData(formData);
      // Calculate tax using the provided function
      const taxResult = calculateEstateDutyTax(
        formData.purchaser,
        formData.purchaseTransaction
      );
      // Set the tax result in state
      setTaxResult(taxResult);
      setIsCalculationDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinalSubmit = async () => {
    setLoading(true);
    try {
      const purchaserResponse = await axios.post(
        "https://smart-tax-api.vercel.app/api/purchasers/create",
        formData.purchaser
      );
    } catch (error) {
      console.log(error);
    } finally {
      try {
        const retrievedPurchaserId = await axios.get(
          `https://smart-tax-api.vercel.app/api/purchasers/nic?purchaserNIC=${formData.purchaser.purchaserNIC}`
        );
        formData.purchaseTransaction.purchaserId = retrievedPurchaserId.data.id;
        const purchaseTransactionResponse = await axios.post(
          "https://smart-tax-api.vercel.app/api/purchase-transactions/create",
          formData.purchaseTransaction
        );
      } catch (error) {
        console.log(error);
      } finally {
        try {
          const retrievedPurchaseTransactionId = await axios.get(
            `https://smart-tax-api.vercel.app/api/purchase-transactions/transaction?propertyAddress=${formData.purchaseTransaction.propertyAddress}&vendorNIC=${formData.purchaseTransaction.vendorNIC}`
          );
          formData.edtReturn.transactionId =
            retrievedPurchaseTransactionId.data.purchaseTransactionId;
          formData.edtReturn.taxDue = taxResult.totalTax;
          // Call API to create an EDT return
          const edtReturnResponse = await axios.post(
            "https://smart-tax-api.vercel.app/api/edt-returns/create",
            formData.edtReturn
          );

          // Extract the submitDate and deadlineDate from the response
          const { submitDate, deadlineDate } = edtReturnResponse.data.edtReturn;

          // Format the dates
          const formattedSubmitDate = format(
            new Date(submitDate),
            "yyyy-MM-dd"
          );
          const formattedDeadlineDate = format(
            new Date(deadlineDate),
            "yyyy-MM-dd"
          );

          // Update the formData with the formatted dates
          formData.edtReturn.submitDate = formattedSubmitDate;
          formData.edtReturn.deadlineDate = formattedDeadlineDate;

          const edtReturnId = edtReturnResponse.data.edtReturn.id;

          // Generate PDF with EDT return details
          generatePDF(edtReturnId);
          alert("Tax return submitted successfully!");
          setFormData({
            ...formData,
            purchaser: null,
            purchaseTransaction: null,
            edtReturn: null,
          });
          setIsCalculationDone(false);
          navigate("/services");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // Function to generate PDF with EDT return details
  const generatePDF = (edtReturnId) => {
    const doc = new jsPDF();

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    // Add content to PDF
    doc.text("Estate Duty Tax Return Details", 10, 10);
    doc.text("\n", 10, 20);
    doc.text(`Unique Return ID: ${edtReturnId}`, 10, 30);
    doc.text(`Return Type: ${formData.edtReturn.type}`, 10, 40);
    doc.text(`Tax Due: ${formData.edtReturn.taxDue}`, 10, 50);
    doc.text(`Submit Date: ${formData.edtReturn.submitDate}`, 10, 60);
    doc.text(`Deadline Date: ${formData.edtReturn.deadlineDate}`, 10, 70);
    doc.text(`Agent Name: ${agentName}`, 10, 80);
    doc.text(`Agent Email: ${agentEmail}`, 10, 90);
    doc.text("\n", 10, 100);
    doc.text("\n", 10, 110);
    doc.setTextColor(255, 0, 0);
    doc.text(
      "Please search with the Unique Return ID when making the payment",
      10,
      120
    );
    // Save PDF
    doc.save("EDT_Return.pdf");
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
                <input {...register("propertyAddress")} type="text" />
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
                <select {...register("type")} type="text" defaultValue="">
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
                <input {...register("consideration")} type="text" />
                {errors.consideration && (
                  <div className="error-message">
                    {errors.consideration.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Effective Date:</label>
                <input {...register("effectiveDate")} type="date" />
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
                <input {...register("purchaserName")} type="text" />
                {errors.purchaserName && (
                  <div className="error-message">
                    {errors.purchaserName.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Purchaser NIC Number:</label>
                <input {...register("purchaserNIC")} type="text" />
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
                <input {...register("purchaserAddress")} type="text" />
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
                <select {...register("isFirstProperty")} defaultValue="">
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
                <select {...register("isCompany")} defaultValue="">
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
                <select {...register("isSriLankanResident")} defaultValue="">
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
                <input {...register("dob")} type="date" />
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
                  readOnly
                />
              </div>
              <div className="form-field">
                <label>Purchaser Agent Email:</label>
                <input
                  {...register("purchaserAgentEmail")}
                  defaultValue={agentEmail}
                  type="text"
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
                  readOnly
                />
              </div>
            </div>
            {/* Nineth row */}

            <div className="form-row">
              <div className="form-field">
                <label>Seller Name:</label>
                <input {...register("vendorName")} type="text" />
                {errors.vendorName && (
                  <div className="error-message">
                    {errors.vendorName.message}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label>Seller NIC Number:</label>
                <input {...register("vendorNIC")} type="text" />
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
                <input {...register("vendorAgentName")} type="text" />
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
                <input {...register("vendorAgentAddress")} type="text" />
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

            {loading && <p>Loading...</p>}
            {/* Buttons */}
            <div className="form-row button-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? "Calculating..." : "Calculate EDT"}
              </button>
              <button
                onClick={onFinalSubmit}
                disabled={!isCalculationDone || isSubmitting}
                className="submit-button"
              >
                Submit EDT Return
              </button>
            </div>

            {errors.root && <div>{errors.root.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default EstateDutyTax;
