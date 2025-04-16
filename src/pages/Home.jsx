import BrowseCategories from '@/components/BrowseCategories'
import HeroSlider from '@/components/HeroSlider'
import SuggestBook from '@/components/SuggestBook'
import TrendingBooks from '@/components/TrendingBooks'
import React from 'react'

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <TrendingBooks/>
      <BrowseCategories/>
      <SuggestBook/>
    </div>
  )
}

export default Home
