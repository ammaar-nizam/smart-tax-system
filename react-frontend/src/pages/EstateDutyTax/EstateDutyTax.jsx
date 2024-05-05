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
  consideration: z.number(),
  effectiveDate: z.string().nonempty(),
  purchaserName: z.string().nonempty(),
  purchaserNIC: z.string().regex(/^(?:\d{9}[Vv])$|^(?:\d{12})$/),
  purchaserAddress: z.string().nonempty(),
  dob: z.string().nonempty(),
  isFirstProperty: z.boolean(),
  isSriLankanResident: z.boolean(),
  isCompany: z.boolean(),
  purchaserAgentName: z.string().nonempty(),
  purchaserAgentAddress: z.string().nonempty(),
  purchaserAgentEmail: z.string().email(),
  vendorName: z.string().nonempty(),
  vendorNIC: z.string().regex(/^(?:\d{9}[Vv])$|^(?:\d{12})$/),
  vendorAgentName: z.string().nonempty(),
  vendorAgentAddress: z.string().nonempty(),
});

const EstateDutyTax = () => {
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
                  type="number"
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
                <input {...register("purchaserAgentName")} type="text" />
                {errors.purchaserAgentName && (
                  <div className="error-message">
                    {errors.purchaserAgentName.message}
                  </div>
                )}
              </div>
              <div className="form-field">
                <label>Purchaser Agent Email:</label>
                <input {...register("purchaserAgentEmail")} type="text" />
                {errors.purchaserAgentEmail && (
                  <div className="error-message">
                    {errors.purchaserAgentEmail.message}
                  </div>
                )}
              </div>
            </div>
            {/* Eigth row */}
            <div className="form-row">
              <div className="form-field">
                <label>Purchaser Agent Address:</label>
                <input {...register("purchaserAgentAddress")} type="text" />
                {errors.purchaserAgentAddress && (
                  <div className="error-message">
                    {errors.purchaserAgentAddress.message}
                  </div>
                )}
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

export default EstateDutyTax;
