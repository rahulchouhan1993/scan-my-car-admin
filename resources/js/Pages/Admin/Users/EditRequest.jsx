import {
  CCardBody,
  CCardHeader,
  CCard,
  CRow,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import DefaultLayout from '../../../layout/DefaultLayout'
import { route } from 'ziggy-js'

const EditRequest = () => {
  const { props } = usePage();

  // Keep originals to compare later
  const initialStatus = String(props?.inspectionsDetail?.status ?? '')
  const initialInspectorId = String(props?.inspectionsDetail?.inspector_id ?? '')

  const { data, setData, post, processing, errors } = useForm({
    package_id: props?.inspectionsDetail?.package_id || '',
    full_name: props?.inspectionsDetail?.full_name || '',
    vehicle_make: props?.inspectionsDetail?.vehicle_make || '',
    vehicle_model: props?.inspectionsDetail?.vehicle_model || '',
    vehicle_year: props?.inspectionsDetail?.vehicle_year || '',
    fuel_type: props?.inspectionsDetail?.fuel_type || '',
    transmission: props?.inspectionsDetail?.transmission || '',
    mileage: props?.inspectionsDetail?.mileage || '',
    preferred_date: props?.inspectionsDetail?.preferred_date || '',
    preferred_time_slot: props?.inspectionsDetail?.preferred_time_slot || '',
    additional_notes: props?.inspectionsDetail?.additional_notes || '',
    contact_no: props?.inspectionsDetail?.contact_no || '',
    email: props?.inspectionsDetail?.email || '',
    address_line_1: props?.inspectionsDetail?.address_line_1 || '',
    address_line_2: props?.inspectionsDetail?.address_line_2 || '',
    car_parked: props?.inspectionsDetail?.car_parked || '',
    inspector_id: String(props?.inspectionsDetail?.inspector_id ?? ''),
    dealer_id: String(props?.inspectionsDetail?.dealer_id ?? ''),
    status: String(props?.inspectionsDetail?.status ?? ''),
    city: props?.inspectionsDetail?.city || '',
    pin_code: props?.inspectionsDetail?.pin_code || '',
    // identifier to send for logging
    change_identifier: '',
  })
  
  // Set identifier when status or inspector changes
  useEffect(() => {
    const statusChanged = String(data.status ?? '') !== initialStatus
    const inspectorChanged = String(data.inspector_id ?? '') !== initialInspectorId

    let id = ''
    if (statusChanged && inspectorChanged) id = 'status_and_inspector_changed'
    else if (statusChanged) id = 'status_changed'
    else if (inspectorChanged) id = 'inspector_changed'

    // Only update if necessary to avoid extra renders
    if (data.change_identifier !== id) {
      setData('change_identifier', id)
    }
  }, [data.status, data.inspector_id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route(`admin.inspections.add`, { id: props.inspectionsDetail.id }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Inspection Request 
              <small>{data.package_id === 1 && (
                " (Regular Package)"
              )}
              {data.package_id === 2 && (
                " (Comprehensive Package)"
              )}
              {data.package_id === 3 && (
                " (Ultra Package)"
              )}</small></strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="full_name"
                  label="Full Name"
                  value={data.full_name}
                  onChange={(e) => setData('full_name', e.target.value)}
                  invalid={!!errors.full_name}
                  feedbackInvalid={errors.full_name}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="email"
                  name="email"
                  label="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  invalid={!!errors.email}
                  feedbackInvalid={errors.email}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="tel"
                  label="Phone"
                  name="contact_no"
                  value={data.contact_no}
                  onChange={(e) => setData('contact_no', e.target.value)}
                  invalid={!!errors.contact_no}
                  feedbackInvalid={errors.contact_no}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  label="Address Line 1"
                  name="address_line_1"
                  value={data.address_line_1}
                  onChange={(e) => setData('address_line_1', e.target.value)}
                  invalid={!!errors.address_line_1}
                  feedbackInvalid={errors.address_line_1}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  label="Address Line 2"
                  name="address_line_2"
                  value={data.address_line_2}
                  onChange={(e) => setData('address_line_2', e.target.value)}
                  invalid={!!errors.address_line_2}
                  feedbackInvalid={errors.address_line_2}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  label="Pin Code"
                  name="pin_code"
                  value={data.pin_code}
                  onChange={(e) => setData('pin_code', e.target.value)}
                  invalid={!!errors.pin_code}
                  feedbackInvalid={errors.pin_code}
                />
              </CCol>

              <CCol md={4}>
                <CFormSelect
                    name="city"
                    label="City"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                    invalid={!!errors.city}
                    feedbackInvalid={errors.city}
                  >
                    <option value="">-- Select City --</option>
                    <option value="Abudhabi" disabled>Abudhabi (Not Serviceable)</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Fujeirah" disabled>Fujeirah (Not Serviceable)</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman" disabled>Ajman (Not Serviceable)</option>
                    <option value="Ras Al Khaimah" disabled>Ras Al Khaimah (Not Serviceable)</option>
                    <option value="Umm Al Quwain" disabled>Umm Al Quwain (Not Serviceable)</option>
                  </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="vehicle_make"
                  label="Vehicle Make"
                  value={data.vehicle_make}
                  onChange={(e) => setData('vehicle_make', e.target.value)}
                  invalid={!!errors.vehicle_make}
                  feedbackInvalid={errors.vehicle_make}
                >
                  <option value="">-- Select Vehicle Make --</option>
                  {[
                    'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Buick',
                    'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën', 'Dacia', 'Daewoo', 'Daihatsu', 'Dodge',
                    'Ferrari', 'Fiat', 'Ford', 'Geely', 'Genesis', 'GMC', 'Honda', 'Hummer', 'Hyundai',
                    'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'Kia', 'Koenigsegg', 'Lamborghini', 'Lancia',
                    'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Mahindra', 'Maruti Suzuki', 'Maserati',
                    'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'Nissan',
                    'Opel', 'Pagani', 'Peugeot', 'Plymouth', 'Pontiac', 'Porsche', 'Proton', 'Ram', 'Renault',
                    'Rolls-Royce', 'Rover', 'Saab', 'Saturn', 'Scion', 'SEAT', 'Škoda', 'Smart', 'SsangYong',
                    'Subaru', 'Suzuki', 'Tata', 'Tesla', 'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo'
                  ].map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  label="Vehicle Model"
                  name="vehicle_model"
                  value={data.vehicle_model}
                  onChange={(e) => setData('vehicle_model', e.target.value)}
                  invalid={!!errors.vehicle_model}
                  feedbackInvalid={errors.vehicle_model}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  label="Vehicle Year"
                  name="vehicle_year"
                  value={data.vehicle_year}
                  onChange={(e) => setData('vehicle_year', e.target.value)}
                  invalid={!!errors.vehicle_year}
                  feedbackInvalid={errors.vehicle_year}
                />
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="fuel_type"
                  label="Fuel Type"
                  value={data.fuel_type}
                  onChange={(e) => setData('fuel_type', e.target.value)}
                >
                  <option value="">-- Select Fuel Type --</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="transmission"
                  label="Transmission"
                  value={data.transmission}
                  onChange={(e) => setData('transmission', e.target.value)}
                >
                  <option value="">-- Select Transmission --</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="car_parked"
                  label="Where Is Car Parked?"
                  value={data.car_parked}
                  onChange={(e) => setData('car_parked', e.target.value)}
                >
                  <option value="">-- Where is the car parked? --</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Home">Home</option>
                  <option value="Parking basement">Parking basement</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="mileage"
                  label="Mileage"
                  value={data.mileage}
                  onChange={(e) => setData('mileage', e.target.value)}
                  invalid={!!errors.mileage}
                  feedbackInvalid={errors.mileage}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="date"
                  name="preferred_date"
                  label="Preferred Date"
                  value={data.preferred_date}
                  onChange={(e) => setData('preferred_date', e.target.value)}
                  invalid={!!errors.preferred_date}
                  feedbackInvalid={errors.preferred_date}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="time"
                  name="preferred_time_slot"
                  label="Preferred Time Slot"
                  min="10:00"
                  max="18:00"
                  step="1800"
                  value={data.preferred_time_slot}
                  onChange={(e) => setData('preferred_time_slot', e.target.value)}
                  invalid={!!errors.preferred_time_slot}
                  feedbackInvalid={errors.preferred_time_slot}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="additional_notes"
                  label="Additional Notes"
                  value={data.additional_notes}
                  onChange={(e) => setData('additional_notes', e.target.value)}
                  invalid={!!errors.additional_notes}
                  feedbackInvalid={errors.additional_notes}
                />
              </CCol>

              <hr />
                {Number(data.status) === 5 && (
                  <CCol md={4}>
                    <CFormSelect
                      name="dealer_id"
                      label="Assign Dealer"
                      value={String(data.dealer_id ?? "")}
                      onChange={(e) => {
                        const dealerId = e.target.value;
                        setData("dealer_id", dealerId);
                      }}
                      invalid={!!errors.dealer_id}
                      feedbackInvalid={errors.dealer_id}
                    >
                      <option value="">-- Select Dealer --</option>
                      {props?.alDealers?.map((user) => (
                        <option key={user.id} value={String(user.id)}>
                          {user.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                )}

               

              <CCol md={4}>
                <CFormSelect
                  name="inspector_id"
                  label="Assigned Inspector"
                  value={String(data.inspector_id ?? '')}
                  onChange={(e) => {
                    const inspectorId = e.target.value
                    setData('inspector_id', inspectorId)
                    if (inspectorId) {
                      setData('status', '1')
                    } else {
                      setData('status', '0') 
                    }
                  }}
                  invalid={!!errors.inspector_id}
                  feedbackInvalid={errors.inspector_id}
                >
                  <option value="">-- Select Inspector --</option>
                  {props?.alInspectors?.map((user) => (
                    <option key={user.id} value={String(user.id)}>
                      {user.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="status"
                  label="Status"
                  value={String(data.status ?? '')}
                  onChange={(e) => setData('status', e.target.value)}
                  invalid={!!errors.status}
                  feedbackInvalid={errors.status}
                >
                  <option value="0"  disabled={!!data.inspector_id}>Unassigned</option>
                  <option value="1" disabled={!data.inspector_id}>Assigned</option>
                  <option value="3"  disabled={!!data.inspector_id}>Cancelled</option>
                </CFormSelect>
              </CCol>

              {/* Hidden field to send the identifier for logs */}
              <input type="hidden" name="change_identifier" value={data.change_identifier} />

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

EditRequest.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default EditRequest
