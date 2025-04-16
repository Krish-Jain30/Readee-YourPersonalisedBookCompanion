import React from "react";

const BookCoverInfo = ({ book, genres, publishedYear, rating }) => {
  return (
    <div className="flex flex-col md:flex-col items-center md:items-start gap-4 w-full md:w-[350px]">
      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-[#2a2a2a]">
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
          alt={book.title}
          className="w-full h-[500px] object-cover object-top rounded-t-xl"
        />
      </div>
      <div className="w-full text-sm text-[#fef1e1d2] space-y-2 bg-[#2a2a2a] p-4 rounded-xl border-2 border-[#FC350B] shadow-sm">
        <div>
          <span className="font-semibold text-[#FEF1E1] uppercase">{genres}</span>
        </div>
        <div>
          <span className="font-semibold text-[#FEF1E1] uppercase">{publishedYear}</span>
        </div>
        <div>
          <span className="font-semibold text-[#FEF1E1]">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCoverInfo;
