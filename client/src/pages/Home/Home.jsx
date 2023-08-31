import React from 'react'
import { Navbar, Header, MailList, Footer } from '../../components'
import Cities from './Cities'
import FeaturedProperties from './Properties'
import PropertyList from './PropertyTypes'

const Home = () => {

  

  return (
    <div className="flex flex-col ">

      <Navbar />
      <Header type='home' />

      <div className="mt-[50px] flex flex-col items-center gap-[30px] ">
        <Cities />
        <PropertyList />
        <FeaturedProperties />

        <MailList />
        <Footer />
      </div>

    </div>
  )
}

export default Home