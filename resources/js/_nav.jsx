import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilBell,
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
    available: 'both',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: 'Dealers', available: 'both', href: '/users/dealer' },
      { component: CNavItem, name: 'Inspectors', available: 'admin', href: '/users/inspector' },
    ],
  },
  {
    component: CNavItem,
    name: 'Inquiries',
    href: '/inquiries',
    available: 'admin',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    badge: { color: 'info', text: 'NEW' },
  },
]

export default _nav
