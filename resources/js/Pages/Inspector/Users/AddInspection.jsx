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
  CFormSwitch
} from '@coreui/react'
import { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import DefaultLayout from '../../../layout/DefaultLayout'
import { route } from 'ziggy-js'

const AddInspection = () => {
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
    status: String(props?.inspectionsDetail?.status ?? ''),
    city: props?.inspectionsDetail?.city || '',
    pin_code: props?.inspectionsDetail?.pin_code || '',
    // identifier to send for logging
    change_identifier: '',
    body_condition: {},
    brake_system: {}
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
    post(route(`inspector.inspections.add`, { id: props.inspectionsDetail.id }))
  }

  return (
  <CRow>
    <CForm onSubmit={handleSubmit}>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer Details</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormInput
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
                label="City"
                value={data.city}
                onChange={(e) => setData('city', e.target.value)}
                invalid={!!errors.city}
                feedbackInvalid={errors.city}
                >
                <option value="">-- Select --</option>
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
                <CFormInput
                disabled
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
                disabled
                type="time"
                name="preferred_time_slot"
                label="Preferred Time Slot"
                value={data.preferred_time_slot}
                onChange={(e) => setData('preferred_time_slot', e.target.value)}
                invalid={!!errors.preferred_time_slot}
                feedbackInvalid={errors.preferred_time_slot}
                />
              </CCol>
            
            
              <CCol md={12}>
                <CFormInput
                disabled
                type="text"
                name="additional_notes"
                label="Additional Notes"
                value={data.additional_notes}
                onChange={(e) => setData('additional_notes', e.target.value)}
                invalid={!!errors.additional_notes}
                feedbackInvalid={errors.additional_notes}
                />
              </CCol>  
            </CRow>
            {/* <CCol xs={12}>
            <CButton type="submit" color="primary" className="px-4" disabled={processing}>
            {processing ? 'Saving...' : 'Save'}
            </CButton>
            </CCol> */}
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Vehicle Details</strong>
          </CCardHeader>
        <CCardBody>
          <CRow className='g-3'>
            <CCol md={4}>
              <CFormSelect
              disabled
              name="vehicle_make"
              label="Vehicle Make"
              value={data.vehicle_make}
              onChange={(e) => setData('vehicle_make', e.target.value)}
              invalid={!!errors.vehicle_make}
              feedbackInvalid={errors.vehicle_make}
              >
              <option value="">-- Select --</option>
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
              disabled
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
              disabled
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
              disabled
              name="fuel_type"
              label="Fuel Type"
              value={data.fuel_type}
              onChange={(e) => setData('fuel_type', e.target.value)}
              >
              <option value="">-- Select --</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
              disabled
              name="transmission"
              label="Transmission"
              value={data.transmission}
              onChange={(e) => setData('transmission', e.target.value)}
              >
              <option value="">-- Select --</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
              disabled
              name="car_parked"
              label="Where Is Car Parked?"
              value={data.car_parked}
              onChange={(e) => setData('car_parked', e.target.value)}
              >
              <option value="">-- Select --</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Showroom">Showroom</option>
              <option value="Home">Home</option>
              <option value="Parking basement">Parking basement</option>
              </CFormSelect>
            </CCol>
          
            <CCol md={4}>
              <CFormInput
              disabled
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
                disabled
                type="text"
                name="engine_capacity"
                label="Engine Capacity(L)"
                value={data.engine_capacity}
                onChange={(e) => setData('engine_capacity', e.target.value)}
                invalid={!!errors.engine_capacity}
                feedbackInvalid={errors.engine_capacity}
              />
            </CCol>
             <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="engine_cylinders"
                label=" Engine Cylinders"
                value={data.engine_cylinders}
                onChange={(e) => setData('engine_cylinders', e.target.value)}
                invalid={!!errors.engine_cylinders}
                feedbackInvalid={errors.engine_cylinders}
              />
            </CCol>
         
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="drive_type"
                label="Drive Type"
                value={data.drive_type}
                onChange={(e) => setData('drive_type', e.target.value)}
                invalid={!!errors.drive_type}
                feedbackInvalid={errors.drive_type}
              />
            </CCol>

            <CCol md={4}>
              <CFormSelect
                disabled
                name="drive_type"
                label="Drive Type"
                value={data.drive_type}
                onChange={(e) => setData('drive_type', e.target.value)}
                >
                <option value="">-- Select --</option>
                <option value="2WD">2WD</option>
                <option value="4WD">4WD</option>
                <option value="AWD">AWD</option>
                </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                disabled
                name="body_type"
                label="Body Type"
                value={data.body_type}
                onChange={(e) => setData('body_type', e.target.value)}
                >
                <option value="">-- Select --</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
              </CFormSelect>
            </CCol>
          
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="exterior_color"
                label="Exterior Color"
                value={data.exterior_color}
                onChange={(e) => setData('exterior_color', e.target.value)}
                invalid={!!errors.exterior_color}
                feedbackInvalid={errors.exterior_color}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="interior_color"
                label="Interior Colour/Trim"
                value={data.interior_color}
                onChange={(e) => setData('interior_color', e.target.value)}
                invalid={!!errors.interior_color}
                feedbackInvalid={errors.interior_color}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="number_keys"
                label="Number of Keys"
                value={data.number_keys}
                onChange={(e) => setData('number_keys', e.target.value)}
                invalid={!!errors.number_keys}
                feedbackInvalid={errors.number_keys}
              />
            </CCol>
          
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="service_history"
                label="Service History Summary"
                value={data.service_history}
                onChange={(e) => setData('service_history', e.target.value)}
                invalid={!!errors.service_history}
                feedbackInvalid={errors.service_history}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                disabled
                type="date"
                name="last_service_date"
                label="Last Service Date"
                value={data.last_service_date}
                onChange={(e) => setData('last_service_date', e.target.value)}
                invalid={!!errors.last_service_date}
                feedbackInvalid={errors.last_service_date}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="registration_emirate"
                label="Registration Emirate"
                value={data.registration_emirate}
                onChange={(e) => setData('registration_emirate', e.target.value)}
                invalid={!!errors.registration_emirate}
                feedbackInvalid={errors.registration_emirate}
              />
            </CCol>
          
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="warranty_status"
                label="Warranty Status"
                value={data.warranty_status}
                onChange={(e) => setData('warranty_status', e.target.value)}
                invalid={!!errors.warranty_status}
                feedbackInvalid={errors.warranty_status}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="plate_type"
                label="Plate Type"
                value={data.plate_type}
                onChange={(e) => setData('plate_type', e.target.value)}
                invalid={!!errors.plate_type}
                feedbackInvalid={errors.plate_type}
              />
            </CCol>

            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="registration_number"
                label="Registration Number"
                value={data.registration_number}
                onChange={(e) => setData('registration_number', e.target.value)}
                invalid={!!errors.registration_number}
                feedbackInvalid={errors.registration_number}
              />
            </CCol>
          
            <CCol md={4}>
              <CFormInput
                disabled
                type="text"
                name="chasis_no"
                label="Chasis Number"
                value={data.chasis_no}
                onChange={(e) => setData('chasis_no', e.target.value)}
                invalid={!!errors.chasis_no}
                feedbackInvalid={errors.chasis_no}
              />
            </CCol>
          </CRow>
        </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Body Details</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>

              <CCol md={4}>
                <CFormSwitch name="body_condition[front_bumper]" value={data.body_condition.front_bumper} onChange={(e) => setData('body_condition.front_bumper', e.target.checked)} label="Front bumper fit & alignment" id="check_1"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[rear_bumper]" value={data.body_condition.rear_bumper} onChange={(e) => setData('body_condition.rear_bumper', e.target.checked)} label="Rear bumper fit & alignment" id="check_2"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[bonnet]" value={data.body_condition.bonnet} onChange={(e) => setData('body_condition.bonnet', e.target.checked)} label="Bonnet fit & latch" id="check_3"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[boot_lid]" value={data.body_condition.boot_lid} onChange={(e) => setData('body_condition.boot_lid', e.target.checked)} label="Boot lid fit & latch" id="check_4"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[left_front_wing]" value={data.body_condition.left_front_wing} onChange={(e) => setData('body_condition.left_front_wing', e.target.checked)} label="Left front wing fit" id="check_5"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[right_front_wing]" value={data.body_condition.right_front_wing} onChange={(e) => setData('body_condition.right_front_wing', e.target.checked)} label="Right front wing fit" id="check_6"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[left_front_door_fit]" value={data.body_condition.left_front_door_fit} onChange={(e) => setData('body_condition.left_front_door_fit', e.target.checked)} label="Left front door fit" id="check_6"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[right_front_wing_fit]" value={data.body_condition.right_front_wing_fit} onChange={(e) => setData('body_condition.right_front_wing_fit', e.target.checked)} label="Right front wing fit" id="check_1"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[left_front_door_fit]" value={data.body_condition.left_front_door_fit} onChange={(e) => setData('body_condition.left_front_door_fit', e.target.checked)} label="Left front door fit" id="check_2"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[right_front_door_fit]" value={data.body_condition.right_front_door_fit} onChange={(e) => setData('body_condition.right_front_door_fit', e.target.checked)} label="Right front door fit" id="check_3"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[left_rear_door_fit]" value={data.body_condition.left_rear_door_fit} onChange={(e) => setData('body_condition.left_rear_door_fit', e.target.checked)} label="Left rear door fit" id="check_4"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[right_rear_door_fit]" value={data.body_condition.right_rear_door_fit} onChange={(e) => setData('body_condition.right_rear_door_fit', e.target.checked)} label="Right rear door fit" id="check_5"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[left_rear_quarter_panel_fit]" value={data.body_condition.left_rear_quarter_panel_fit} onChange={(e) => setData('body_condition.left_rear_quarter_panel_fit', e.target.checked)} label="Left rear quarter panel fit" id="check_6"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[right_rear_quarter_panel_fit]" value={data.body_condition.right_rear_quarter_panel_fit} onChange={(e) => setData('body_condition.right_rear_quarter_panel_fit', e.target.checked)} label="Right rear quarter panel fit" id="check_7"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[roof_panel_alignment]" value={data.body_condition.roof_panel_alignment} onChange={(e) => setData('body_condition.roof_panel_alignment', e.target.checked)} label="Roof panel alignment" id="check_8"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[fender_mounting_condition]" value={data.body_condition.fender_mounting_condition} onChange={(e) => setData('body_condition.fender_mounting_condition', e.target.checked)} label="Fender mounting & condition" id="check_9"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[panel_gap_uniformity]" value={data.body_condition.panel_gap_uniformity} onChange={(e) => setData('body_condition.panel_gap_uniformity', e.target.checked)} label="Panel gap uniformity" id="check_10"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[external_trim_condition]" value={data.body_condition.external_trim_condition} onChange={(e) => setData('body_condition.external_trim_condition', e.target.checked)} label="External trim condition" id="check_11"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[molding_clips_present]" value={data.body_condition.molding_clips_present} onChange={(e) => setData('body_condition.molding_clips_present', e.target.checked)} label="Molding & clips present" id="check_12"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[door_seals_fitment]" value={data.body_condition.door_seals_fitment} onChange={(e) => setData('body_condition.door_seals_fitment', e.target.checked)} label="Door seals fitment" id="check_13"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[boot_seal_fitment]" value={data.body_condition.boot_seal_fitment} onChange={(e) => setData('body_condition.boot_seal_fitment', e.target.checked)} label="Boot seal fitment" id="check_14"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[fuel_filler_door_operation]" value={data.body_condition.fuel_filler_door_operation} onChange={(e) => setData('body_condition.fuel_filler_door_operation', e.target.checked)} label="Fuel filler door operation" id="check_15"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[body_fasteners_intact]" value={data.body_condition.body_fasteners_intact} onChange={(e) => setData('body_condition.body_fasteners_intact', e.target.checked)} label="Body fasteners intact" id="check_16"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[tow_eye_point_secure]" value={data.body_condition.tow_eye_point_secure} onChange={(e) => setData('body_condition.tow_eye_point_secure', e.target.checked)} label="Tow eye/point present & secure" id="check_17"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[bumper_reinforcement_visible]" value={data.body_condition.bumper_reinforcement_visible} onChange={(e) => setData('body_condition.bumper_reinforcement_visible', e.target.checked)} label="Bumper reinforcement visible" id="check_18"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[undercarriage_guards]" value={data.body_condition.undercarriage_guards} onChange={(e) => setData('body_condition.undercarriage_guards', e.target.checked)} label="Undercarriage guards" id="check_19"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[panel_repair_signs]" value={data.body_condition.panel_repair_signs} onChange={(e) => setData('body_condition.panel_repair_signs', e.target.checked)} label="Panel repair signs" id="check_20"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[exterior_accessory_fitment]" value={data.body_condition.exterior_accessory_fitment} onChange={(e) => setData('body_condition.exterior_accessory_fitment', e.target.checked)} label="Exterior accessory fitment" id="check_21"/>
              </CCol>
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Glass & Mirrors</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>

              <CCol md={4}>
                <CFormSelect
                  name="windshield_condition"
                  label="Windshield Condition"
                  value={data.windshield_condition}
                  onChange={(e) => setData('windshield_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="No damage / Excellent condition">No damage / Excellent condition</option>
                  <option value="Minor scratches">Minor scratches</option>
                  <option value="Chips present">Chips present</option>
                  <option value="Cracks present">Cracks present</option>
                  <option value="Hazy / Reduced visibility">Hazy / Reduced visibility</option>
                  <option value="Loose / Improper fitment">Loose / Improper fitment</option>
                  <option value="Repaired (chip/crack repair visible)">Repaired (chip/crack repair visible)</option>
                  <option value="Replacement recommended">Replacement recommended</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="windshield_wiper_function"
                  label="Windshield Wiper Function"
                  value={data.windshield_wiper_function}
                  onChange={(e) => setData('windshield_wiper_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Working properly">Working properly</option>
                  <option value="Slow / irregular movement">Slow / irregular movement</option>
                  <option value="Not working">Not working</option>
                  <option value="Noise during operation">Noise during operation</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="wiper_blade_wear"
                  label="Wiper Blade Wear"
                  value={data.wiper_blade_wear}
                  onChange={(e) => setData('wiper_blade_wear', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Good condition">Good condition</option>
                  <option value="Slight wear">Slight wear</option>
                  <option value="Moderate wear">Moderate wear</option>
                  <option value="Heavy wear / Replacement required">Heavy wear / Replacement required</option>
                </CFormSelect>
              </CCol>
              
            
              <CCol md={4}>
                <CFormSelect
                  name="rear_wiper_function"
                  label="Rear Wiper Function"
                  value={data.rear_wiper_function}
                  onChange={(e) => setData('rear_wiper_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Working properly">Working properly</option>
                  <option value="Slow / irregular movement">Slow / irregular movement</option>
                  <option value="Not working">Not working</option>
                  <option value="Noise during operation">Noise during operation</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="side_window_operation_lf"
                  label="Side Window Operation (LF)"
                  value={data.side_window_operation_lf}
                  onChange={(e) => setData('side_window_operation_lf', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Smooth operation">Smooth operation</option>
                  <option value="Slow movement">Slow movement</option>
                  <option value="Stuck / jammed">Stuck / jammed</option>
                  <option value="Motor noise present">Motor noise present</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="side_window_operation_rf"
                  label="Side Window Operation (RF)"
                  value={data.side_window_operation_rf}
                  onChange={(e) => setData('side_window_operation_rf', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Smooth operation">Smooth operation</option>
                  <option value="Slow movement">Slow movement</option>
                  <option value="Stuck / jammed">Stuck / jammed</option>
                  <option value="Motor noise present">Motor noise present</option>
                </CFormSelect>
              </CCol>
              
           

              <CCol md={4}>
                <CFormSelect
                  name="side_window_operation_lr"
                  label="Side Window Operation (LR)"
                  value={data.side_window_operation_lr}
                  onChange={(e) => setData('side_window_operation_lr', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Smooth operation">Smooth operation</option>
                  <option value="Slow movement">Slow movement</option>
                  <option value="Stuck / jammed">Stuck / jammed</option>
                  <option value="Motor noise present">Motor noise present</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="side_window_operation_rr"
                  label="Side Window Operation (RR)"
                  value={data.side_window_operation_rr}
                  onChange={(e) => setData('side_window_operation_rr', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Smooth operation">Smooth operation</option>
                  <option value="Slow movement">Slow movement</option>
                  <option value="Stuck / jammed">Stuck / jammed</option>
                  <option value="Motor noise present">Motor noise present</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="rear_window_condition"
                  label="Rear Window Condition"
                  value={data.rear_window_condition}
                  onChange={(e) => setData('rear_window_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="No damage / Excellent condition">No damage / Excellent condition</option>
                  <option value="Minor scratches">Minor scratches</option>
                  <option value="Chips present">Chips present</option>
                  <option value="Cracks present">Cracks present</option>
                  <option value="Tint / defogger working fine">Tint / defogger working fine</option>
                  <option value="Replacement recommended">Replacement recommended</option>
                </CFormSelect>
              </CCol>
              
            
              <CCol md={4}>
                <CFormSelect
                  name="sunroof_operation"
                  label="Sunroof Operation"
                  value={data.sunroof_operation}
                  onChange={(e) => setData('sunroof_operation', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Smooth operation">Smooth operation</option>
                  <option value="Slow / noisy operation">Slow / noisy operation</option>
                  <option value="Jammed / stuck">Jammed / stuck</option>
                  <option value="Not working">Not working</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="sunroof_drainage_check"
                  label="Sunroof Drainage Check"
                  value={data.sunroof_drainage_check}
                  onChange={(e) => setData('sunroof_drainage_check', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="No leakage / Proper drainage">No leakage / Proper drainage</option>
                  <option value="Minor clogging">Minor clogging</option>
                  <option value="Leakage detected">Leakage detected</option>
                  <option value="Drainage system blocked">Drainage system blocked</option>
                </CFormSelect>

              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="sunroof_glass_condition"
                  label="Sunroof Glass Condition"
                  value={data.sunroof_glass_condition}
                  onChange={(e) => setData('sunroof_glass_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Excellent / No damage">Excellent / No damage</option>
                  <option value="Minor scratches">Minor scratches</option>
                  <option value="Chips present">Chips present</option>
                  <option value="Cracks present">Cracks present</option>
                  <option value="Replacement recommended">Replacement recommended</option>
                </CFormSelect>

              </CCol>
              
           
              <CCol md={4}>
                <CFormSelect
                  name="left_external_mirror_function"
                  label="Left External Mirror Function"
                  value={data.left_external_mirror_function}
                  onChange={(e) => setData('left_external_mirror_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Fully functional">Fully functional</option>
                  <option value="Adjustment slow">Adjustment slow</option>
                  <option value="Mirror loose / vibrating">Mirror loose / vibrating</option>
                  <option value="Not functional">Not functional</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="right_external_mirror_function"
                  label="Right External Mirror Function"
                  value={data.right_external_mirror_function}
                  onChange={(e) => setData('right_external_mirror_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Fully functional">Fully functional</option>
                  <option value="Adjustment slow">Adjustment slow</option>
                  <option value="Mirror loose / vibrating">Mirror loose / vibrating</option>
                  <option value="Not functional">Not functional</option>
                </CFormSelect>

              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="mirror_adjustment_motors"
                  label="Mirror Adjustment Motors"
                  value={data.mirror_adjustment_motors}
                  onChange={(e) => setData('mirror_adjustment_motors', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Working properly">Working properly</option>
                  <option value="Slow movement">Slow movement</option>
                  <option value="Noisy operation">Noisy operation</option>
                  <option value="Not working">Not working</option>
                </CFormSelect>

              </CCol>
              
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Engine Bay</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>

              <CCol md={4}>
                <CFormSelect
                  name="engine_start_behavior_cold"
                  label="Engine start behavior (cold)"
                  value={data.engine_start_behavior_cold}
                  onChange={(e) => setData('engine_start_behavior_cold', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="engine_start_behavior_warm"
                  label="Engine start behavior (warm)"
                  value={data.engine_start_behavior_warm}
                  onChange={(e) => setData('engine_start_behavior_warm', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="idle_stability"
                  label="Idle stability"
                  value={data.idle_stability}
                  onChange={(e) => setData('idle_stability', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="throttle_response"
                  label="Throttle response"
                  value={data.throttle_response}
                  onChange={(e) => setData('throttle_response', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="abnormal_engine_noises"
                  label="Abnormal engine noises (tick/knock)"
                  value={data.abnormal_engine_noises}
                  onChange={(e) => setData('abnormal_engine_noises', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="engine_oil_level_check"
                  label="Engine oil level check"
                  value={data.engine_oil_level_check}
                  onChange={(e) => setData('engine_oil_level_check', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="engine_oil_appearance"
                  label="Engine oil appearance"
                  value={data.engine_oil_appearance}
                  onChange={(e) => setData('engine_oil_appearance', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="visible_oil_leaks"
                  label="Visible oil leaks around head/covers"
                  value={data.visible_oil_leaks}
                  onChange={(e) => setData('visible_oil_leaks', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="oil_filter_housing_condition"
                  label="Oil filter housing condition"
                  value={data.oil_filter_housing_condition}
                  onChange={(e) => setData('oil_filter_housing_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="coolant_level_check"
                  label="Coolant level check"
                  value={data.coolant_level_check}
                  onChange={(e) => setData('coolant_level_check', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="coolant_color"
                  label="Coolant color & contamination"
                  value={data.coolant_color}
                  onChange={(e) => setData('coolant_color', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="coolant_leaks"
                  label="Coolant leaks visible (hoses/rad)"
                  value={data.coolant_leaks}
                  onChange={(e) => setData('coolant_leaks', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="signs_of_coolant_in_oil"
                  label="Signs of coolant in oil (milky)"
                  value={data.signs_of_coolant_in_oil}
                  onChange={(e) => setData('signs_of_coolant_in_oil', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="hose_condition"
                  label="Hose condition & clamps"
                  value={data.hose_condition}
                  onChange={(e) => setData('hose_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="drive_belt_condition"
                  label="Drive belt tension & wear"
                  value={data.drive_belt_condition}
                  onChange={(e) => setData('drive_belt_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="timing_belt_condition"
                  label="Timing belt/chain visible condition"
                  value={data.timing_belt_condition}
                  onChange={(e) => setData('timing_belt_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="turbo_boost_check"
                  label="Turbocharger boost check"
                  value={data.turbo_boost_check}
                  onChange={(e) => setData('turbo_boost_check', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="air_intake_condition"
                  label="Air intake ducting condition"
                  value={data.air_intake_condition}
                  onChange={(e) => setData('air_intake_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="air_filter_element"
                  label="Air filter element"
                  value={data.air_filter_element}
                  onChange={(e) => setData('air_filter_element', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="starter_motor_cranking"
                  label="Starter motor cranking quality"
                  value={data.starter_motor_cranking}
                  onChange={(e) => setData('starter_motor_cranking', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="fuse_box_access"
                  label="Fuse box access"
                  value={data.fuse_box_access}
                  onChange={(e) => setData('fuse_box_access', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormInput
                  
                  type="text"
                  name="any_noice"
                  label="Any Noice"
                  value={data.any_noice}
                  onChange={(e) => setData('any_noice', e.target.value)}
                  invalid={!!errors.any_noice}
                  feedbackInvalid={errors.any_noice}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  
                  type="text"
                  name="comments_engine"
                  label="Comments"
                  value={data.comments_engine}
                  onChange={(e) => setData('comments_engine', e.target.value)}
                  invalid={!!errors.comments_engine}
                  feedbackInvalid={errors.comments_engine}
                />
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cluster & Lamps</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>

              <CCol md={4}>
                <CFormSelect
                  name="engine_light"
                  label="Engine light"
                  value={data.engine_light}
                  onChange={(e) => setData('engine_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="abs_light"
                  label="ABS light"
                  value={data.abs_light}
                  onChange={(e) => setData('abs_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="oil_pressure_light"
                  label="Oil pressure light"
                  value={data.oil_pressure_light}
                  onChange={(e) => setData('oil_pressure_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="battery_charging_system_light"
                  label="Battery/charging system light"
                  value={data.battery_charging_system_light}
                  onChange={(e) => setData('battery_charging_system_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="coolant_temperature_warning_light"
                  label="Coolant temperature warning light"
                  value={data.coolant_temperature_warning_light}
                  onChange={(e) => setData('coolant_temperature_warning_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system_warning_light"
                  label="Brake system warning light"
                  value={data.brake_system_warning_light}
                  onChange={(e) => setData('brake_system_warning_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="airbag_warning_light"
                  label="Airbag warning light"
                  value={data.airbag_warning_light}
                  onChange={(e) => setData('airbag_warning_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="seatbelt_reminder_light"
                  label="Seatbelt reminder light"
                  value={data.seatbelt_reminder_light}
                  onChange={(e) => setData('seatbelt_reminder_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="traction_control_light"
                  label="Traction control light"
                  value={data.traction_control_light}
                  onChange={(e) => setData('traction_control_light', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="tpms"
                  label="Tyre Pressure Monitoring System (TPMS)"
                  value={data.tpms}
                  onChange={(e) => setData('tpms', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Visible">Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </CFormSelect>
              </CCol>


              
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Transmission & Drivetrain</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>

             <CCol md={4}>
              <CFormSelect
                name="transmission_fluid_level_auto"
                label="Transmission fluid level (auto)"
                value={data.transmission_fluid_level_auto}
                onChange={(e) => setData('transmission_fluid_level_auto', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="transmission_fluid_condition_auto"
                label="Transmission fluid condition (auto)"
                value={data.transmission_fluid_condition_auto}
                onChange={(e) => setData('transmission_fluid_condition_auto', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="manual_gearbox_oil_check"
                label="Manual gearbox oil check (if access)"
                value={data.manual_gearbox_oil_check}
                onChange={(e) => setData('manual_gearbox_oil_check', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="transmission_mount_integrity"
                label="Transmission mount integrity"
                value={data.transmission_mount_integrity}
                onChange={(e) => setData('transmission_mount_integrity', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="gear_selection_smoothness"
                label="Gear selection smoothness"
                value={data.gear_selection_smoothness}
                onChange={(e) => setData('gear_selection_smoothness', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="clutch_bite_slippage"
                label="Clutch bite & slippage (manual)"
                value={data.clutch_bite_slippage}
                onChange={(e) => setData('clutch_bite_slippage', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="automatic_shift_quality"
                label="Automatic shift quality & hesitation"
                value={data.automatic_shift_quality}
                onChange={(e) => setData('automatic_shift_quality', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="transfer_case_engagement"
                label="Transfer case engagement (4x4)"
                value={data.transfer_case_engagement}
                onChange={(e) => setData('transfer_case_engagement', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="drive_shaft_visual_inspection"
                label="Drive shaft visual inspection"
                value={data.drive_shaft_visual_inspection}
                onChange={(e) => setData('drive_shaft_visual_inspection', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="cv_joint_boot_integrity"
                label="CV joint boot integrity (all shafts)"
                value={data.cv_joint_boot_integrity}
                onChange={(e) => setData('cv_joint_boot_integrity', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="u_joints_coupling_check"
                label="U-joints or coupling check"
                value={data.u_joints_coupling_check}
                onChange={(e) => setData('u_joints_coupling_check', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="differential_oil_condition"
                label="Differential oil condition (front/rear)"
                value={data.differential_oil_condition}
                onChange={(e) => setData('differential_oil_condition', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="differential_housing_leaks"
                label="Differential housing leaks"
                value={data.differential_housing_leaks}
                onChange={(e) => setData('differential_housing_leaks', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormInput
                
                type="text"
                name="gearbox_unusual_noise"
                label="Gearbox unusual noise under load"
                value={data.gearbox_unusual_noise}
                onChange={(e) => setData('gearbox_unusual_noise', e.target.value)}
                invalid={!!errors.gearbox_unusual_noise}
                feedbackInvalid={errors.gearbox_unusual_noise}
              />
            </CCol>

            <CCol md={4}>
              <CFormInput
                
                type="text"
                name="comments_transmission"
                label="Comments"
                value={data.comments_transmission}
                onChange={(e) => setData('comments_transmission', e.target.value)}
                invalid={!!errors.comments_transmission}
                feedbackInvalid={errors.comments_transmission}
              />
            </CCol>


              
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Suspension & Steering</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormSelect
                  name="front_strut_mount_condition"
                  label="Front strut mount condition"
                  value={data.front_strut_mount_condition}
                  onChange={(e) => setData('front_strut_mount_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="rear_strut_mount_condition"
                  label="Rear strut mount condition"
                  value={data.rear_strut_mount_condition}
                  onChange={(e) => setData('rear_strut_mount_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="front_shock_absorber_function"
                  label="Front shock absorber function"
                  value={data.front_shock_absorber_function}
                  onChange={(e) => setData('front_shock_absorber_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="rear_shock_absorber_function"
                  label="Rear shock absorber function"
                  value={data.rear_shock_absorber_function}
                  onChange={(e) => setData('rear_shock_absorber_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="front_spring_integrity"
                  label="Front spring integrity"
                  value={data.front_spring_integrity}
                  onChange={(e) => setData('front_spring_integrity', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="rear_spring_integrity"
                  label="Rear spring integrity"
                  value={data.rear_spring_integrity}
                  onChange={(e) => setData('rear_spring_integrity', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="control_arm_bush_condition"
                  label="Control arm bush condition"
                  value={data.control_arm_bush_condition}
                  onChange={(e) => setData('control_arm_bush_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="lower_ball_joint_play"
                  label="Lower ball joint play"
                  value={data.lower_ball_joint_play}
                  onChange={(e) => setData('lower_ball_joint_play', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="upper_ball_joint_play"
                  label="Upper ball joint play"
                  value={data.upper_ball_joint_play}
                  onChange={(e) => setData('upper_ball_joint_play', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="anti_roll_bar_links_bushes"
                  label="Anti-roll bar links & bushes"
                  value={data.anti_roll_bar_links_bushes}
                  onChange={(e) => setData('anti_roll_bar_links_bushes', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="steering_rack_seal_condition"
                  label="Steering rack seal condition"
                  value={data.steering_rack_seal_condition}
                  onChange={(e) => setData('steering_rack_seal_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="steering_rack_play_check"
                  label="Steering rack play check"
                  value={data.steering_rack_play_check}
                  onChange={(e) => setData('steering_rack_play_check', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="rack_end_condition"
                  label="Rack end condition"
                  value={data.rack_end_condition}
                  onChange={(e) => setData('rack_end_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="tie_rod_end_play"
                  label="Tie rod end play"
                  value={data.tie_rod_end_play}
                  onChange={(e) => setData('tie_rod_end_play', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="steering_column_noises"
                  label="Steering column noises"
                  value={data.steering_column_noises}
                  onChange={(e) => setData('steering_column_noises', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="power_steering_fluid_level_color"
                  label="Power steering fluid level & color"
                  value={data.power_steering_fluid_level_color}
                  onChange={(e) => setData('power_steering_fluid_level_color', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="power_steering_pump_noise"
                  label="Power steering pump noise"
                  value={data.power_steering_pump_noise}
                  onChange={(e) => setData('power_steering_pump_noise', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="subframe_mount_condition"
                  label="Subframe mount condition"
                  value={data.subframe_mount_condition}
                  onChange={(e) => setData('subframe_mount_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="chassis_mounts_security"
                  label="Chassis mounts security"
                  value={data.chassis_mounts_security}
                  onChange={(e) => setData('chassis_mounts_security', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="steering_wheel_free_play"
                  label="Steering wheel free play"
                  value={data.steering_wheel_free_play}
                  onChange={(e) => setData('steering_wheel_free_play', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormInput
                  
                  type="text"
                  name="comments_suspension"
                  label="Comments"
                  value={data.comments_suspension}
                  onChange={(e) => setData('comments_suspension', e.target.value)}
                  invalid={!!errors.comments_suspension}
                  feedbackInvalid={errors.comments_suspension}
                />
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Brakes</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormSelect
                  name="brake_system[master_cylinder_seal_condition]"
                  label="Master cylinder seal condition"
                  value={data.brake_system.master_cylinder_seal_condition}
                  onChange={(e) => setData('brake_system.master_cylinder_seal_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[brake_booster_operation]"
                  label="Brake booster operation"
                  value={data.brake_system.brake_booster_operation}
                  onChange={(e) => setData('brake_system.brake_booster_operation', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[front_disc_condition_runout]"
                  label="Front disc condition & runout"
                  value={data.brake_system.front_disc_condition_runout}
                  onChange={(e) => setData('brake_system.front_disc_condition_runout', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[rear_disc_drum_condition]"
                  label="Rear disc/drum condition"
                  value={data.brake_system.rear_disc_drum_condition}
                  onChange={(e) => setData('brake_system.rear_disc_drum_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[front_pad]"
                  label="Front pad"
                  value={data.brake_system.front_pad}
                  onChange={(e) => setData('brake_system.front_pad', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[rear_pad]"
                  label="Rear pad"
                  value={data.brake_system.rear_pad}
                  onChange={(e) => setData('brake_system.rear_pad', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[handbrake_adjustment_holding]"
                  label="Handbrake adjustment & holding"
                  value={data.brake_system.handbrake_adjustment_holding}
                  onChange={(e) => setData('brake_system.handbrake_adjustment_holding', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[abs_function_wheel_speed_check]"
                  label="ABS function / wheel speed check"
                  value={data.brake_system.abs_function_wheel_speed_check}
                  onChange={(e) => setData('brake_system.abs_function_wheel_speed_check', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[brake_pedal_travel_firmness]"
                  label="Brake pedal travel & firmness"
                  value={data.brake_system.brake_pedal_travel_firmness}
                  onChange={(e) => setData('brake_system.brake_pedal_travel_firmness', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="brake_system[brake_fluid_contamination_test_note]"
                  label="Brake fluid contamination test note"
                  value={data.brake_system.brake_fluid_contamination_test_note}
                  onChange={(e) => setData('brake_system.brake_fluid_contamination_test_note', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>



              <CCol md={4}>
                <CFormInput
                  
                  type="text"
                  name="comments_brakes"
                  label="Comments"
                  value={data.comments_brakes}
                  onChange={(e) => setData('comments_brakes', e.target.value)}
                  invalid={!!errors.comments_brakes}
                  feedbackInvalid={errors.comments_brakes}
                />
              </CCol>
              
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tyres</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_brand_size_lf"
                  label="Tyre brand & size (LF)"
                  value={data.tyre_brand_size_lf}
                  onChange={(e) => setData('tyre_brand_size_lf', e.target.value)}
                  invalid={!!errors.tyre_brand_size_lf}
                  feedbackInvalid={errors.tyre_brand_size_lf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_brand_size_rf"
                  label="Tyre brand & size (RF)"
                  value={data.tyre_brand_size_rf}
                  onChange={(e) => setData('tyre_brand_size_rf', e.target.value)}
                  invalid={!!errors.tyre_brand_size_rf}
                  feedbackInvalid={errors.tyre_brand_size_rf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_brand_size_lr"
                  label="Tyre brand & size (LR)"
                  value={data.tyre_brand_size_lr}
                  onChange={(e) => setData('tyre_brand_size_lr', e.target.value)}
                  invalid={!!errors.tyre_brand_size_lr}
                  feedbackInvalid={errors.tyre_brand_size_lr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_brand_size_rr"
                  label="Tyre brand & size (RR)"
                  value={data.tyre_brand_size_rr}
                  onChange={(e) => setData('tyre_brand_size_rr', e.target.value)}
                  invalid={!!errors.tyre_brand_size_rr}
                  feedbackInvalid={errors.tyre_brand_size_rr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_manufacture_date_lf"
                  label="Tyre manufacture date (LF)"
                  value={data.tyre_manufacture_date_lf}
                  onChange={(e) => setData('tyre_manufacture_date_lf', e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_lf}
                  feedbackInvalid={errors.tyre_manufacture_date_lf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_manufacture_date_rf"
                  label="Tyre manufacture date (RF)"
                  value={data.tyre_manufacture_date_rf}
                  onChange={(e) => setData('tyre_manufacture_date_rf', e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_rf}
                  feedbackInvalid={errors.tyre_manufacture_date_rf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_manufacture_date_lr"
                  label="Tyre manufacture date (LR)"
                  value={data.tyre_manufacture_date_lr}
                  onChange={(e) => setData('tyre_manufacture_date_lr', e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_lr}
                  feedbackInvalid={errors.tyre_manufacture_date_lr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tyre_manufacture_date_rr"
                  label="Tyre manufacture date (RR)"
                  value={data.tyre_manufacture_date_rr}
                  onChange={(e) => setData('tyre_manufacture_date_rr', e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_rr}
                  feedbackInvalid={errors.tyre_manufacture_date_rr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tread_depth_lf"
                  label="Tread depth (LF)"
                  value={data.tread_depth_lf}
                  onChange={(e) => setData('tread_depth_lf', e.target.value)}
                  invalid={!!errors.tread_depth_lf}
                  feedbackInvalid={errors.tread_depth_lf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tread_depth_rf"
                  label="Tread depth (RF)"
                  value={data.tread_depth_rf}
                  onChange={(e) => setData('tread_depth_rf', e.target.value)}
                  invalid={!!errors.tread_depth_rf}
                  feedbackInvalid={errors.tread_depth_rf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tread_depth_lr"
                  label="Tread depth (LR)"
                  value={data.tread_depth_lr}
                  onChange={(e) => setData('tread_depth_lr', e.target.value)}
                  invalid={!!errors.tread_depth_lr}
                  feedbackInvalid={errors.tread_depth_lr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="tread_depth_rr"
                  label="Tread depth (RR)"
                  value={data.tread_depth_rr}
                  onChange={(e) => setData('tread_depth_rr', e.target.value)}
                  invalid={!!errors.tread_depth_rr}
                  feedbackInvalid={errors.tread_depth_rr}
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="tyre_pressure"
                  label="Tyre pressure (LF/RF/LR/RR)"
                  value={data.tyre_pressure}
                  onChange={(e) => setData('tyre_pressure', e.target.value)}
                  invalid={!!errors.tyre_pressure}
                  feedbackInvalid={errors.tyre_pressure}
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="spare_wheel_condition"
                  label="Spare wheel presence & condition"
                  value={data.spare_wheel_condition}
                  onChange={(e) => setData('spare_wheel_condition', e.target.value)}
                  invalid={!!errors.spare_wheel_condition}
                  feedbackInvalid={errors.spare_wheel_condition}
                />
              </CCol>

              <CCol md={12}>
                <CFormInput
                  type="text"
                  name="tyre_comment"
                  label="Comment"
                  value={data.tyre_comment}
                  onChange={(e) => setData('tyre_comment', e.target.value)}
                  invalid={!!errors.tyre_comment}
                  feedbackInvalid={errors.tyre_comment}
                />
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>


        <CCard className="mb-4">
          <CCardHeader>
            <strong>Interior General</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
              <CFormSelect
                name="dashboard_fit_finish"
                label="Dashboard fit & finish"
                value={data.dashboard_fit_finish}
                onChange={(e) => setData('dashboard_fit_finish', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="instrument_cluster_illumination"
                label="Instrument cluster illumination"
                value={data.instrument_cluster_illumination}
                onChange={(e) => setData('instrument_cluster_illumination', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="warning_lights_active_start"
                label="Warning lights active on start"
                value={data.warning_lights_active_start}
                onChange={(e) => setData('warning_lights_active_start', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="odometer_function"
                label="Odometer function"
                value={data.odometer_function}
                onChange={(e) => setData('odometer_function', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="interior_lighting"
                label="Interior lighting (dome/map)"
                value={data.interior_lighting}
                onChange={(e) => setData('interior_lighting', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="glove_box_latching"
                label="Glove box latching"
                value={data.glove_box_latching}
                onChange={(e) => setData('glove_box_latching', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="carpet_wear_retention"
                label="Carpet wear & retention"
                value={data.carpet_wear_retention}
                onChange={(e) => setData('carpet_wear_retention', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="interior_contamination_odour"
                label="Interior contamination/odour check"
                value={data.interior_contamination_odour}
                onChange={(e) => setData('interior_contamination_odour', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
                name="trunk_boot_interior_condition"
                label="Trunk/boot interior condition"
                value={data.trunk_boot_interior_condition}
                onChange={(e) => setData('trunk_boot_interior_condition', e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Normal">Normal</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </CFormSelect>
            </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>


        <CCard className="mb-4">
          <CCardHeader>
            <strong>Seats & Restraints</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormSelect
                  name="driver_seat_adjust_locks"
                  label="Driver seat adjust & locks"
                  value={data.driver_seat_adjust_locks}
                  onChange={(e) => setData('driver_seat_adjust_locks', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="passenger_seat_adjust_locks"
                  label="Passenger seat adjust & locks"
                  value={data.passenger_seat_adjust_locks}
                  onChange={(e) => setData('passenger_seat_adjust_locks', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="seat_sliding_rails"
                  label="Seat sliding rails lubrication & function"
                  value={data.seat_sliding_rails}
                  onChange={(e) => setData('seat_sliding_rails', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="seat_cushion_wear"
                  label="Seat cushion wear"
                  value={data.seat_cushion_wear}
                  onChange={(e) => setData('seat_cushion_wear', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="seat_upholstery_integrity"
                  label="Seat upholstery integrity (front/rear)"
                  value={data.seat_upholstery_integrity}
                  onChange={(e) => setData('seat_upholstery_integrity', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>


         <CCard className="mb-4">
          <CCardHeader>
            <strong>HVAC & Infotainment</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormSelect
                  name="air_condition"
                  label="Air Condition"
                  value={data.air_condition}
                  onChange={(e) => setData('air_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="radio_condition"
                  label="Radio Condition"
                  value={data.radio_condition}
                  onChange={(e) => setData('radio_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="heating_cooling_system"
                  label="Heating/ Cooling System"
                  value={data.heating_cooling_system}
                  onChange={(e) => setData('heating_cooling_system', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>


        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cooling & Fuel System</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormSelect
                  name="radiator_core_condition"
                  label="Radiator core condition"
                  value={data.radiator_core_condition}
                  onChange={(e) => setData('radiator_core_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="radiator_fan_operation"
                  label="Radiator fan operation (low/high speed)"
                  value={data.radiator_fan_operation}
                  onChange={(e) => setData('radiator_fan_operation', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="cycling_observation"
                  label="Cycling observation"
                  value={data.cycling_observation}
                  onChange={(e) => setData('cycling_observation', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="overflow_expansion_tank_condition"
                  label="Overflow/expansion tank condition"
                  value={data.overflow_expansion_tank_condition}
                  onChange={(e) => setData('overflow_expansion_tank_condition', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="heater_core_performance"
                  label="Heater core performance (cab heat)"
                  value={data.heater_core_performance}
                  onChange={(e) => setData('heater_core_performance', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="fuel_tank_inspection"
                  label="Fuel tank inspection (visual)"
                  value={data.fuel_tank_inspection}
                  onChange={(e) => setData('fuel_tank_inspection', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>


         <CCard className="mb-4">
          <CCardHeader>
            <strong>Electrical Systems & Lighting</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormSelect
                  name="starter_engagement_reliability"
                  label="Starter engagement reliability"
                  value={data.starter_engagement_reliability}
                  onChange={(e) => setData('starter_engagement_reliability', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="front_indicators_function"
                  label="Front indicators function"
                  value={data.front_indicators_function}
                  onChange={(e) => setData('front_indicators_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="rear_indicators_function"
                  label="Rear indicators function"
                  value={data.rear_indicators_function}
                  onChange={(e) => setData('rear_indicators_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="reverse_light_function"
                  label="Reverse light function"
                  value={data.reverse_light_function}
                  onChange={(e) => setData('reverse_light_function', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="fog_lights_front_rear"
                  label="Fog lights front/rear"
                  value={data.fog_lights_front_rear}
                  onChange={(e) => setData('fog_lights_front_rear', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="interior_control_switches_backlight"
                  label="Interior control switches backlight"
                  value={data.interior_control_switches_backlight}
                  onChange={(e) => setData('interior_control_switches_backlight', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="parking_sensor_functionality"
                  label="Parking sensor functionality"
                  value={data.parking_sensor_functionality}
                  onChange={(e) => setData('parking_sensor_functionality', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>


         <CCard className="mb-4">
          <CCardHeader>
            <strong>Road Test & Performance</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormSelect
                  name="start_performance"
                  label="Start Performance"
                  value={data.start_performance}
                  onChange={(e) => setData('start_performance', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Cold start performance">Cold start performance</option>
                  <option value="Warm start performance">Warm start performance</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="acceleration_responsiveness"
                  label="Acceleration Responsiveness"
                  value={data.acceleration_responsiveness}
                  onChange={(e) => setData('acceleration_responsiveness', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="cruise_control_engagement_test"
                  label="Cruise Control Engagement Test"
                  value={data.cruise_control_engagement_test}
                  onChange={(e) => setData('cruise_control_engagement_test', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="garebox_performance"
                  label="Gearbox Performance"
                  value={data.garebox_performance}
                  onChange={(e) => setData('garebox_performance', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Automatic gearbox shift points">Automatic gearbox shift points</option>
                  <option value="Manual gearbox synchro smoothness">Manual gearbox synchro smoothness</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="engine_vibration_idle"
                  label="Engine vibration at idle"
                  value={data.engine_vibration_idle}
                  onChange={(e) => setData('engine_vibration_idle', e.target.value)}
                  invalid={!!errors.engine_vibration_idle}
                  feedbackInvalid={errors.engine_vibration_idle}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="mid_range_power"
                  label="Mid-range power delivery"
                  value={data.mid_range_power}
                  onChange={(e) => setData('mid_range_power', e.target.value)}
                  invalid={!!errors.mid_range_power}
                  feedbackInvalid={errors.mid_range_power}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="highway_stability"
                  label="Highway stability"
                  value={data.highway_stability}
                  onChange={(e) => setData('highway_stability', e.target.value)}
                  invalid={!!errors.highway_stability}
                  feedbackInvalid={errors.highway_stability}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="steering_feedback"
                  label="Steering feedback & centering"
                  value={data.steering_feedback}
                  onChange={(e) => setData('steering_feedback', e.target.value)}
                  invalid={!!errors.steering_feedback}
                  feedbackInvalid={errors.steering_feedback}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="abs_intervention"
                  label="ABS intervention feel"
                  value={data.abs_intervention}
                  onChange={(e) => setData('abs_intervention', e.target.value)}
                  invalid={!!errors.abs_intervention}
                  feedbackInvalid={errors.abs_intervention}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="braking_performance"
                  label="Braking performance under test"
                  value={data.braking_performance}
                  onChange={(e) => setData('braking_performance', e.target.value)}
                  invalid={!!errors.braking_performance}
                  feedbackInvalid={errors.braking_performance}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="transmission_harshness"
                  label="Transmission harshness under load"
                  value={data.transmission_harshness}
                  onChange={(e) => setData('transmission_harshness', e.target.value)}
                  invalid={!!errors.transmission_harshness}
                  feedbackInvalid={errors.transmission_harshness}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="clutch_engagement"
                  label="Clutch engagement smoothness (manual)"
                  value={data.clutch_engagement}
                  onChange={(e) => setData('clutch_engagement', e.target.value)}
                  invalid={!!errors.clutch_engagement}
                  feedbackInvalid={errors.clutch_engagement}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  name="noise_levels"
                  label="Noise levels at various speeds"
                  value={data.noise_levels}
                  onChange={(e) => setData('noise_levels', e.target.value)}
                  invalid={!!errors.noise_levels}
                  feedbackInvalid={errors.noise_levels}
                >
                  <option value="">-- Select --</option>
                  <option value="Normal">Normal</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </CFormSelect>
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>


      </CCol>
    </CForm>
  </CRow>
  )
}

AddInspection.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default AddInspection
