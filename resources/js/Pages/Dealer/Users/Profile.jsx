import React from 'react'

import {
  CCardBody,
  CCardHeader,
  CCard,
  CRow,
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { useForm, usePage } from '@inertiajs/react'
import DefaultLayout from '../../../layout/DefaultLayout'
import { route } from 'ziggy-js'

const Profile = (props) => {
  const { auth } = usePage().props
  const { data, setData, post, processing, errors } = useForm({
    name: props?.userDetails?.name || '',
    email: props?.userDetails?.email || '',
    address: props?.userDetails?.address || '',
    address2: props?.userDetails?.address2 || '',
    city: props?.userDetails?.city || '',
    state: props?.userDetails?.state || '',
    zip: props?.userDetails?.zip || '',
    buying_limit: props?.userDetails?.buying_limit || '',
    car_model: props?.userDetails?.car_model || '',
    model_year: props?.userDetails?.model_year || '',
    milage: props?.userDetails?.milage || '',
    account_manager: props?.userDetails?.account_manager || '',
    check: false,
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route(`${auth?.user?.role}.profile`))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update</strong> <small>Profile</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={6}>
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
              <CCol md={6}>
                <CFormInput
                  type="email"
                  id="inputEmail4"
                  label="Email"
                  value={data.email}
                  disabled
                />
              </CCol>

              <CCol xs={12}>
                <CFormInput
                  id="inputAddress"
                  label="Address"
                  placeholder="1234 Main St"
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
                  placeholder="Apartment, studio, or floor"
                  value={data.address2}
                  onChange={(e) => setData('address2', e.target.value)}
                  invalid={!!errors.address2}
                  feedbackInvalid={errors.address2}
                />
              </CCol>
              <CCol md={6}>
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
                <CFormSelect
                  id="inputState"
                  label="State"
                  value={data.state}
                  onChange={(e) => setData('state', e.target.value)}
                  invalid={!!errors.state}
                  feedbackInvalid={errors.state}
                >
                  <option>Choose...</option>
                  <option>UAE</option>
                  <option>Dubai</option>
                </CFormSelect>
              </CCol>
              <CCol md={2}>
                <CFormInput
                  id="inputZip"
                  label="Zip"
                  value={data.zip}
                  onChange={(e) => setData('zip', e.target.value)}
                  invalid={!!errors.zip}
                  feedbackInvalid={errors.zip}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  id="buyingLimit"
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
                  id="car_model"
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
                  id="model_year"
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
                  id="milage"
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
                  id="account_manager"
                  label="Account Manager"
                  value={data.account_manager}
                  onChange={(e) => setData('account_manager', e.target.value)}
                  invalid={!!errors.account_manager}
                  feedbackInvalid={errors.account_manager}
                />
              </CCol>

              <CCol xs={12}>
                <CFormCheck
                  type="checkbox"
                  id="gridCheck"
                  label="Change Password"
                  checked={data.check}
                  onChange={(e) => setData('check', e.target.checked)}
                />
              </CCol>

              {data.check && (
                <>
                  <CCol md={6}>
                    <CFormInput
                      type="password"
                      id="passwordInput"
                      label="Password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      required
                      invalid={!!errors.password}
                      feedbackInvalid={errors.password}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="password"
                      id="confirmpasswordInput"
                      label="Confirm Password"
                      value={data.confirmPassword}
                      onChange={(e) => setData('confirmPassword', e.target.value)}
                      required
                      invalid={!!errors.confirmPassword}
                      feedbackInvalid={errors.confirmPassword}
                    />
                  </CCol>
                </>
              )}

              <CCol xs={12}>
                <CButton color="primary" type="submit" disabled={processing}>
                  Update Profile
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Profile.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default Profile
