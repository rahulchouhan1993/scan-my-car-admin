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
import { useForm, usePage } from '@inertiajs/react'
import DefaultLayout from '../../../layout/DefaultLayout'
import { route } from 'ziggy-js'

const EditRequest = () => {
  const { props } = usePage();
   
  const { data, setData, post, processing, errors } = useForm({
    full_name: props?.inspectionsDetail?.full_name || '',
    vehicle_make: props?.inspectionsDetail?.vehicle_make || '',
    vehicle_model: props?.inspectionsDetail?.vehicle_model || '',
    vehicle_year: props?.inspectionsDetail?.vehicle_year || '',
    registration_number: props?.inspectionsDetail?.registration_number || '',
    vin: props?.inspectionsDetail?.vin || '',
    fuel_type: props?.inspectionsDetail?.fuel_type || '',
    transmission: props?.inspectionsDetail?.transmission || '',
    color: props?.inspectionsDetail?.color || '',
    mileage: props?.inspectionsDetail?.mileage || '',
    preferred_date: props?.inspectionsDetail?.preferred_date || '',
    preferred_time_slot: props?.inspectionsDetail?.preferred_time_slot || '',
    additional_notes: props?.inspectionsDetail?.additional_notes || '',
    contact_no: props?.inspectionsDetail?.contact_no || '',
    email: props?.inspectionsDetail?.email || '',
    address_line_1: props?.inspectionsDetail?.address_line_1 || '',
    address_line_2: props?.inspectionsDetail?.address_line_2 || '',
    car_parked: props?.inspectionsDetail?.car_parked || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route(`admin.users.add`, { id: props.id }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Inspection Request</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
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
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  invalid={!!errors.email}
                  feedbackInvalid={errors.email}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="tel"
                  placeholder="Phone"
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
                  placeholder="Address Line 1"
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
                  placeholder="Address Line 2"
                  name="address_line_2"
                  value={data.address_line_2}
                  onChange={(e) => setData('address_line_2', e.target.value)}
                  invalid={!!errors.address_line_2}
                  feedbackInvalid={errors.address_line_2}
                />
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="vehicle_make"
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
                  placeholder="Vehicle Model"
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
                  placeholder="Vehicle Year"
                  name="vehicle_year"
                  value={data.vehicle_year}
                  onChange={(e) => setData('vehicle_year', e.target.value)}
                  invalid={!!errors.vehicle_year}
                  feedbackInvalid={errors.vehicle_year}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="Registration Number"
                  name="registration_number"
                  value={data.registration_number}
                  onChange={(e) => setData('registration_number', e.target.value)}
                  invalid={!!errors.registration_number}
                  feedbackInvalid={errors.registration_number}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="VIN"
                  name="vin"
                  value={data.vin}
                  onChange={(e) => setData('vin', e.target.value)}
                  invalid={!!errors.vin}
                  feedbackInvalid={errors.vin}
                />
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="fuel_type"
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
                  value={data.transmission}
                  onChange={(e) => setData('transmission', e.target.value)}
                >
                  <option value="">-- Select Transmission --</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="color"
                  placeholder="Vehicle Color"
                  value={data.color}
                  onChange={(e) => setData('color', e.target.value)}
                  invalid={!!errors.color}
                  feedbackInvalid={errors.color}
                />
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="car_parked"
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
                  placeholder="Mileage"
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
                  placeholder="Preferred Date"
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
                  placeholder="Preferred Time Slot"
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
                  placeholder="Additional Notes"
                  value={data.additional_notes}
                  onChange={(e) => setData('additional_notes', e.target.value)}
                  invalid={!!errors.additional_notes}
                  feedbackInvalid={errors.additional_notes}
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

EditRequest.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default EditRequest
