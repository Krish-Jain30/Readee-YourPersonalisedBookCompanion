import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import LogoName from "../assets/LogoName.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setLoading(true);
      const fetchSearchResults = async () => {
        try {
          const res = await fetch(
            `https://openlibrary.org/search.json?q=${searchQuery}&limit=5`
          );
          const data = await res.json();
          setSearchResults(data.docs || []);
        } catch (err) {
          console.error("Error fetching search results:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="w-full px-4 py-3 flex items-center justify-between bg-[#1a1a1a] z-50 relative">
      <Link to="/" className="flex items-center">
        <h2 className="text-2xl font-bold text-[#FEF1E1] ml-10 mb-2">Readee</h2>
      </Link>

      <div className="hidden lg:flex items-center w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full px-4 py-2 pr-12 rounded-full border-2 border-[#fef1e1] text-[#fef1e1] bg-transparent placeholder:text-[#fef1e1b0] focus:outline-none focus:ring-2 focus:ring-[#fef1e1] transition"
          />
          <button className="absolute right-2 pr-2 top-1/2 transform -translate-y-1/2 text-[#fef1e1] hover:text-[#FC350B]">
            <Search className="w-6 h-6" />
          </button>

          {searchQuery.length > 2 && (
            <div className="absolute top-full left-0 right-0 bg-[#1A1A1A] text-[#FEF1E1] border-2 border-[#FC350B] rounded-md mt-2 z-50">
              {loading ? (
                <div className="text-center py-2">Loading...</div>
              ) : (
                <ul className="max-h-60 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => {
                      const workKey = result.key.split("/").pop();
                      return (
                        <li
                          key={result.key}
                          className="px-4 py-2 cursor-pointer hover:bg-[#FC350B] hover:text-[#1A1A1A]"
                          onClick={() => {
                            navigate(`/book/${workKey}`);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                        >
                          {result.title}
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-4 py-2">No results found</li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex gap-10 items-center text-lg font-semibold text-[#FC350B]">
        <Link to="/" className="hover:underline text-xl transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:underline text-xl transition-colors">
          About Us
        </Link>
        <Link to="/playlists" className="hover:underline text-xl transition-colors">
          Playlists
        </Link>
        <Link to="/login">
          <button className="text-[#FEF1E1] text-xl border-[#F6F8D5] bg-[#FC350B] hover:bg-[#FEF1E1] hover:text-[#FC350B] hover:border-[#FC350B] border-2 px-10 py-2 transition-colors">
            Login
          </button>
        </Link>
      </div>

      {/* Tablet/Mobile Menu */}
      <div className="lg:hidden">
        <button className="text-[#FC350B] pr-2 pt-2" onClick={toggleMenu}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#FEF1E1] z-50 flex flex-col justify-center items-end p-10 text-right"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <button className="absolute top-9 right-7 text-[#FC350B]" onClick={toggleMenu}>
              <X className="w-10 h-10" />
            </button>

            <div className="flex flex-col gap-8 text-3xl font-semibold text-[#FC350B]">
              <Link to="/" onClick={toggleMenu} className="hover:underline">
                Home
              </Link>
              <Link to="/" onClick={toggleMenu} className="hover:underline">
                Favourites
              </Link>
              <Link to="/playlists" onClick={toggleMenu} className="hover:underline">
                Playlists
              </Link>
              <Link to="/login" onClick={toggleMenu}>
                <button className="text-[#FEF1E1] bg-[#FC350B] hover:bg-[#FEF1E1] hover:text-[#FC350B] w-48 text-2xl px-6 py-3 transition-all">
                  Login
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
