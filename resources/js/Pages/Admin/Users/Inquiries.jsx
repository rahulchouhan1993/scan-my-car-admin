import React from 'react'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react';
import { formatDate } from '@/utils/dateFormatter';
import {
    CPopover,
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

const Inquiries = (props) => {
  const { allInquiries } = usePage().props;
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Inquiries</strong>
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/table#small-tables"> */}
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allInquiries?.data?.map((inquiry, index) => (
                  <CTableRow key={inquiry.id || index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{inquiry.name}</CTableDataCell>
                    <CTableDataCell>{inquiry.email}</CTableDataCell>
                    <CTableDataCell>{inquiry.phone_no}</CTableDataCell>
                    
                    <CTableDataCell>
                      <button
                      className={
                        inquiry.seen_status === "Open"
                          ? "btn btn-sm btn-warning"
                          : inquiry.seen_status === "Assigned"
                          ? "btn btn-sm btn-info"
                          : inquiry.seen_status === "Seen"
                          ? "btn btn-sm btn-light"
                          : inquiry.seen_status === "Not Seen"
                          ? "btn btn-sm btn-danger"
                          : inquiry.seen_status === "Cancelled"
                          ? "btn btn-sm btn-secondary"
                          : inquiry.seen_status === "Follow Up"
                          ? "btn btn-sm btn-primary"
                          : inquiry.seen_status === "Closed"
                          ? "btn btn-sm btn-success"
                          : "btn btn-sm btn-light"
                      }
                    >
                      {inquiry.seen_status}
                    </button>
                    </CTableDataCell>
                    <CTableDataCell>{formatDate(inquiry.created_at)}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown variant="btn-group">
                        <CDropdownToggle color="secondary" size="sm">
                          Actions
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href={route('admin.contact-update',{id:inquiry.id})}>Assign</CDropdownItem>
                          {/* <CDropdownItem href={route('admin.inquirystatus', { id: inquiry.id })}>
                            {inquiry.seen_status ? (
                                "Mark As Unread"
                            ) : (
                               " Mark As Read"
                            )}
                            </CDropdownItem> */}
                          <CDropdownItem
                            as="button"
                            onClick={(e) => {
                              e.preventDefault()
                              if (confirm('Are you sure you want to delete this record?')) {
                                window.location.href = '/admin/delete-inquiry/'+inquiry.id
                              }
                            }}
                          >
                            Delete
                          </CDropdownItem>
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
                  disabled={!allInquiries?.prev_page_url}
                  component={Link}
                  href={allInquiries?.prev_page_url || '#'}
                >
                  Previous
                </CPaginationItem>

                {/* Page Numbers */}
                {allInquiries?.links
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
                  disabled={!allInquiries?.next_page_url}
                  component={Link}
                  href={allInquiries?.next_page_url || '#'}
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

Inquiries.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default Inquiries
