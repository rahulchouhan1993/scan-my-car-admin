import React from 'react'
import FrontLayout from '../../layout/CustomerLayout'

const Home = () => {
  return (
    <>
    This is my homepage content
    </>
  )
}

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>
export default Home
