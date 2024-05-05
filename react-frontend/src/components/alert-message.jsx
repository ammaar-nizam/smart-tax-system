import React from "react";

export const ErrorMessage = ({ message }) => {
  return (
    <div className="alert alert-danger py-2" role="alert">
      {message}
    </div>
  );
};

export const SuccessMessage = ({ message }) => {
  return (
    <div className="alert alert-success py-2" role="alert">
      {message}
    </div>
  );
};

export const WarningMessage = ({ message }) => {
  return (
    <div className="alert alert-warning py-2" role="alert">
      {message}
    </div>
  );
};

export const InfoMessage = ({ message }) => {
  return (
    <div className="alert alert-info py-2" role="alert">
      {message}
    </div>
  );
};
