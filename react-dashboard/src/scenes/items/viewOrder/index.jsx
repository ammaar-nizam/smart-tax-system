import React, { useEffect } from "react";

const ViewOrder = () => {
  // change title
  useEffect(() => {
    document.title = "View Orders | SMART TAX";
  });

  return <div>ViewOrder</div>;
};

export default ViewOrder;
