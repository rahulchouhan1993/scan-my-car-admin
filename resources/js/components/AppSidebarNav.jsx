import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const { auth,notifications,serviceRequest } = usePage().props
  
  const navLink = (name, icon, badge, indent = false) => (
    <>
      {icon
        ? icon
        : indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )}
      {name}
      {badge && badge.badgeName === 'service-request' ? (
        <CBadge color={badge.color} className="ms-auto" size="sm">
          {serviceRequest}
        </CBadge>
      ) : badge && badge.badgeName === 'inquiries' ? (
        <CBadge color={badge.color} className="ms-auto" size="sm">
          {notifications}
        </CBadge>
      ) : null}
    </>
  )

  const isAvailable = (available) =>
    available === 'both' || available === auth?.user?.role

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component

    if (!isAvailable(rest.available)) return null

    const updatedRest = {
      ...rest,
      ...(rest.href && { href: `/${auth?.user?.role}${rest.href}` }),
    }

    return (
      <Component as="div" key={index}>
        {updatedRest.to || updatedRest.href ? (
          <CNavLink
            component={Link}
            href={updatedRest.to || updatedRest.href} // ✅ Use `href` for Inertia
          >
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, ...rest } = item
    const Component = component

    if (!isAvailable(rest.available)) return null

    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
        {items?.map((subItem, subIndex) =>
          subItem.items
            ? navGroup(subItem, subIndex)
            : navItem(subItem, subIndex, true),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items?.map((item, index) =>
        item.items ? navGroup(item, index) : navItem(item, index),
      )}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
