import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

const getRandomRating = () => (Math.random() * (5 - 4.5) + 4.5).toFixed(1)

const HeroSlider = () => {
  const [books, setBooks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const cached = localStorage.getItem("featuredBooks")
        if (cached) {
          setBooks(JSON.parse(cached))
          setLoading(false)
          return
        }

        const res = await fetch("https://openlibrary.org/subjects/fiction.json?limit=10")
        const data = await res.json()

        const fetchedBooks = data.works
          .filter((book) => book.cover_id && book.authors?.[0]?.name)
          .slice(0, 5)
          .map((book) => ({
            title: book.title,
            author: book.authors[0].name,
            coverId: book.cover_id,
            rating: getRandomRating(),
            description:
              book.subject?.slice(0, 3).join(", ") ||
              "Dive into an amazing read from our collection.",
            workKey: book.key.split("/").pop(), // Extract work ID from key
          }))

        localStorage.setItem("featuredBooks", JSON.stringify(fetchedBooks))
        setBooks(fetchedBooks)
      } catch (err) {
        console.error("Failed to fetch books:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 < books.length ? prev + 1 : 0))
    }, 3000)

    return () => clearInterval(interval)
  }, [books])

  const currentBook = books[currentIndex]

  if (loading) {
    return (
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-500">
        Loading books...
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden font-outfit">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBook.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://covers.openlibrary.org/b/id/${currentBook.coverId}-L.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-6 text-center text-[#FEF1E1]">
            <div className="max-w-3xl">
              <span className="bg-[#FC350B] text-xs text-[#FEF1E1] px-4 py-1 rounded-full mb-4 inline-block">
                FEATURED BOOK
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
                {currentBook.title}
              </h1>
              <p className="text-lg font-medium text-[#FEF1E1] mb-2">
                by {currentBook.author}
              </p>

              <div className="flex justify-center items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                <span className="ml-2 text-[#FEF1E1] text-sm">
                  {currentBook.rating}
                </span>
              </div>

              <p className="text-[#FEF1E1] text-base md:text-lg mb-6">
                {currentBook.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-[#FC350B] hover:bg-transparent border-2 px-6 py-3 text-[#FEF1E1] border-[#FC350B] font-semibold transition"
                  onClick={() => navigate(`/book/${currentBook.workKey}`)}
                >
                  Read Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default HeroSlider
