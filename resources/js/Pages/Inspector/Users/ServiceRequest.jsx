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
              <CTable small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Contact No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Vehicle Detail</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date & Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allInspections?.data?.map((inspection, index) => (
                  <CTableRow key={inspection.id || index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{inspection.full_name}</CTableDataCell>
                    <CTableDataCell>{inspection.email}</CTableDataCell>
                    <CTableDataCell>{inspection.contact_no}</CTableDataCell>
                    <CTableDataCell>{inspection.vehicle_make} | {inspection.vehicle_model} | {inspection.vehicle_year}</CTableDataCell>
                    <CTableDataCell>{inspection.preferred_date} {inspection.preferred_time_slot}</CTableDataCell>
                    <CTableDataCell>
                      {inspection.status === 0 && (
                        <CButton color="warning" size="sm">
                          Unassigned
                        </CButton>
                      )}
                      {inspection.status === 1 && (
                        <CButton color="primary" size="sm">
                          Assigned
                        </CButton>
                      )}
                      {inspection.status === 2 && (
                        <CButton color="info" size="sm">
                          In Progress
                        </CButton>
                      )}
                      {inspection.status === 3 && (
                        <CButton color="danger" size="sm">
                          Cancelled
                        </CButton>
                      )}
                      {inspection.status === 4 && (
                        <CButton color="success" size="sm">
                          Completed
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{formatDate(inspection.created_at)} </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown variant="btn-group">
                        <CDropdownToggle color="secondary" size="sm">
                          Actions
                        </CDropdownToggle>
                        <CDropdownMenu>
                           <CDropdownItem href={route('inspector.inspections.add',{id:inspection.id})}>Edit</CDropdownItem>
                           <CDropdownItem href={route('inspector.inspections.report',{id:inspection.id})}>View Report</CDropdownItem>
                           <CDropdownItem href={route('inspector.inspections.logs',{id:inspection.id})}>View Logs</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
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
