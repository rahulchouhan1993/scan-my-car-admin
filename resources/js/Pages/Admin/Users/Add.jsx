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
    password: props?.userDetails?.password || '',
    phone_no: props?.userDetails?.phone_no || '',
    address: props?.userDetails?.address || '',
    address2: props?.userDetails?.address2 || '',
    city: props?.userDetails?.city || '',
    state: props?.userDetails?.state || '',
    zip: props?.userDetails?.zip || '',
    phone_no2: props?.userDetails?.phone_no2 || '',
    company_name: props?.userDetails?.company_name || '',
    buying_limit: props?.userDetails?.buying_limit || '',
    car_model: props?.userDetails?.car_model || '',
    model_year: props?.userDetails?.model_year || '',
    milage: props?.userDetails?.milage || '',
    account_manager: props?.userDetails?.account_manager || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route(`admin.users.add`,{id:props.id}))
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
                  label="Full Name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  invalid={!!errors.name}
                  feedbackInvalid={errors.name}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="inputCompany"
                  label="Company Name"
                  value={data.company_name}
                  onChange={(e) => setData('company_name', e.target.value)}
                  invalid={!!errors.company_name}
                  feedbackInvalid={errors.company_name}
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
                  id="inputbuyingLimit"
                  label="Buying Limit"
                  value={data.buying_limit}
                  onChange={(e) => setData('buying_limit', e.target.value)}
                  invalid={!!errors.buying_limit}
                  feedbackInvalid={errors.buying_limit}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="inputcarModel"
                  label="Car Model"
                  value={data.car_model}
                  onChange={(e) => setData('car_model', e.target.value)}
                  invalid={!!errors.car_model}
                  feedbackInvalid={errors.car_model}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="inputcarYear"
                  label="Model Year"
                  value={data.model_year}
                  onChange={(e) => setData('model_year', e.target.value)}
                  invalid={!!errors.model_year}
                  feedbackInvalid={errors.model_year}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="inputMilage"
                  label="Milage"
                  value={data.milage}
                  onChange={(e) => setData('milage', e.target.value)}
                  invalid={!!errors.milage}
                  feedbackInvalid={errors.milage}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="inputAccountManager"
                  label="Account Manager"
                  value={data.account_manager}
                  onChange={(e) => setData('account_manager', e.target.value)}
                  invalid={!!errors.account_manager}
                  feedbackInvalid={errors.account_manager}
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
