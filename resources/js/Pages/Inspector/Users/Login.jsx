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

const Login = () => {
  
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });
   
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('inspector.login')) // Laravel route name for login
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
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign in to your account</p>

                   
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

                   
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                      />
                    </CInputGroup>
                    {errors.password && (
                      <div className="text-danger mb-2">{errors.password}</div>
                    )}

                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={processing}>
                          {processing ? 'Logging in...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <Link href={route('inspector.forgot-password')}>
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              {/* Signup Card */}
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign Up</h2>
                    <p>
                      Create your account today and start your personalized coaching journey.
                    </p>
                    <Link href={route('inspector.login')}>
                      <CButton color="light" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
Login.layout = (page) => <GuestLayout>{page}</GuestLayout>
export default Login
