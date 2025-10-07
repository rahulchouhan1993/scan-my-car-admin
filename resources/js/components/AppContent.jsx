import React from 'react'
import { CContainer } from '@coreui/react'

const AppContent = ({ children }) => {
  return (
    <CContainer className="px-4" lg>
      {children}
    </CContainer>
  )
}

export default AppContent
