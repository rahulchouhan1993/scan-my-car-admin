import React from 'react'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react';
import { formatDate } from '@/utils/dateFormatter';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CDropdown,
    CBadge,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import DefaultLayout from '../../../layout/DefaultLayout'

const ServiceRequest = (props) => {
  const { allInspections } = usePage().props;
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Service Request</strong>
          </CCardHeader>
          <CCardBody>
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Request No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Vehicle Details</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Accessible Till</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Visibility Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allInspections?.data?.map((inspection, index) => (
                  <CTableRow key={inspection.id || index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    
                    <CTableDataCell>{inspection.request_no}</CTableDataCell>
                    <CTableDataCell>{inspection.vehicle_make} | {inspection.vehicle_model} | {inspection.vehicle_year}</CTableDataCell>
                    <CTableDataCell>{inspection.visiblity_till} </CTableDataCell>
                    <CTableDataCell>
                      {inspection.visiblity_till && new Date(inspection.visiblity_till).setHours(0,0,0,0) < new Date().setHours(0,0,0,0) ? (
                        <CButton color="danger" size="sm">Expired</CButton>
                      ) : (
                        <CButton color="warning" size="sm">Visible</CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {inspection.visiblity_till && new Date(inspection.visiblity_till).setHours(0,0,0,0) < new Date().setHours(0,0,0,0) ? (
                        <>N/A</>
                      ) : (
                        <CDropdown variant="btn-group">
                          <CDropdownToggle color="secondary" size="sm">
                            Actions
                          </CDropdownToggle>
                          <CDropdownMenu>
                            
                            {(inspection.status === 4 || inspection.status === 5) && (
                            <CDropdownItem target="_blank" href={route('inspectionDetails',{id:inspection.id})}>View Report</CDropdownItem>
                            )}
                          </CDropdownMenu>
                        </CDropdown>
                      )}
                      
                    </CTableDataCell>
                  </CTableRow>
                ))}

                </CTableBody>
              </CTable>
              <CPagination className="justify-content-end" aria-label="Page navigation example">
                {/* Previous Button */}
                <CPaginationItem
                  disabled={!allInspections?.prev_page_url}
                  component={Link}
                  href={allInspections?.prev_page_url || '#'}
                >
                  Previous
                </CPaginationItem>

                {/* Page Numbers */}
                {allInspections?.links
                  .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                  .map((link, index) => (
                    <CPaginationItem
                        key={index}
                        active={link.active}
                        component={Link}
                        href={link.url || '#'}
                      >
                    {link.label}
                    </CPaginationItem>
                  ))}

                {/* Next Button */}
                <CPaginationItem
                  disabled={!allInspections?.next_page_url}
                  component={Link}
                  href={allInspections?.next_page_url || '#'}
                >
                  Next
                </CPaginationItem>
              </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

ServiceRequest.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default ServiceRequest
