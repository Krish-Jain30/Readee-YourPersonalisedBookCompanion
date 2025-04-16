import React, { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa"

const BookCard = ({ book, index = 0 }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState("")
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSave = () => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || {}

    if (Object.keys(playlists).length > 0) {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(true)
    }
  }

  const handlePlaylistSelect = (playlistName) => {
    setSelectedPlaylist(playlistName)
  }

  const handleCreatePlaylist = () => {
    if (newPlaylistName) {
      const playlists = JSON.parse(localStorage.getItem("playlists")) || {}
      playlists[newPlaylistName] = []
      localStorage.setItem("playlists", JSON.stringify(playlists))
      setSelectedPlaylist(newPlaylistName)

      playlists[newPlaylistName].push(book)
      localStorage.setItem("playlists", JSON.stringify(playlists))

      setSuccessMessage(`Book saved to "${newPlaylistName}"!`)
    } else {
      alert("Please enter a playlist name.")
    }
  }

  const handleSaveToPlaylist = () => {
    if (!selectedPlaylist) return

    const playlists = JSON.parse(localStorage.getItem("playlists")) || {}

    const isDuplicate = playlists[selectedPlaylist].some(
      (b) => b.workKey === book.workKey
    )
    if (isDuplicate) {
      setSuccessMessage("Book already in playlist!")
      return
    }

    playlists[selectedPlaylist].push(book)
    localStorage.setItem("playlists", JSON.stringify(playlists))
    setSuccessMessage(`Saved to "${selectedPlaylist}"`)
    setSelectedPlaylist("")
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
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
            {book.subjects && (
              <p className="text-sm text-[#fef1e1cf] line-clamp-2 mb-3">{book.subjects}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="bg-[#FC350B] hover:bg-transparent border-2 border-[#FC350B] text-[#FEF1E1] text-sm px-6 py-2 transition"
              onClick={() => navigate(`/book/${book.workKey}`)}
            >
              Read
            </button>
            <button
              className="border-2 px-6 py-2 border-[#FC350B] bg-transparent text-white text-sm hover:bg-[#FC350B] hover:text-[#FEF1E1] transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-all duration-500"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-128 shadow-lg transform transition-all duration-300 scale-100 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Select Playlist</h2>
            <div className="mb-4">
              <ul>
                {Object.keys(JSON.parse(localStorage.getItem("playlists")) || {}).map((playlistName) => (
                  <li key={playlistName} className="mb-2">
                    <button
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
                      onClick={() => handlePlaylistSelect(playlistName)}
                    >
                      <FaCheckCircle />
                      {playlistName}
                    </button>
                  </li>
                ))}
              </ul>
              {Object.keys(JSON.parse(localStorage.getItem("playlists")) || {}).length === 0 && (
                <p className="text-red-500">No playlists available. Create one below.</p>
              )}
            </div>
            {selectedPlaylist ? (
              <div>
                <p className="flex items-center gap-2 text-green-500">
                  <FaCheckCircle />
                  Selected Playlist: {selectedPlaylist}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full w-full transition-all duration-300 hover:bg-blue-600"
                  onClick={handleSaveToPlaylist}
                >
                  Save to {selectedPlaylist}
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="New Playlist Name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="border px-4 py-2 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-full w-full transition-all duration-300 hover:bg-green-600"
                  onClick={handleCreatePlaylist}
                >
                  Create Playlist
                </button>
              </div>
            )}

            {successMessage && (
              <div className="text-green-500 mt-4 flex items-center gap-2 justify-center">
                <FaCheckCircle />
                {successMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default BookCard
