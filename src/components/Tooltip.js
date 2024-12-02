import React, { useState } from "react";
import './Tooltip.css';

const Tooltip = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="question-mark">?</div>
      {isHovered && (
        <div className="tooltip-text" dangerouslySetInnerHTML={{ __html: text }}></div>
      )}
    </div>
  );
};


export default Tooltip;
