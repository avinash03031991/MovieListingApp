import React from "react";
import "./css/SortMenu.css";

const SortMenu = ({ onSort }) => {
  return (
    <div className="sort-menu">
      <label className="sort-label">Sort by:</label>
      <select
        id="sort-options"
        className="sort-select"
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="episode">Episode</option>
        <option value="year">Year</option>
      </select>
    </div>
  );
};

export default SortMenu;
