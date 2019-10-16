import React from "react";

const View = () => (
  <div
    className="text-center bg-light h-100 d-flex flex-column justify-content-center p-4 text-blue"
    style={{ borderRadius: 10 }}
  >
    <i className="fas fa-spinner fa-pulse fa-3x" />
    <div className="m-3" style={{ fontSize: "1.5rem" }}>
      Verifying Certificate...
    </div>
  </div>
);

export default View;
