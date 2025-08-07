import { useEffect } from 'react';
import Header from '../components/Front/Header'
import Footer from '../components/Front/Footer'
import toastr from 'toastr'
import { Head } from '@inertiajs/react';
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
    <>
    <Head title={children.props.pageTitle} />
    <div className='mk'>
      <Header />
        <div className="1body 1flex-grow-1">
          {children}
        </div>
      <Footer />
    </div></>
    
  )
}

export default CustomerLayout
