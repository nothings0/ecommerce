import React from "react";
import "./index.scss";
const Loading = () => {
  return (
    <div className="loading main">
      <div className="lds-ripple">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
