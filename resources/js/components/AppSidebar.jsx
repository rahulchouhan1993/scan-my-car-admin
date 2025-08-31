import React, { useState } from 'react'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
//import { logo } from '../assets/brand/logo'
import logo from "../assets/images/logo.png";
import { sygnet } from '../assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const [unfoldable, setUnfoldable] = useState(false)
  const [sidebarShow, setSidebarShow] = useState(true)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={setSidebarShow}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
        {unfoldable===false && (
          <img ClassName="sidebar-brand-full" src={logo} height="32" width="150" />
        )}

        {unfoldable===true && (
          <div style={{ maxWidth: "50px", objectFit: "contain" }}>
            
            <img ClassName="sidebar-brand-full mobile-view hidden" src='/favicon.ico' 
            style={{ maxWidth: "100%", height: "30px", objectFit:'contain' }}
            />
          </div>
        )}
          
          {/* <div style={{ maxWidth: "50px", objectFit: "contain" }}>
            
            <img ClassName="sidebar-brand-full mobile-view hidden" src='/favicon.ico' 
            style={{ maxWidth: "100%", height: "30px", objectFit:'contain' }}
            />
          </div> */}
          
        </CSidebarBrand>
        <CCloseButton className="d-lg-none" dark onClick={() => setSidebarShow(false)} />
      </CSidebarHeader>

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => setUnfoldable(!unfoldable)} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
