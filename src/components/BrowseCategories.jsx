import React from "react"
import {
  Heart,
  Rocket,
  Sparkles,
  Search,
  Ghost,
  Landmark,
  Compass,
  AlertCircle,
  PenLine,
  Theater,
  Baby,
  BookCopy,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const categories = [
  { name: "Romance", icon: <Heart className="text-[#FC350B]" />, subject: "romance" },
  { name: "Science Fiction", icon: <Rocket className="text-[#FC350B]" />, subject: "science_fiction" },
  { name: "Fantasy", icon: <Sparkles className="text-[#FC350B]" />, subject: "fantasy" },
  { name: "Mystery", icon: <Search className="text-[#FC350B]" />, subject: "mystery" },
  { name: "Horror", icon: <Ghost className="text-[#FC350B]" />, subject: "horror" },
  { name: "History", icon: <Landmark className="text-[#FC350B]" />, subject: "history" },
  { name: "Adventure", icon: <Compass className="text-[#FC350B]" />, subject: "adventure" },
  { name: "Thriller", icon: <AlertCircle className="text-[#FC350B]" />, subject: "thriller" },
  { name: "Poetry", icon: <PenLine className="text-[#FC350B]" />, subject: "poetry" },
  { name: "Drama", icon: <Theater className="text-[#FC350B]" />, subject: "drama" },
  { name: "Children", icon: <Baby className="text-[#FC350B]" />, subject: "children" },
  { name: "Comics", icon: <BookCopy className="text-[#FC350B]" />, subject: "comics" },
]

const BrowseCategories = () => {
  const navigate = useNavigate()

  return (
    <section className="px-6 xl:px-30 py-12 bg-[#FEF1E1] font-outfit">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#FC350B]">Browse by Category</h2>
        <button
          onClick={() => navigate("/category")}
          className="text-[#FC350B] hover:underline flex items-center gap-1 text-md font-medium transition-colors"
        >
          All Categories →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/category/${cat.subject}`)}
            className="cursor-pointer bg-[#FEF1E1] border-2 border-[#FC350B] hover:bg-[#FC350B] transition-all p-5 flex flex-col items-center justify-center text-center group"
          >
            <div className="rounded-full p-3 mb-2 group-hover:bg-[#FEF1E1] transition">
              {cat.icon}
            </div>
            <p className="text-sm font-medium text-[#FC350B] group-hover:text-[#FEF1E1] transition">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BrowseCategories
