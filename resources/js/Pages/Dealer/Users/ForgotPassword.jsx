import React from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import GuestLayout from '../../../layout/GuestLayout'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { route } from 'ziggy-js'

const ForgotPassword = () => {
  
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });
   
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('dealer.forgot-password')) // Laravel route name for login
    }
    
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              {/* Login Form */}
              <CCard className="p-4 flex-grow-1">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Forgot Password?</h1>
                    <p className="text-body-secondary">Type in your registered email to get a new password.</p>

                   
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                      />
                    </CInputGroup>
                    {errors.email && (
                      <div className="text-danger mb-2">{errors.email}</div>
                    )}

                   
        

                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={processing}>
                          {processing ? 'Verifying....' : 'Reset Password'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <Link href={route('inspector.login')}>
                          <CButton color="link" className="px-0">
                            Back To Login
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
ForgotPassword.layout = (page) => <GuestLayout>{page}</GuestLayout>
export default ForgotPassword
