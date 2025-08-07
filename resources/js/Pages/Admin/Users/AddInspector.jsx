import React from 'react'

import {
  CCardBody,
  CCardHeader,
  CCard,
  CRow,
  CButton,
  CCol,
  CForm,
  CFormInput,
} from '@coreui/react'
import { useForm, usePage } from '@inertiajs/react'
import DefaultLayout from '../../../layout/DefaultLayout'
import { route } from 'ziggy-js'

const AddInspector = () => {
    const { props } = usePage()
    const { auth } = props
    const { data, setData, post, processing, errors } = useForm({
    name: props?.userDetails?.name || '',
    email: props?.userDetails?.email || '',
    password: props?.userDetails?.password || '',
    phone_no: props?.userDetails?.phone_no || '',
    address: props?.userDetails?.address || '',
    address2: props?.userDetails?.address2 || '',
    city: props?.userDetails?.city || '',
    state: props?.userDetails?.state || '',
    zip: props?.userDetails?.zip || '',
    phone_no2: props?.userDetails?.phone_no2 || '',
    branch_manager: props?.userDetails?.branch_manager || '',
    report_to: props?.userDetails?.report_to || '',
    work_type: props?.userDetails?.work_type || '',
    allocation_branch: props?.userDetails?.allocation_branch || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route(`admin.inspector.add`,{id:props.id}))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User</strong> <small>{props.id == 0 ? 'Add' : 'Edit'}</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="inputName"
                  label="Full name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  invalid={!!errors.name}
                  feedbackInvalid={errors.name}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="email"
                  id="inputEmail"
                  label="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  invalid={!!errors.email}
                  feedbackInvalid={errors.email}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="password"
                  id="inputPassword"
                  label="Password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  invalid={!!errors.password}
                  feedbackInvalid={errors.password}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="number"
                  id="inputPhoneno"
                  label="Phone No."
                  value={data.phone_no}
                  onChange={(e) => setData('phone_no', e.target.value)}
                  invalid={!!errors.phone_no}
                  feedbackInvalid={errors.phone_no}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="number"
                  id="inputPhoneno2"
                  label="Alt. Phone No."
                  value={data.phone_no2}
                  onChange={(e) => setData('phone_no2', e.target.value)}
                  invalid={!!errors.phone_no2}
                  feedbackInvalid={errors.phone_no2}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="branchManager"
                  label="Branch Manager"
                  value={data.branch_manager}
                  onChange={(e) => setData('branch_manager', e.target.value)}
                  invalid={!!errors.branch_manager}
                  feedbackInvalid={errors.branch_manager}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="reportTo"
                  label="Report To"
                  value={data.report_to}
                  onChange={(e) => setData('report_to', e.target.value)}
                  invalid={!!errors.report_to}
                  feedbackInvalid={errors.report_to}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="workType"
                  label="Work Type"
                  value={data.work_type}
                  onChange={(e) => setData('work_type', e.target.value)}
                  invalid={!!errors.work_type}
                  feedbackInvalid={errors.work_type}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="allocationBranch"
                  label="Allocation Branch"
                  value={data.allocation_branch}
                  onChange={(e) => setData('allocation_branch', e.target.value)}
                  invalid={!!errors.allocation_branch}
                  feedbackInvalid={errors.allocation_branch}
                />
              </CCol>

              <CCol xs={12}>
                <CFormInput
                  id="inputAddress"
                  label="Address"
                  value={data.address}
                  onChange={(e) => setData('address', e.target.value)}
                  invalid={!!errors.address}
                  feedbackInvalid={errors.address}
                />
              </CCol>
              <CCol xs={12}>
                <CFormInput
                  id="inputAddress2"
                  label="Address 2"
                  value={data.address2}
                  onChange={(e) => setData('address2', e.target.value)}
                  invalid={!!errors.address2}
                  feedbackInvalid={errors.address2}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  id="inputCity"
                  label="City"
                  value={data.city}
                  onChange={(e) => setData('city', e.target.value)}
                  invalid={!!errors.city}
                  feedbackInvalid={errors.city}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  id="inputState"
                  label="State"
                  value={data.state}
                  onChange={(e) => setData('state', e.target.value)}
                  invalid={!!errors.state}
                  feedbackInvalid={errors.state}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  id="inputZip"
                  label="Zip"
                  value={data.zip}
                  onChange={(e) => setData('zip', e.target.value)}
                  invalid={!!errors.zip}
                  feedbackInvalid={errors.zip}
                />
              </CCol>

              <CCol xs={12}>
                
                <CButton type="submit" color="primary" className="px-4" disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

AddInspector.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default AddInspector
