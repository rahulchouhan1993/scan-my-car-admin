import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilBell,
  cilCarAlt
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    href: '/dashboard',
    available: 'both',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
  {
    component: CNavGroup,
    name: 'Users',
    available: 'admin',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: 'Dealers', available: 'admin', href: '/users/dealer' },
      { component: CNavItem, name: 'Inspectors', available: 'admin', href: '/users/inspector' },
    ],
  },
  {
    component: CNavItem,
    name: 'Service Request',
    href: '/service-request',
    available: 'both',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    badge: { color: 'info', text: 'NEW', badgeName: 'service-request' },
  },
  {
    component: CNavItem,
    name: 'Contact Us Inquiries',
    href: '/inquiries',
    available: 'admin',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    badge: { color: 'info', text: 'NEW', badgeName: 'inquiries' },
  },
]

export default _nav
