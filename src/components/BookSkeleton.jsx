import React from "react"

const BookSkeleton = () => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-[#f5d5bb] animate-pulse aspect-[2/3] w-full max-w-[230px] mx-auto">
      <div className="w-full h-full bg-[#f2c9a9]" />
      <div className="absolute inset-0 bg-black/10 p-4 flex flex-col justify-end">
        <div className="h-4 w-3/4 bg-[#f2c9a9] rounded mb-2" />
        <div className="h-3 w-1/2 bg-[#f2c9a9] rounded mb-2" />
        <div className="h-3 w-2/3 bg-[#f2c9a9] rounded" />
      </div>
    </div>
  )
}

export default BookSkeleton
