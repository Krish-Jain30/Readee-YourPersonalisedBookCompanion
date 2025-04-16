import React, { useEffect, useState } from "react";
import PlaylistCard from "@/components/PlaylistCard";
import BookCard from "@/components/BookCard";
import YouCanAlsoRead from "@/components/YouCanAlsoRead";
import { FiTrash } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const Playlist = () => {
  const [playlists, setPlaylists] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookToDeleteIndex, setBookToDeleteIndex] = useState(null);

  const navigate = useNavigate();
  const { playlistName } = useParams();

  const loadPlaylists = () => {
    const stored = JSON.parse(localStorage.getItem("playlists")) || {};
    setPlaylists(stored);
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;

    if (playlists[newPlaylistName]) {
      alert("Playlist already exists!");
      return;
    }

    const updated = {
      ...playlists,
      [newPlaylistName]: [],
    };
    localStorage.setItem("playlists", JSON.stringify(updated));
    setNewPlaylistName("");
    loadPlaylists();
  };

  const handleBack = () => {
    navigate("/playlists");
  };

  const confirmDeleteBook = (index) => {
    setBookToDeleteIndex(index);
    setShowConfirmModal(true);
  };

  const deleteBookFromPlaylist = () => {
    const updated = { ...playlists };
    updated[playlistName] = updated[playlistName].filter(
      (_, index) => index !== bookToDeleteIndex
    );
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
    setShowConfirmModal(false);
    setBookToDeleteIndex(null);
  };

  const handleSaveBook = (bookToAdd) => {
    if (!playlistName) return;

    const updated = { ...playlists };
    updated[playlistName] = [...updated[playlistName], bookToAdd];
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#FEF1E1] px-6 py-10 font-outfit">
      <div className="max-w-6xl mx-auto">
        {!playlistName ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="New playlist"
                className="px-4 py-2 rounded border border-[#FC350B] text-[#FEF1E1] w-full sm:w-auto"
              />
              <button
                onClick={createPlaylist}
                className="bg-[#FC350B] hover:bg-[#e33600] px-6 py-2 rounded text-white sm:ml-4 mt-4 sm:mt-0"
              >
                Create
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.keys(playlists).length === 0 && (
                <p className="text-gray-400">No playlists found. Create one!</p>
              )}
              {Object.entries(playlists).map(([name, books]) => (
                <PlaylistCard
                  key={name}
                  name={name}
                  count={books.length}
                  onClick={() => navigate(`/playlists/${name}`)}
                  onDelete={loadPlaylists}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleBack}
              className="text-sm text-[#FC350B] mb-4 hover:underline"
            >
              ← Back to your playlists
            </button>

            <div className="bg-[#2A2A2A] p-6 rounded-lg mb-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{playlistName}</h2>
              <p className="text-sm text-[#FEF1E1cc]">
                Total Books: {playlists[playlistName]?.length || 0}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {playlists[playlistName]?.length > 0 ? (
                playlists[playlistName].map((book, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => confirmDeleteBook(index)}
                      className="absolute top-2 right-2 bg-[#FC350B] hover:bg-[#e33600] p-1 rounded-full text-white z-10"
                      aria-label="Delete book"
                    >
                      <FiTrash />
                    </button>
                    <BookCard book={book} index={index} />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No books in this playlist yet.</p>
              )}
            </div>

            <YouCanAlsoRead onSave={handleSaveBook} />
          </>
        )}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-[#FEF1E1cc] mb-6">
              Are you sure you want to delete this book from the playlist?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={deleteBookFromPlaylist}
                className="bg-[#FC350B] hover:bg-[#e33600] px-6 py-2 rounded text-white"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
