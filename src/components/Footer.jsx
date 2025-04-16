import { Link } from "react-router-dom"
import { Instagram, Twitter, Mail, Github, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#FC350B] pb-10 pt-10 text-[#FEF1E1] font-outfit">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-[#FEF1E1] mb-2">Readee</h2>
          <p className="text-sm text-[#fef1e1b3]">
            Discover your next favorite book. Curated lists, trending titles, and personalized recommendations – all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline transition">Home</Link></li>
            <li><Link to="/category/romance" className="hover:underline transition">Categories</Link></li>
            <li><Link to="/about" className="hover:underline transition">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with us</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#FC350B] transition">
              <Github />
            </a>
            <a href="https://www.linkedin.com/in/krish-jain-92286320b/" target="_blank" rel="noreferrer" className="hover:text-[#FC350B] transition">
              <Linkedin />
            </a>
            <a href="mailto:hello@readee.com" className="hover:text-[#FC350B] transition">
              <Mail />
            </a>
          </div>
          <p className="text-xs text-[#fef1e199]">&copy; {new Date().getFullYear()} Readee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
