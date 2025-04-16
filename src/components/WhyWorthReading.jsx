import React from "react";

const WhyWorthReading = ({ aiReason }) => (
  <div className="bg-[#2a2a2a] p-6 rounded-xl mb-8 border border-[#FC350B] shadow-sm">
    <h3 className="text-xl font-semibold mb-3 text-[#FEF1E1]">Why it's worth reading?</h3>
    <p className="text-md text-[#fef1e1c5] leading-relaxed">{aiReason}</p>
  </div>
);

export default WhyWorthReading;
