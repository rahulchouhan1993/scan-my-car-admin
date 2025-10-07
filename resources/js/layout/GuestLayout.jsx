import React from 'react'
import AppContent from '../components/AppContent'
import { useEffect } from 'react';
import toastr from 'toastr'
import { Head } from '@inertiajs/react';
const GuestLayout = ({ children }) => {
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
       <Head title={children.props.pageTitle} />
        <AppContent>{children}</AppContent>
    </div>
  )
}

export default GuestLayout
