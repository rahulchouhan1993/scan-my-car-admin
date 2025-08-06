import React from 'react'
import { useEffect } from 'react';
import AppSidebar from '../components/AppSidebar'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import AppContent from '../components/AppContent'
import toastr from 'toastr'
// import '../../css/style.scss'
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
  return (
    <body class="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex p-6 lg:p-8 items-center lg:justify-center min-h-screen flex-col">
      <div>
        <AppSidebar />
        <div className="111wrapper 11d-flex 11flex-column 11min-vh-100">
          <AppHeader />
          <div className="1body 1flex-grow-1">
            <AppContent>{children}</AppContent>
          </div>
          <AppFooter />
        </div>
      </div>
    </body>
  )
}

export default DefaultLayout
