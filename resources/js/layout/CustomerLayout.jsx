import React from 'react'
import { useEffect } from 'react';
import Header from '../components/Front/Header'
import Footer from '../components/Front/Footer'
import Content from '../components/Front/Content'
import toastr from 'toastr'
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
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
        <div className="body flex-grow-1">
          <Content>{children}</Content>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default CustomerLayout
