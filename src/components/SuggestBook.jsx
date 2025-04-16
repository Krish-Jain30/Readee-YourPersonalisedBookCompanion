import React, { useState } from "react";

const SuggestBook = () => {
  const [formData, setFormData] = useState({
    genre: "",
    mood: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Request:", formData);
    setSubmitted(true);

    // Reset form
    setFormData({ genre: "", mood: "" });

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="bg-[#FEF1E1] py-16 px-6 font-outfit text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-[#FC350B]">Not Sure What to Read?</h2>
          <p className="text-lg mb-4">
            Tell us your favorite genres, your mood, or books you've enjoyed—and we’ll suggest
            your next favorite read!
          </p>
          <p className="text-base text-[#333]">
            Our team will handpick recommendations and update our trending picks to match your taste.
          </p>
        </div>

        <div className="md:w-1/2 w-full bg-[#FEF1E1] rounded-xl p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="What genre are you interested in?"
              className="border border-[#FC350B] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC350B] text-black"
              required
            />
            <textarea
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your mood or mention a book you loved..."
              className="border border-[#FC350B] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC350B] text-black"
              required
            />
            <button
              type="submit"
              className="bg-[#FC350B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#e8350c] transition"
            >
              {submitted ? "Submitted!" : "Suggest Me a Book"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SuggestBook;
