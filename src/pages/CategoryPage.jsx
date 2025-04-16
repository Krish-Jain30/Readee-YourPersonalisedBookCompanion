import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BookCard from "@/components/BookCard"
import BookSkeleton from "@/components/BookSkeleton"

const categories = [
  { name: "Romance", subject: "romance" },
  { name: "Science Fiction", subject: "science_fiction" },
  { name: "Fantasy", subject: "fantasy" },
  { name: "Mystery", subject: "mystery" },
  { name: "Horror", subject: "horror" },
  { name: "History", subject: "history" },
  { name: "Adventure", subject: "adventure" },
  { name: "Thriller", subject: "thriller" },
  { name: "Poetry", subject: "poetry" },
  { name: "Drama", subject: "drama" },
  { name: "Children", subject: "children" },
  { name: "Comics", subject: "comics" },
]

const CategoryPage = () => {
  const { subject } = useParams()
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchBooks = async (limitToUse = limit, isLoadMore = false) => {
    isLoadMore ? setIsLoadingMore(true) : setLoading(true)
    try {
      const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=${limitToUse}`)
      const data = await res.json()
      const categoryBooks = data.works
        .filter((book) => book.cover_id)
        .map((book) => ({
          title: book.title,
          author: book.authors?.[0]?.name || "Unknown",
          coverId: book.cover_id,
          subjects: book.subject?.slice(0, 3).join(", ") || "Exciting read!",
          workKey: book.key?.split("/works/")[1] || "", // ✅ Extract workKey
        }))
      setBooks(categoryBooks)
    } catch (err) {
      console.error("Error fetching category books", err)
    } finally {
      isLoadMore ? setIsLoadingMore(false) : setLoading(false)
    }
  }

  useEffect(() => {
    setLimit(10) // Reset limit when subject changes
    fetchBooks(10)
  }, [subject])

  const handleLoadMore = () => {
    const newLimit = limit + 10
    setLimit(newLimit)
    fetchBooks(newLimit, true)
  }

  return (
    <section className="px-6 py-12 bg-[#FC350B] text-[#1a1a1a] font-outfit min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-[#fef1e1] hover:underline mb-6 text-md hover:text-[#FEF1E1] transition"
        >
          ← Back to Home
        </button>

        <h2 className="text-3xl md:text-4xl font-bold capitalize mb-10 text-[#fef1e1]">
          {subject?.replace("_", " ")} Books
        </h2>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate(`/category/${cat.subject}`)}
              className={`px-4 py-2 text-md border-2 ${
                cat.subject === subject
                  ? "bg-[#FEF1E1] text-[#FC350B]"
                  : "bg-transparent text-[#fef1e1] border-[#FEF1E1]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <BookSkeleton key={i} />)
            : books.map((book, i) => <BookCard key={i} book={book} index={i} />)}
        </div>

        {!loading && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-[#FEF1E1] hover:bg-transparent border-2 border-[#FEF1E1] hover:text-[#FEF1E1] text-[#FC350B] px-6 py-2 "
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default CategoryPage
