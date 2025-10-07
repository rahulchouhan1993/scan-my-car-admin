import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const { auth,notifications } = usePage().props
  const serviceRequest = usePage().props.dashboardData.totalServiceRequests;
  
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

  const isAvailable = (available) =>{
    const role = auth?.user?.role?.toLowerCase?.();
    if (!role || !available) return false;

    // allow: "both", "admin", "admin,inspector", ["admin","dealer"], etc.
    if (available === 'both') return true;

    const toList = (val) =>
      Array.isArray(val)
        ? val
        : String(val).split(','); // comma-separated string -> array

    const roles = toList(available).map((r) => r.trim().toLowerCase());
    return roles.includes(role);
  }
    

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
