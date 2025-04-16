import React from "react"
import { Link } from "react-router-dom"

const AboutUs = () => {
  return (
    <div className="font-outfit bg-[#1A1A1A] text-[#FEF1E1]">
      <section className="text-center px-6 py-20 bg-[#FC350B] text-[#FEF1E1]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Readee</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          Your ultimate book buddy — helping readers discover, connect, and share their passion for books!
        </p>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Our Mission</h2>
        <p className="text-lg max-w-3xl mx-auto mb-4 text-[#fef1e1c4]">
          At Readee, we believe books should be accessible, shareable, and loved. We're building a
          platform where readers can explore trending books, save favorites, create playlists, and connect through stories.
        </p>
        <p className="text-lg max-w-3xl mx-auto text-[#fef1e1a4]">
          Whether you're a fiction fanatic or a non-fiction nerd, Readee is your space to read more, share more, and discover endlessly.
        </p>
      </section>

      <section className="py-12 px-6 bg-[#262626]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {[
            { title: "Trending Picks", desc: "Stay ahead with the most popular books updated regularly." },
            { title: "Save Favorites", desc: "Mark books you love and keep your reading list handy." },
            { title: "Create Playlists", desc: "Organize your books like playlists and share your vibe." },
            { title: "Smart Search", desc: "Find books by title, author, or category with ease." },
            { title: "Explore Categories", desc: "Dive into curated categories to discover new gems." },
            { title: "Sleek UI", desc: "Enjoy a fast, clean, and responsive reading platform." }
          ].map((item, i) => (
            <div key={i} className="bg-[#1A1A1A] p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-[#fef1e1a3]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to dive into books?</h2>
        <p className="mb-6 text-[#fef1e1b2]">Join Readee today and explore a world of stories!</p>
        <Link to="/login">
          <button className="bg-[#FC350B] hover:bg-transparent border-2 border-[#FC350B] text-[#FEF1E1] hover:text-[#FC350B] px-6 py-3 font-semibold transition">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  )
}

export default AboutUs
