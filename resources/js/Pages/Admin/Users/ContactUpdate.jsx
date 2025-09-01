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
  CFormTextarea,
  CFormSelect
} from '@coreui/react'
import { useForm, usePage } from '@inertiajs/react'
import DefaultLayout from '../../../layout/DefaultLayout'
import { route } from 'ziggy-js'

const Add = () => {
    const { props } = usePage()
    const { auth } = props
    const { data, setData, post, processing, errors } = useForm({
    name: props?.contactDetails?.name || '',
    email: props?.contactDetails?.email || '',
    phone_no: props?.contactDetails?.phone_no || '',
    service_type: props?.contactDetails?.service_type || '',
    assign: props?.contactDetails?.assign || '',
    notes: props?.contactDetails?.notes || '',
    description: props?.contactDetails?.description || '',
    seen_status: props?.contactDetails?.seen_status || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route(`admin.contact-update`,{id:props.id}))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Inquiry Details</strong> <small>{props.id == 0 ? 'Add' : 'Edit'}</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormInput
                required
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
                required
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
                required
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
                required
                  type="text"
                  id="inputServiceType"
                  label="Service Type"
                  value={data.service_type}
                  onChange={(e) => setData('service_type', e.target.value)}
                  invalid={!!errors.service_type}
                  feedbackInvalid={errors.service_type}
                />
              </CCol>

              <CCol md={4}>
                <CFormSelect
                
                    name="assign"
                    label="Assign User"
                    value={data.assign}
                    onChange={(e) => setData('assign', e.target.value)}
                    invalid={!!errors.assign}
                    feedbackInvalid={errors.assign}
                >
                <option value="">-- Select --</option>
                {props?.userOption?.map((user) => (
                    <option key={user.id} value={String(user.id)}>
                        {user.name}
                    </option>
                    ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                required
                    name="seen_status"
                    label="Status"
                    value={data.seen_status}
                    onChange={(e) => setData('seen_status', e.target.value)}
                    invalid={!!errors.seen_status}
                    feedbackInvalid={errors.seen_status}
                >
                <option value="">-- Select --</option>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="Seen">Seen</option>
                <option value="Not Seen">Not Seen</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Closed">Closed</option>
                </CFormSelect>
              </CCol>

              <CCol md={12}>
                <CFormTextarea
                  type="text"
                  id="inputnotes"
                  label="Notes"
                  value={data.notes}
                  onChange={(e) => setData('notes', e.target.value)}
                  invalid={!!errors.notes}
                  feedbackInvalid={errors.notes}
                />
              </CCol>
              
              <CCol md={12}>
                <CFormTextarea
                required
                  type="text"
                  id="inputdescription"
                  label="Description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  invalid={!!errors.description}
                  feedbackInvalid={errors.description}
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
