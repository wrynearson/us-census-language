// Tooltip Component
import React, { useState } from "react";

function Tooltip({ info }) {
  if (!info.object) {
    return null;
  }

  // Style for the tooltip container
  const style = {
    position: "absolute",
    margin: "8px",
    padding: "4px",
    background: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    zIndex: 9,
    pointerEvents: "none",
    fontSize: "14px",
    borderRadius: "4px",
    left: info.x,
    top: info.y,
  };

  return (
    <div style={style}>
      {info.object.properties.language_name}{" "}
      {/* Assuming 'language' is the property you want to display */}
    </div>
  );
}

export default Tooltip;
