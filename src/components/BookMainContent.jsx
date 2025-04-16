import React from "react";

const BookMainContent = ({ title, author, description, subjects }) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-lg mb-2 italic">by {author}</p>
      <p className="mb-6 text-md text-[#fef1e1c5] leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {subjects?.slice(0, 10).map((subj, i) => (
          <span
            key={i}
            className="bg-[#FC350B] text-[#FEF1E1] text-sm px-3 py-1 rounded-full"
          >
            {subj}
          </span>
        ))}
      </div>
    </>
  );
};

export default BookMainContent;
