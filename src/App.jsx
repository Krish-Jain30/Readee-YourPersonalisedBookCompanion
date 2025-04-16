import React from "react"
import { Routes, Route } from "react-router-dom"

// Components
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"
import Footer from "./components/Footer"


// Pages
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import AboutUs from "./pages/AboutUs"
import BookDetail from "./pages/BookDetail"
import Login from "./pages/Login"
import Playlist from "./pages/Playlist"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:subject" element={<CategoryPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/playlists/:playlistName" element={<Playlist />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
