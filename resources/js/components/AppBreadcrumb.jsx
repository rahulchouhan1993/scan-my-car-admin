import React from 'react'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = window.location.pathname

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      if (!curr) return prev
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        pathname: currentPathname,
        name: decodeURIComponent(curr)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        active: index + 1 === array.length,
      })
      return currentPathname
    }, '')
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      {/* <CBreadcrumbItem href="/">Home</CBreadcrumbItem> */}
      {breadcrumbs.map((breadcrumb, index) => (
        <CBreadcrumbItem
          key={index}
          {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
        >
          {breadcrumb.name}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
