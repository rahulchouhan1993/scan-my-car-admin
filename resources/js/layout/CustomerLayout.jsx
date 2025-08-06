import React from 'react'
import { useEffect } from 'react';
import Header from '../components/Front/Header'
import Footer from '../components/Front/Footer'
import toastr from 'toastr'
import '../../css/app.css'
const CustomerLayout = ({ children }) => {
  const { flash } = children.props;
  useEffect(() => {
      if (flash?.success) {
          toastr.success(flash.success);
      }
      if (flash?.error) {
          toastr.error(flash.error);
      }
  }, [flash]);
  return (
    <div className='mk'>
      <Header />
        <div className="1body 1flex-grow-1">
          {children}
        </div>
      <Footer />
    </div>
  )
}

export default CustomerLayout
