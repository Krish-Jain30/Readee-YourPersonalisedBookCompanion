import React from "react";

const links = {
  read: [
    { name: "Open Library", url: "https://openlibrary.org" },
    { name: "Google Books", url: "https://books.google.com" },
    { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
  ],
  rent: [
    { name: "Internet Archive", url: "https://archive.org" },
    { name: "BookLender", url: "https://www.booklender.com" },
  ],
  buy: [
    { name: "Amazon", url: "https://www.amazon.com" },
    { name: "Barnes & Noble", url: "https://www.barnesandnoble.com" },
    { name: "Books-A-Million", url: "https://www.booksamillion.com" },
  ],
};

const WhereToRead = () => (
  <div className="w-full mt-12 mb-8">
    <h3 className="text-2xl font-semibold mb-4 text-[#FEF1E1]">Where to Read</h3>

    {["read", "rent", "buy"].map((type) => (
      <div key={type} className="mb-6">
        <h4 className="text-lg font-semibold mb-2 capitalize text-[#FC350B]">{type}</h4>
        <div className="flex flex-wrap gap-3">
          {links[type].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a2a2a] hover:bg-[#FC350B] text-[#FEF1E1] border border-[#FC350B] px-4 py-2 rounded transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default WhereToRead;
