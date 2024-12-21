import React from "react";
import './Topbar.css'
const Topbar = ({topbarScrollY}) => {
  return (
    <div className={`topbar-container ${topbarScrollY>60?'fixed':''}`}>
      HarmonyOS
      </div>
  );
};
export default Topbar;