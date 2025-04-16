import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCoverInfo from "../components/BookCoverInfo";
import BookMainContent from "../components/BookMainContent";
import WhyWorthReading from "../components/WhyWorthReading";
import WhereToRead from "../components/WhereToRead";
import YouCanAlsoRead from "@/components/YouCanAlsoRead";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiReason, setAiReason] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);

        if (data.authors?.[0]?.author?.key) {
          const authorId = data.authors[0].author.key;
          const authorRes = await fetch(`https://openlibrary.org${authorId}.json`);
          const authorData = await authorRes.json();
          setAuthor(authorData);
        }

        setAiReason(
          "This book captivates readers with its immersive narrative and unforgettable characters. Its themes resonate deeply, sparking both emotional and intellectual engagement. Whether you're a fan of timeless storytelling, thought-provoking plots, or simply enjoy a compelling read, this book delivers it all. It’s a literary gem often recommended by critics and loved by readers across generations."
        );
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading || !book) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-600 font-semibold">
        Loading book details...
      </div>
    );
  }

  const description = book.description
    ? typeof book.description === "string"
      ? book.description
      : book.description.value
    : "";

  const publishedYear = book.first_publish_date || "Unknown";
  const genres = book.subjects?.slice(0, 2).join(", ") || "N/A";
  const rating = `${(Math.random() * (5 - 4.2) + 4.2).toFixed(1)} ⭐`;

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-[#FEF1E1] px-6 py-10 font-outfit">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        <BookCoverInfo
          book={book}
          genres={genres}
          publishedYear={publishedYear}
          rating={rating}
        />
        <div className="flex-1">
          <BookMainContent
            title={book.title}
            author={author?.name || "Unknown Author"}
            description={description}
            subjects={book.subjects}
          />
          <WhyWorthReading aiReason={aiReason} />
          <WhereToRead />
        </div>
      </div>
      <YouCanAlsoRead currentGenre={book.subjects?.[0] || "fiction"} />
    </div>
  );
};

export default BookDetail;
