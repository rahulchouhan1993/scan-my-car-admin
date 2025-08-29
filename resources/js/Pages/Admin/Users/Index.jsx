import React from 'react'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react';
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

const Index = (props) => {
  const { userDetails,roleType } = usePage().props;
  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-grid gap-2 d-md-flex mb-2 justify-content-md-end">
          {roleType=='dealer' ? (
            <Link href={route('admin.users.add', { id: 0 })} className="btn btn-primary">
                Add +
            </Link>
          ) : (
            <Link href={route('admin.inspector.add', { id: 0 })} className="btn btn-primary">
                Add +
            </Link>
          )}
        </div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users</strong> | <small>{roleType.charAt(0).toUpperCase() + roleType.slice(1)}s</small>
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
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {userDetails?.data?.map((user, index) => (
                  <CTableRow key={user.id || index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.phone_no}</CTableDataCell>
                    <CTableDataCell>
                      {user.status ? (
                        <CButton color="success" size="sm">
                          Active
                        </CButton>
                      ) : (
                        <CButton color="danger" size="sm">
                          Inactive
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown variant="btn-group">
                        <CDropdownToggle color="secondary" size="sm">
                          Actions
                        </CDropdownToggle>
                        <CDropdownMenu>
                          {user.role=='dealer' ? (
                            <CDropdownItem href={route('admin.users.add',{id:user.id})}>Edit</CDropdownItem>
                          ) : (
                             <CDropdownItem href={route('admin.inspector.add',{id:user.id})}>Edit</CDropdownItem>
                          )}
                          <CDropdownItem href={route('admin.users.status',{id:user.id})}>Update Status</CDropdownItem>
                          <CDropdownItem
                            as="button"
                            onClick={(e) => {
                              e.preventDefault()
                              if (confirm('Are you sure you want to delete this user?')) {
                                window.location.href = '/admin/delete-user/'+user.id
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
                  disabled={!userDetails?.prev_page_url}
                  component={Link}
                  href={userDetails?.prev_page_url || '#'}
                >
                  Previous
                </CPaginationItem>

                {/* Page Numbers */}
                {userDetails?.links
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
                  disabled={!userDetails?.next_page_url}
                  component={Link}
                  href={userDetails?.next_page_url || '#'}
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

Index.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default Index
