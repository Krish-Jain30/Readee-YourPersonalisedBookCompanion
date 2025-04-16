import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useParams } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi"; // ✅ using react-icons

const randomSubjects = [
  "fantasy",
  "romance",
  "mystery",
  "science_fiction",
  "thriller",
  "historical_fiction",
  "adventure",
  "horror",
  "children",
  "young_adult",
];

const getRandomSubject = () =>
  randomSubjects[Math.floor(Math.random() * randomSubjects.length)];

const YouCanAlsoRead = () => {
  const [randomBooks, setRandomBooks] = useState([]);
  const { id } = useParams();

  const fetchRandomBooks = async () => {
    try {
      const subject = getRandomSubject();
      const res = await fetch(
        `https://openlibrary.org/subjects/${subject}.json?limit=15`
      );
      const data = await res.json();

      if (!data?.works?.length) return;

      const mapped = data.works
        .filter((book) => book.cover_id && book.authors?.length)
        .slice(0, 5)
        .map((book) => ({
          title: book.title || "Untitled",
          author: book.authors[0].name || "Unknown Author",
          coverId: book.cover_id,
          workKey: book.key.replace("/works/", ""),
          subjects: book.subject?.slice(0, 2)?.join(", "),
        }));

      setRandomBooks(mapped);
    } catch (err) {
      console.error("Error fetching random books:", err);
    }
  };

  useEffect(() => {
    fetchRandomBooks();
  }, [id]);

  return (
    <div className="mt-16 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#FEF1E1]">
          You Can Also Read
        </h2>
        <button
          onClick={fetchRandomBooks}
          className="p-2 rounded-full hover:bg-[#FEF1E120] transition"
          aria-label="Refresh Suggestions"
        >
          <FiRefreshCw className="text-[#FEF1E1] text-xl" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {randomBooks.map((book, index) => (
          <BookCard key={book.workKey} book={book} index={index} />
        ))}
      </div>
    </div>
  );
};

export default YouCanAlsoRead;
