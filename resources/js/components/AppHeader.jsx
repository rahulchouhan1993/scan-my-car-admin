import React, { useEffect, useRef } from 'react'
import { Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/react'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import AppBreadcrumb from './AppBreadcrumb'
import { AppHeaderDropdown } from './header'

const AppHeader = () => {
  const { auth } = usePage().props;
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler className="ps-0">
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/* Left Menu Nav */}
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink component={Link} href="/dashboard">
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        {/* Notification Icons */}
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              {/* <CIcon icon={cilBell} size="lg" /> */}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        {/* Theme Dropdown + Profile */}
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75" />
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem active={colorMode === 'light'} onClick={() => setColorMode('light')}>
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem active={colorMode === 'dark'} onClick={() => setColorMode('dark')}>
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem active={colorMode === 'auto'} onClick={() => setColorMode('auto')}>
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75" />
          </li>

          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      {/* Breadcrumb */}
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
