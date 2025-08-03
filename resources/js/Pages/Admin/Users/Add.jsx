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

const Add = () => {
    const { props } = usePage()
    const { auth } = props
    const { data, setData, post, processing, errors } = useForm({
    name: props?.userDetails?.name || '',
    email: props?.userDetails?.email || '',
    phone_no: props?.userDetails?.phone_no || '',
    address: props?.userDetails?.address || '',
    address2: props?.userDetails?.address2 || '',
    city: props?.userDetails?.city || '',
    state: props?.userDetails?.state || '',
    zip: props?.userDetails?.zip || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route(`admin.users.add`,{type:props.type, id:props.id}))
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
                  label="Name"
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
                  type="number"
                  id="inputPhoneno"
                  label="Phone No."
                  value={data.phone_no}
                  onChange={(e) => setData('phone_no', e.target.value)}
                  invalid={!!errors.phone_no}
                  feedbackInvalid={errors.phone_no}
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

Add.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default Add
