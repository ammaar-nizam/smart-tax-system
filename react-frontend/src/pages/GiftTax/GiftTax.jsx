import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { calculateGiftTax } from "./CalculateGiftTax.js";
import { formatDate } from "../../utils/dateUtils.js";

const schema = yup.object({
  receiverNIC: yup
    .string()
    .required("Required Field")
    .matches(/^(?:\d{9}[Vv])$|^(?:\d{12})$/, "Invalid NIC format"),
  receiverName: yup.string().required("Required Field"),
  receiverAddress: yup.string().required("Required Field"),
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
  giverName: yup.string().required("Required Field"),
  giverNIC: yup
    .string()
    .required("Required Field")
    .matches(/^(?:\d{9}[Vv])$|^(?:\d{12})$/, "Invalid Vendor NIC format"),
});

const GiftTax = () => {
  const [id, setId] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentAddress, setAgentAddress] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [taxResult, setTaxResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showCalculateButton, setShowCalculateButton] = useState(true);
  const [confirmationClicked, setConfirmationClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setAccessToken(accessToken);
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
        receiver: {
          receiverNIC: data.receiverNIC,
          receiverName: data.receiverName,
          receiverAddress: data.receiverAddress,
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
        giftTransaction: {
          propertyAddress: data.propertyAddress,
          type: data.type,
          consideration: data.consideration,
          effectiveDate: formattedEffectiveDate,
          giverName: data.giverName,
          giverNIC: data.giverNIC,
          receiverId: 0,
        },
        giftReturn: {
          type: "GIFT",
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
      const taxResult = calculateGiftTax(
        formData.receiver,
        formData.giftTransaction
      );

      console.log(formData.giftTransaction.consideration);
      // Set the tax result in state
      setTaxResult(taxResult);
      setShowConfirmButton(true);
      setShowCalculateButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirm = () => {
    setShowConfirmButton(false);
    setShowSubmitButton(true);
    setConfirmationClicked(true);
  };

  const onFinalSubmit = async () => {
    try {
      const receiverResponse = await axios.post(
        "http://localhost:8000/api/receivers/create",
        formData.receiver,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      try {
        const retrievedGiftTransactionId = await axios.get(
          `http://localhost:8000/api/receivers/nic?receiverNIC=${formData.receiver.receiverNIC}`
        );
        formData.giftTransaction.receiverId = retrievedGiftTransactionId.data.id;
        const giftTransactionResponse = await axios.post(
          "http://localhost:8000/api/gift-transactions/create",
          formData.giftTransaction
        );
      } catch (error) {
        console.log(error);
      } finally {
        try {
          const retrievedGiftTransactionId = await axios.get(
            `http://localhost:8000/api/gift-transactions/transaction?propertyAddress=${formData.giftTransaction.propertyAddress}&giverNIC=${formData.giftTransaction.giverNIC}`
          );
          console.log(retrievedGiftTransactionId.data.id);
          formData.giftReturn.transactionId =
            retrievedGiftTransactionId.data.giftTransactionId;
          formData.giftReturn.taxDue = taxResult.totalTax;
          // Call API to create a Gift return
          const giftReturnResponse = await axios.post(
            "http://localhost:8000/api/gift-returns/create",
            formData.giftReturn
          );
          alert("Tax return submitted successfully!");
          setFormData({
            ...formData,
            receiver: null,
          });
          setFormData({
            ...formData,
            giftTransaction: null,
          });
          setFormData({
            ...formData,
            giftReturn: null,
          });
          setShowSubmitButton(false);
          setShowConfirmButton(false);
          setShowCalculateButton(true);

          setConfirmationClicked(true);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <div>
        <Outlet />
        <h2 style={{ textAlign: "center" }}>Gift Tax Return Filing</h2>
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
                <select
                  {...register("propertyType")}
                  defaultValue=""
                  type="type"
                  disabled={confirmationClicked}
                >
                  <option value="">Select</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="multiDwelling">Multi-Dwelling</option>
                </select>
                {errors.propertyType && (
                  <div className="error-message">
                    {errors.propertyType.message}
                  </div>
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
                <input
                  {...register("effectiveDate")}
                  type="date"
                  disabled={confirmationClicked}
                />
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
                <label>Receiver Name:</label>
                <input
                  {...register("receiverName")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.receiverName && (
                  <div className="error-message">
                    {errors.receiverName.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Receiver NIC Number:</label>
                <input
                  {...register("receiverNIC")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.receiverNIC && (
                  <div className="error-message">
                    {errors.receiverNIC.message}
                  </div>
                )}
              </div>
            </div>
            {/* Fourth row */}
            <div className="form-row">
              <div className="form-field">
                <label>Receiver Address:</label>
                <input
                  {...register("receiverAddress")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.receiverAddress && (
                  <div className="error-message">
                    {errors.receiverAddress.message}
                  </div>
                )}
              </div>
            </div>
            {/* Fifth row */}
            <div className="form-row">
              <div className="form-field">
                <label>First Time Buyer?:</label>
                <select
                  {...register("isFirstProperty")}
                  defaultValue=""
                  type="text"
                  disabled={confirmationClicked}
                >
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
                <label>Receiver a Company?:</label>
                <select
                  {...register("isCompany")}
                  defaultValue=""
                  type="text"
                  disabled={confirmationClicked}
                >
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
                <select
                  {...register("isSriLankanResident")}
                  defaultValue=""
                  type="text"
                  disabled={confirmationClicked}
                >
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
                <label>Receiver Date of Birth:</label>
                <input
                  {...register("dob")}
                  type="date"
                  disabled={confirmationClicked}
                />
                {errors.dob && (
                  <div className="error-message">{errors.dob.message}</div>
                )}
              </div>
            </div>
            {/* Seventh row */}
            <div className="form-row">
              <div className="form-field">
                <label>Receiver Agent Name:</label>
                <input
                  {...register("receiverAgentName")}
                  defaultValue={agentName}
                  type="text"
                  disabled={confirmationClicked}
                  readOnly
                />
              </div>
              <div className="form-field">
                <label>Receiver Agent Email:</label>
                <input
                  {...register("receiverAgentEmail")}
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
                <label>Receiver Agent Address:</label>
                <input
                  {...register("receiverAgentAddress")}
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
                <label>Giver Name:</label>
                <input
                  {...register("giverName")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.giverName && (
                  <div className="error-message">
                    {errors.giverName.message}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label>Giver NIC Number:</label>
                <input
                  {...register("giverNIC")}
                  type="text"
                  disabled={confirmationClicked}
                />
                {errors.giverNIC && (
                  <div className="error-message">{errors.giverNIC.message}</div>
                )}
              </div>
            </div>

            {taxResult && (
              <div>
                <h3>Calculated Tax Details</h3>
                <p>Gift Tax Due: {taxResult.tax}</p>
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
                {isSubmitting ? "Calculating..." : "Calculate Gift Tax"}
              </button>
            )}
            {errors.root && <div>{errors.root.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default GiftTax;
