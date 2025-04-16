import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import BookSkeleton from "@/components/BookSkeleton"
import "swiper/css"
import { useNavigate } from "react-router-dom"

const TrendingBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://openlibrary.org/subjects/bestsellers.json?limit=25")
        const data = await res.json()
        const trending = data.works
          .filter((book) => book.cover_id)
          .map((book) => ({
            title: book.title,
            author: book.authors?.[0]?.name || "Unknown",
            coverId: book.cover_id,
            subjects: book.subject?.slice(0, 3).join(", ") || "Exciting read!",
            workKey: book.key.split("/").pop(),
          }))
        setBooks(trending)
      } catch (err) {
        console.error("Error fetching trending books", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <section className="px-6 py-12 bg-[#FC350B] text-[#FEF1E1] font-outfit">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-semibold">Trending Books</h2>
          <button
            onClick={() => navigate("/category")}
            className="text-[#FEF1E1] hover:underline text-md font-medium"
          >
            View All →
          </button>
        </div>
        <p className="text-md opacity-90 mb-8">Browse through the hottest reads right now</p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <BookSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            speed={1000}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {books.map((book, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="relative rounded-xl overflow-hidden group shadow-md aspect-[2/3] w-full max-w-[230px] mx-auto">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 text-[#FEF1E1]">
                      <div>
                        <h3 className="text-lg font-semibold">{book.title}</h3>
                        <p className="text-sm text-[#fef1e19e] mb-1">by {book.author}</p>
                        <p className="text-sm text-[#fef1e1cf] line-clamp-2 mb-3">{book.subjects}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-[#FC350B] hover:bg-transparent border-2 border-[#FC350B] text-[#FEF1E1] text-sm px-6 py-2 transition" onClick={() => navigate(`/book/${book.workKey}`)}>
                          Read
                        </button>
                        <button
                          className="border-2 px-6 py-2 border-[#FC350B] bg-transparent text-white text-sm hover:bg-[#FC350B] hover:text-[#FEF1E1] transition"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}

export default TrendingBooks
