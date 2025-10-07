import React from 'react'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react';
import { formatDate } from '@/utils/dateFormatter';

import {
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
} from '@coreui/react'
import DefaultLayout from '../../../layout/DefaultLayout'

const Logs = (props) => {
  const { inspectinLogs,roleType } = usePage().props;
  return (
    <CRow>
      <CCol xs={12}>
       
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Logs</strong>
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/table#small-tables"> */}
              <CTable small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Log Details</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {inspectinLogs?.data?.map((user, index) => (
                  <CTableRow key={user.id || index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{user.log_details}</CTableDataCell>
                    <CTableDataCell>{formatDate(user.created_at)}</CTableDataCell>
                  </CTableRow>
                ))}

                </CTableBody>
              </CTable>
              <CPagination className="justify-content-end" aria-label="Page navigation example">
                {/* Previous Button */}
                <CPaginationItem
                  disabled={!inspectinLogs?.prev_page_url}
                  component={Link}
                  href={inspectinLogs?.prev_page_url || '#'}
                >
                  Previous
                </CPaginationItem>

                {/* Page Numbers */}
                {inspectinLogs?.links
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
                  disabled={!inspectinLogs?.next_page_url}
                  component={Link}
                  href={inspectinLogs?.next_page_url || '#'}
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

Logs.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default Logs
