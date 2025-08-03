import React from 'react'
import { useEffect } from 'react';
import AppSidebar from '../components/AppSidebar'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import AppContent from '../components/AppContent'
import toastr from 'toastr'
const DefaultLayout = ({ children }) => {
  const { flash } = children.props;
  useEffect(() => {
      if (flash?.success) {
          toastr.success(flash.success);
      }
      if (flash?.error) {
          toastr.error(flash.error);
      }
  }, [flash]);
  console.log(children);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent>{children}</AppContent>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
