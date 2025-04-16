import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trash2 } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations

const PlaylistCard = ({ name, count, onClick, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || {};
    delete playlists[name];
    localStorage.setItem("playlists", JSON.stringify(playlists));
    setIsOpen(false);
    onDelete(); // trigger refresh in parent
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className="cursor-pointer border-[#FC350B] bg-[#2a2a2a] transition-all duration-300 relative"
          onClick={onClick} // Open the playlist when the card is clicked
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-[#FEF1E1]">
              {name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#fef1e1b4]">
              {count} book{count !== 1 && "s"}
            </p>
          </CardContent>

          {/* Delete Icon */}
          <div
            className="absolute top-3 right-3 text-[#FC350B] hover:text-red-500 transition"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <Trash2 className="w-5 h-5" />
          </div>

          {/* BookOpen Icon Moved to Bottom Right */}
          <div
            className="absolute bottom-3 right-3 text-[#FC350B] hover:text-blue-500 transition"
            onClick={(e) => {
              e.stopPropagation();
              onClick(); // trigger view playlist function
            }}
          >
            <BookOpen className="w-5 h-5" />
          </div>
        </Card>
      </motion.div>

      {/* Confirmation Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#2a2a2a] p-6 text-left align-middle shadow-xl transition-all border border-[#FC350B]">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-[#FEF1E1]"
                >
                  Delete Playlist
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-[#fef1e1a8]">
                    Are you sure you want to delete the playlist <span className="font-semibold">{name}</span>? This action cannot be undone.
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-700 text-[#FEF1E1]"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm border border-red-600 bg-red-600 hover:bg-red-700 rounded text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PlaylistCard;
