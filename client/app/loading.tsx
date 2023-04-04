import React from "react";
import "./loading.scss";
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
