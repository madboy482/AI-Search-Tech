import React from "react";
import "./GridCell.css"; // Create CSS for GridCell

const GridCell = ({ type }) => {
  // Define background colors based on cell type
  const getColor = () => {
    switch (type) {
      case "start":
        return "#28a745"; // green
      case "end":
        return "#dc3545"; // red
      case "wall":
        return "#343a40"; // dark (blackish)
      case "visited":
        return "#ffc107"; // yellow
      case "path":
        return "#007bff"; // blue
      default:
        return "#fff"; // white
    }
  };

  return <div className="grid-cell" style={{ backgroundColor: getColor() }}></div>;
};

export default GridCell;