import React from "react";
import './Topbar.scss'
const Topbar = ({topbarScrollY}) => {
  return (
    <div className="topbar-container">
    <div className={`topbar ${topbarScrollY>60?'fixed':''}`}>
        HarmonyOS
        </div>
      </div>
  );
};
export default Topbar;