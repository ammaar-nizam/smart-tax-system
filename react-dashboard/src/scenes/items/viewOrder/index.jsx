import React, { useEffect } from "react";

const ViewOrder = () => {
  // change title
  useEffect(() => {
    document.title = "View Orders | ARTIMART";
  });

  return <div>ViewOrder</div>;
};

export default ViewOrder;
