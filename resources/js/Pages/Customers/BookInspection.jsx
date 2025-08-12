import React from 'react'
import { Link } from '@inertiajs/react';
import CustomerLayout from '../../layout/CustomerLayout'
const BookInspection = () => {
  return (
    <>
      Book Inspection
    </>
  )
}

BookInspection.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default BookInspection
