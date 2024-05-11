import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Outlet } from "react-router-dom";

const schema = z.object({
  propertyAddress: z
    .string()
    .nonempty({ message: "Property Address cannot be empty." }),
  propertyType: z.string().nonempty(),
  consideration: z.string(),
  effectiveDate: z.string().nonempty(),
  receiverName: z.string().nonempty(),
  receiverNIC: z.string().regex(/^(?:\d{9}[Vv])$|^(?:\d{12})$/),
  receiverAddress: z.string().nonempty(),
  dob: z.string().nonempty(),
  isFirstProperty: z.boolean(),
  isSriLankanResident: z.boolean(),
  isCompany: z.boolean(),
  receiverAgentName: z.string().nonempty(),
  receiverAgentAddress: z.string().nonempty(),
  receiverAgentEmail: z.string().email(),
  giverName: z.string().nonempty(),
  giverNIC: z.string().regex(/^(?:\d{9}[Vv])$|^(?:\d{12})$/),
});

const GiftTax = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Your form submission logic goes here
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "An error occurred while submitting the form",
      });
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
                <select {...register("propertyType")} defaultValue="">
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
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setValue("consideration", value || ""); // If value is NaN, set it to an empty string
                  }}
                />
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
                <label>Receiver Name:</label>
                <input {...register("receiverName")} type="text" />
                {errors.receiverName && (
                  <div className="error-message">
                    {errors.receiverName.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Receiver NIC Number:</label>
                <input {...register("receiverNIC")} type="text" />
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
                <input {...register("receiverAddress")} type="text" />
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
                <label>Receiver a Company?:</label>
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
                <label>Receiver Date of Birth:</label>
                <input {...register("dob")} type="date" />
                {errors.dob && (
                  <div className="error-message">{errors.dob.message}</div>
                )}
              </div>
            </div>
            {/* Seventh row */}
            <div className="form-row">
              <div className="form-field">
                <label>Receiver Agent Name:</label>
                <input {...register("receiverAgentName")} type="text" />
                {errors.receiverAgentName && (
                  <div className="error-message">
                    {errors.receiverAgentName.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Receiver Agent Email:</label>
                <input {...register("receiverAgentEmail")} type="text" />
                {errors.receiverAgentEmail && (
                  <div className="error-message">
                    {errors.receiverAgentEmail.message}
                  </div>
                )}
              </div>
            </div>
            {/* Eigth row */}
            <div className="form-row">
              <div className="form-field">
                <label>Receiver Agent Address:</label>
                <input {...register("receiverAgentAddress")} type="text" />
                {errors.receiverAgentAddress && (
                  <div className="error-message">
                    {errors.receiverAgentAddress.message}
                  </div>
                )}
              </div>
            </div>
            {/* Nineth row */}

            <div className="form-row">
              <div className="form-field">
                <label>Giver Name:</label>
                <input {...register("giverName")} type="text" />
                {errors.giverName && (
                  <div className="error-message">
                    {errors.giverName.message}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label>Giver NIC Number:</label>
                <input {...register("giverNIC")} type="text" />
                {errors.giverNIC && (
                  <div className="error-message">
                    {errors.giverNIC.message}
                  </div>
                )}
              </div>
            </div>
            

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Submitting..." : "File Return"}
            </button>
            {errors.root && <div>{errors.root.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default GiftTax;
