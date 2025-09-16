import {
  CCardBody,
  CCardHeader,
  CCard,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CButton
} from '@coreui/react'
import { useState,useEffect, useRef } from 'react'
import { useForm, usePage,router } from '@inertiajs/react'
import DefaultLayout from '../../../layout/DefaultLayout'
import { route } from 'ziggy-js'
import CarInspectionImage from '../../../components/CarInspectionImage'
import Select2Multi from '../../../components/Select2Multi'
const AddInspection = () => {
  const saveTimeout = useRef(null)
  const { props } = usePage();
  const savedMappingFromServer = {};  
  const { data, setData, post, processing, errors } = useForm({
    package_id: props?.inspectionsDetail?.package_id || '',
    full_name: props?.inspectionsDetail?.full_name || '',
    email: props?.inspectionsDetail?.email || '',
    contact_no: props?.inspectionsDetail?.contact_no || '',
    address_line_1: props?.inspectionsDetail?.address_line_1 || '',
    address_line_2: props?.inspectionsDetail?.address_line_2 || '',
    // pin_code: props?.inspectionsDetail?.pin_code || '',
    other_vehicle_make: props?.inspectionsDetail?.other_vehicle_make || '',
    city: props?.inspectionsDetail?.city || '',
    preferred_date: props?.inspectionsDetail?.preferred_date || '',
    preferred_time_slot: props?.inspectionsDetail?.preferred_time_slot || '',
    additional_notes: props?.inspectionsDetail?.additional_notes || '',
    vehicle_make: props?.inspectionsDetail?.vehicle_make || '',
    vehicle_model: props?.inspectionsDetail?.vehicle_model || '',
    vehicle_year: props?.inspectionsDetail?.vehicle_year || '',
    fuel_type: props?.inspectionsDetail?.fuel_type || '',
    transmission: props?.inspectionsDetail?.transmission || '',
    car_parked: props?.inspectionsDetail?.car_parked || '',
    mileage: props?.inspectionsDetail?.mileage || '',
    inspector_id: String(props?.inspectionsDetail?.inspector_id ?? ''),
    status: String(props?.inspectionsDetail?.status ?? ''),
    svg_code: '',
    documents: props?.inspectionsDetail?.documents || [],
    over_comments: props?.inspectionsDetail?.over_comments || '',
    accident: props?.inspectionsDetail?.accident || '',
    vehicle_detail: {
      ...props?.inspectionsDetail?.vehicle_detail
    },
    
    body_condition: {
      ...props?.inspectionsDetail?.body_detail
    },

    glass_detail: {
      ...props?.inspectionsDetail?.glass_details
    },

    engine_detail: {
      ...props?.inspectionsDetail?.engine_details
    },

    cluster_detail: {
      ...props?.inspectionsDetail?.cluster_details
    },

    transmission_detail: {
      ...props?.inspectionsDetail?.transmission_details
    },

    suspension_detail: {
      ...props?.inspectionsDetail?.suspension_details
    },

    brakes_detail: {
      ...props?.inspectionsDetail?.brakes_details
    },

    tyre_detail: {
      ...props?.inspectionsDetail?.tyres_details
    },

    interior_detail: {
      ...props?.inspectionsDetail?.interior_details
    },

    seat_detail: {
      ...props?.inspectionsDetail?.seat_details
    },

    hvac_detail: {
      ...props?.inspectionsDetail?.hvac_details
    },
    
    cooling_detail: {
      ...props?.inspectionsDetail?.cooling_fuel_details
    },

    electrical_detail: {
      ...props?.inspectionsDetail?.electrical_lighting_details
    },

    road_test_detail: {
      ...props?.inspectionsDetail?.performance_road_test_details
    },
    
  })
  let images = data.vehicle_detail.images;

  if (typeof images === "string") {
    try {
      images = JSON.parse(images) || []; // convert JSON string to array
    } catch {
      images = [];
    }
  }

  let documents = data.documents;

  if (typeof documents === "string") {
    try {
      documents = JSON.parse(documents) || []; // convert JSON string to array
    } catch {
      documents = [];
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const confirmed = window.confirm("Are you sure you want to submit this inspection?");
    if (!confirmed) {
      return; // stop if user cancels
    }
    post(route(`inspector.submit-test`, { id: props.inspectionsDetail.id, savetype: 'normal'}))
  }

  const handleSvgChange = ({ svg, mapping }) => {
    setData("svg_code", svg || "");
  };

  const [isOther, setIsOther] = useState(data.vehicle_make === "Other");
  const handleChange = (e) => {
    const value = e.target.value;
    setData("vehicle_make", value);
    setIsOther(value === "Other");
    if (value !== "Other") {
      setData("other_vehicle_make", ""); // reset when not "Other"
    }
  };

  useEffect(() => {
  if (!props?.inspectionsDetail?.id) return

  if (saveTimeout.current) {
    clearTimeout(saveTimeout.current)
  }

  saveTimeout.current = setTimeout(() => {
    post(
      route("inspector.submit-test", { id: props.inspectionsDetail.id, savetype: 'autosave' }),
      {
        preserveScroll: true,  // ✅ this works now
        preserveState: true,
        replace: true,
        onSuccess: () => {
          // no-op
        }
      }
    )
  }, 5000) // debounce 2s

  return () => clearTimeout(saveTimeout.current)
}, [JSON.stringify(data)])

  const removeFile = (index, typefile) => {
    let fileToDelete = null
    if (typefile === 'documents') {
      // ensure docs is an array
      let documents = data.documents
      if (!Array.isArray(documents)) {
        try { documents = JSON.parse(documents) || [] } catch { documents = [] }
      }

      fileToDelete = documents[index]
      const updatedDocs = documents.filter((_, i) => i !== index)
      setData('documents', updatedDocs)
    } else { // 'images'
      let images = data?.vehicle_detail?.images
      if (!Array.isArray(images)) {
        try { images = JSON.parse(images) || [] } catch { images = [] }
      }

      fileToDelete = images[index]
      const updatedImages = images.filter((_, i) => i !== index)
      setData('vehicle_detail', {
        ...data.vehicle_detail,
        images: updatedImages,
      })
    }

    router.delete(
      route('inspector.delete-file', {
        id: props.inspectionsDetail.id,
        typefile,
        index,
      }),
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      }
    )
  }


  return (
  <CRow>
    <CForm onSubmit={handleSubmit} encType='multipart/form-data'>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer Details</strong>
          </CCardHeader>
          
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormInput
                required
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
                required
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
                required
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
                required
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
                required
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
              {/* <CCol md={4}>
                <CFormInput
                required
                disabled
                type="text"
                label="Pin Code"
                name="pin_code"
                value={data.pin_code}
                onChange={(e) => setData('pin_code', e.target.value)}
                invalid={!!errors.pin_code}
                feedbackInvalid={errors.pin_code}
                />
              </CCol> */}
            
            
              <CCol md={4}>
                <CFormSelect
                required
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
                required
                disabled
                type="date"
                name="preferred_date"
                label="Preferred Date"
                value={data.preferred_date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setData('preferred_date', e.target.value)}
                invalid={!!errors.preferred_date}
                feedbackInvalid={errors.preferred_date}
                />
              </CCol>

              <CCol md={4}>
                <CFormSelect
                    disabled
                    name="preferred_time_slot"
                    label="Preferred Time Slot"
                    value={data.preferred_time_slot}
                    onChange={(e) => setData('preferred_time_slot', e.target.value)}
                    invalid={!!errors.preferred_time_slot}
                    feedbackInvalid={errors.preferred_time_slot}
                  >
                  <option value="">-- Select --</option>
                  <option value="9:00 AM – 12:00 PM">9:00 AM – 12:00 PM</option>
                  <option value="10:00 AM – 1:00 PM">10:00 AM – 1:00 PM</option>
                  <option value="11:00 AM – 2:00 PM">11:00 AM – 2:00 PM</option>
                  <option value="12:00 PM – 3:00 PM">12:00 PM – 3:00 PM</option>
                  <option value="1:00 PM – 4:00 PM">1:00 PM – 4:00 PM</option>
                  <option value="2:00 PM – 5:00 PM">2:00 PM – 5:00 PM</option>
                  <option value="3:00 PM – 6:00 PM">3:00 PM – 6:00 PM</option>
                  <option value="4:00 PM – 7:00 PM">4:00 PM – 7:00 PM</option>
                  <option value="5:00 PM – 8:00 PM">5:00 PM – 8:00 PM</option>
                  </CFormSelect>
              </CCol>
            
            
              <CCol md={12}>
                <CFormInput
                required
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
              required
              
              name="vehicle_make"
              label="Vehicle Make"
              value={data.vehicle_make}
              onChange={handleChange}
              invalid={!!errors.vehicle_make}
              feedbackInvalid={errors.vehicle_make}
              >
              <option value="">-- Select --</option>
              {[
                  'Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi', 'Lexus', 'Infiniti', 'Suzuki', 'Daihatsu', 'Acura', 'Mitsuoka',
                  'Ford', 'Chevrolet', 'Dodge', 'GMC', 'Cadillac', 'Tesla', 'Jeep', 'Chrysler', 'Buick', 'Lincoln', 'Ram', 'Fisker', 'Lucid Motors', 'Rivian',
                  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen (VW)', 'Porsche', 'Opel', 'Mini', 'Smart', 'Maybach', 'Alpina', 'Borgward', 'Wiesmann',
                  'Ferrari', 'Lamborghini', 'Maserati', 'Alfa Romeo', 'Fiat', 'Lancia', 'Pagani', 'De Tomaso', 'Abarth', 'Italdesign',
                  'Renault', 'Peugeot', 'Citroën', 'Bugatti', 'Alpine', 'Venturi',
                  'Rolls-Royce', 'Bentley', 'Aston Martin', 'Jaguar', 'Land Rover', 'Mini', 'McLaren', 'Caterham', 'TVR', 'Morgan', 'Lotus',
                  'Hyundai', 'Kia', 'Genesis',
                  'Volvo', 'Saab',
                  'Tata', 'Mahindra',
                  'Koenigsegg', 'Rimac',
                  'BYD', 'Geely', 'Chery', 'Great Wall Motors (GWM)', 'Haval', 'MG', 'Dongfeng', 'FAW', 'BAIC', 'JAC Motors', 'NIO', 'XPeng', 'Li Auto', 'Weltmeister (WM Motor)', 'Seres', 'Aiways', 'Ora', 'Leapmotor', 'Human Horizons (HiPhi)', 'Bordrin', 'Hongqi', 'Denza', 'Voyah', 'Jetour',
                  'Other'
                ].map((make) => (
              <option key={make} value={make}>
              {make!='Other' ? make : 'Other Make'}
              </option>
              ))}
              </CFormSelect>
            </CCol>

            {isOther && (
              <CCol md={4}>
                <CFormInput
                
                  label="Other"
                  type="text"
                  name="other_vehicle_make"
                  value={data.other_vehicle_make || ""}
                  onChange={(e) => setData("other_vehicle_make", e.target.value)}
                  required={isOther}
                  placeholder="Enter vehicle make"
                  invalid={!!errors.other_vehicle_make}
                  feedbackInvalid={errors.other_vehicle_make}
                />
              </CCol>
            )}

            <CCol md={4}>
              <CFormInput
              required
              
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
               <CFormSelect
               required
                  name="vehicle_year"
                  label="Vehicle Year"
                  value={data.vehicle_year}
                  onChange={(e) => setData('vehicle_year', e.target.value)}
                  invalid={!!errors.vehicle_year}
                  feedbackInvalid={errors.vehicle_year}
                >
                 <option value="" disabled hidden>-- Select Vehicle Year --</option>
                 <option key="2026" value="2026">2026</option>
                    {Array.from({ length: 41 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                </CFormSelect>
              
            </CCol>
          
            <CCol md={4}>
              <CFormSelect
              required
              
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
              required
              
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
              required
              
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
             <CFormSelect
             required
                  name="mileage"
                  label="Mileage"
                  value={data.mileage}
                  onChange={(e) => setData('mileage', e.target.value)}
                  invalid={!!errors.mileage}
                  feedbackInvalid={errors.mileage}
                >
                 <option value="" disabled hidden>-- Select Mileage --</option>
                    <option value="New – 10,000 kms">New – 10,000 kms</option>
                    <option value="10,000 – 20,000 kms">10,000 – 20,000 kms</option>
                    <option value="20,000 – 30,000 kms">20,000 – 30,000 kms</option>
                    <option value="30,000 – 40,000 kms">30,000 – 40,000 kms</option>
                    <option value="40,000 – 60,000 kms">40,000 – 60,000 kms</option>
                    <option value="60,000 – 80,000 kms">60,000 – 80,000 kms</option>
                    <option value="80,000 – 100,000 kms">80,000 – 100,000 kms</option>
                    <option value="100,000 – 120,000 kms">100,000 – 120,000 kms</option>
                    <option value="120,000 – 140,000 kms">120,000 – 140,000 kms</option>
                    <option value="140,000 – 160,000 kms">140,000 – 160,000 kms</option>
                    <option value="160,000 – 180,000 kms">160,000 – 180,000 kms</option>
                    <option value="180,000 – 200,000 kms">180,000 – 200,000 kms</option>
                    <option value="200,000 – 250,000 kms">200,000 – 250,000 kms</option>
                    <option value="250,000 – 300,000 kms">250,000 – 300,000 kms</option>
                    <option value="300,000 - Above kms">300,000 - Above kms</option>
                </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[engine_capacity]"
                label="Engine Capacity(L)"
                value={data.vehicle_detail.engine_capacity}
                onChange={(e) => setData('vehicle_detail[engine_capacity]', e.target.value)}
                invalid={!!errors.engine_capacity}
                feedbackInvalid={errors.engine_capacity}
              />
            </CCol>
             <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[engine_cylinders]"
                label=" Engine Cylinders"
                value={data.vehicle_detail.engine_cylinders}
                onChange={(e) => setData('vehicle_detail[engine_cylinders]', e.target.value)}
                invalid={!!errors.engine_cylinders}
                feedbackInvalid={errors.engine_cylinders}
              />
            </CCol>
         
            

            <CCol md={4}>
              <CFormSelect
              required

                name="vehicle_detail[drive_type]"
                label="Drive Type"
                value={data.vehicle_detail.drive_type}
                onChange={(e) => setData('vehicle_detail[drive_type]', e.target.value)}
                >
                <option value="">-- Select --</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="AWD">AWD</option>
                <option value="4WD">4WD</option>
                <option value="4x4">4x4</option>
                <option value="2WD">2WD</option>
                </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormSelect
              required

                name="vehicle_detail[body_type]"
                label="Body Type"
                value={data.vehicle_detail.body_type}
                onChange={(e) => setData('vehicle_detail[body_type]', e.target.value)}
                >
                <option value="">-- Select --</option>
                <option value="Sedan">Sedan</option>
                <option value="Saloon">Saloon</option>
                <option value="SUV">SUV</option>
                <option value="Crossover">Crossover</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Cabriolet">Cabriolet</option>
                <option value="Wagon">Wagon</option>
                <option value="Estate">Estate</option>
                <option value="Pickup">Pickup</option>
                <option value="Van">Van</option>
                <option value="Minivan">Minivan</option>
                <option value="MPV">MPV</option>
                <option value="Roadster">Roadster</option>
                <option value="Limousine">Limousine</option>
                <option value="Sports Car">Sports Car</option>
              </CFormSelect>
            </CCol>
          
            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[exterior_color]"
                label="Exterior Color"
                value={data.vehicle_detail.exterior_color}
                onChange={(e) => setData('vehicle_detail[exterior_color]', e.target.value)}
                invalid={!!errors.exterior_color}
                feedbackInvalid={errors.exterior_color}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[interior_color]"
                label="Interior Colour/Trim"
                value={data.vehicle_detail.interior_color}
                onChange={(e) => setData('vehicle_detail[interior_color]', e.target.value)}
                invalid={!!errors.interior_color}
                feedbackInvalid={errors.interior_color}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[number_keys]"
                label="Number of Keys"
                value={data.vehicle_detail.number_keys}
                onChange={(e) => setData('vehicle_detail[number_keys]', e.target.value)}
                invalid={!!errors.number_keys}
                feedbackInvalid={errors.number_keys}
              />
            </CCol>
          
            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[service_history]"
                label="Service History Summary"
                value={data.vehicle_detail.service_history}
                onChange={(e) => setData('vehicle_detail[service_history]', e.target.value)}
                invalid={!!errors.service_history}
                feedbackInvalid={errors.service_history}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
              required
                
                type="date"
                name="vehicle_detail[last_service_date]"
                label="Last Service Date"
                value={data.vehicle_detail.last_service_date}
                onChange={(e) => setData('vehicle_detail[last_service_date]', e.target.value)}
                invalid={!!errors.last_service_date}
                feedbackInvalid={errors.last_service_date}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[registration_emirate]"
                label="Registration Emirate"
                value={data.vehicle_detail.registration_emirate}
                onChange={(e) => setData('vehicle_detail[registration_emirate]', e.target.value)}
                invalid={!!errors.registration_emirate}
                feedbackInvalid={errors.registration_emirate}
              />
            </CCol>
          
            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[warranty_status]"
                label="Warranty Status"
                value={data.vehicle_detail.warranty_status}
                onChange={(e) => setData('vehicle_detail[warranty_status]', e.target.value)}
                invalid={!!errors.warranty_status}
                feedbackInvalid={errors.warranty_status}
              />
            </CCol>
            <CCol md={4}>
              <Select2Multi
              required
                name="vehicle_detail[plate_type]"
                label="Specification"
                value={data.vehicle_detail.plate_type}
               onChange={(e) => setData(e.target.name, e.target.value)}
                invalid={!!errors.plate_type}
                feedbackInvalid={errors.plate_type}
                options={[
                    { value: "GCC", label: "GCC" },
                    { value: "Non-GCC", label: "Non-GCC" },
                    { value: "American", label: "American" },
                    { value: "Canadian", label: "Canadian" },
                    { value: "European", label: "European" },
                    { value: "Japanese", label: "Japanese" },
                    { value: "Korean", label: "Korean" },
                    { value: "Other", label: "Other" }
                  ]}
              />
             
            </CCol>

            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[registration_number]"
                label="Registration Number"
                value={data.vehicle_detail.registration_number}
                onChange={(e) => setData('vehicle_detail[registration_number]', e.target.value)}
                invalid={!!errors.registration_number}
                feedbackInvalid={errors.registration_number}
              />
            </CCol>
          
            <CCol md={4}>
              <CFormInput
              required
                
                type="text"
                name="vehicle_detail[chasis_no]"
                label="Chasis Number"
                value={data.vehicle_detail.chasis_no}
                onChange={(e) => setData('vehicle_detail[chasis_no]', e.target.value)}
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
                <CFormSwitch name="body_condition[front_bumper]" checked={data.body_condition.front_bumper} value={data.body_condition.front_bumper} onChange={(e) => setData('body_condition.front_bumper', e.target.checked)} label="Front bumper fit & alignment" id="check_1"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[rear_bumper]" checked={data.body_condition.rear_bumper} value={data.body_condition.rear_bumper} onChange={(e) => setData('body_condition.rear_bumper', e.target.checked)} label="Rear bumper fit & alignment" id="check_2"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[bonnet]" checked={data.body_condition.bonnet} value={data.body_condition.bonnet} onChange={(e) => setData('body_condition.bonnet', e.target.checked)} label="Bonnet fit & latch" id="check_3"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[boot_lid]" checked={data.body_condition.boot_lid} value={data.body_condition.boot_lid} onChange={(e) => setData('body_condition.boot_lid', e.target.checked)} label="Boot lid fit & latch" id="check_4"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[left_front_wing]" checked={data.body_condition.left_front_wing} value={data.body_condition.left_front_wing} onChange={(e) => setData('body_condition.left_front_wing', e.target.checked)} label="Left front wing fit" id="check_5"/>
              </CCol>
              <CCol md={4}>
                <CFormSwitch name="body_condition[right_front_wing]" checked={data.body_condition.right_front_wing} value={data.body_condition.right_front_wing} onChange={(e) => setData('body_condition.right_front_wing', e.target.checked)} label="Right front wing fit" id="check_6"/>
              </CCol>
              {/* <CCol md={4}>
                <CFormSwitch name="body_condition[left_front_door_fit]" checked={data.body_condition.left_front_door_fit} value={data.body_condition.left_front_door_fit} onChange={(e) => setData('body_condition.left_front_door_fit', e.target.checked)} label="Left front door fit" id="check_6"/>
              </CCol> */}
              <CCol md={4}>
                <CFormSwitch name="body_condition[right_front_wing_fit]" checked={data.body_condition.right_front_wing_fit} value={data.body_condition.right_front_wing_fit} onChange={(e) => setData('body_condition.right_front_wing_fit', e.target.checked)} label="Right front wing fit" id="check_1"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[left_front_door_fit]" checked={data.body_condition.left_front_door_fit} value={data.body_condition.left_front_door_fit} onChange={(e) => setData('body_condition.left_front_door_fit', e.target.checked)} label="Left front door fit" id="check_2"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[right_front_door_fit]" checked={data.body_condition.right_front_door_fit} value={data.body_condition.right_front_door_fit} onChange={(e) => setData('body_condition.right_front_door_fit', e.target.checked)} label="Right front door fit" id="check_3"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[left_rear_door_fit]" checked={data.body_condition.left_rear_door_fit} value={data.body_condition.left_rear_door_fit} onChange={(e) => setData('body_condition.left_rear_door_fit', e.target.checked)} label="Left rear door fit" id="check_4"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[right_rear_door_fit]" checked={data.body_condition.right_rear_door_fit} value={data.body_condition.right_rear_door_fit} onChange={(e) => setData('body_condition.right_rear_door_fit', e.target.checked)} label="Right rear door fit" id="check_5"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[left_rear_quarter_panel_fit]" checked={data.body_condition.left_rear_quarter_panel_fit} value={data.body_condition.left_rear_quarter_panel_fit} onChange={(e) => setData('body_condition.left_rear_quarter_panel_fit', e.target.checked)} label="Left rear quarter panel fit" id="check_6"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[right_rear_quarter_panel_fit]" checked={data.body_condition.right_rear_quarter_panel_fit} value={data.body_condition.right_rear_quarter_panel_fit} onChange={(e) => setData('body_condition.right_rear_quarter_panel_fit', e.target.checked)} label="Right rear quarter panel fit" id="check_7"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[roof_panel_alignment]" checked={data.body_condition.roof_panel_alignment} value={data.body_condition.roof_panel_alignment} onChange={(e) => setData('body_condition.roof_panel_alignment', e.target.checked)} label="Roof panel alignment" id="check_8"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[fender_mounting_condition]" checked={data.body_condition.fender_mounting_condition} value={data.body_condition.fender_mounting_condition} onChange={(e) => setData('body_condition.fender_mounting_condition', e.target.checked)} label="Fender mounting & condition" id="check_9"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[panel_gap_uniformity]" checked={data.body_condition.panel_gap_uniformity} value={data.body_condition.panel_gap_uniformity} onChange={(e) => setData('body_condition.panel_gap_uniformity', e.target.checked)} label="Panel gap uniformity" id="check_10"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[external_trim_condition]" checked={data.body_condition.external_trim_condition} value={data.body_condition.external_trim_condition} onChange={(e) => setData('body_condition.external_trim_condition', e.target.checked)} label="External trim condition" id="check_11"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[molding_clips_present]" checked={data.body_condition.molding_clips_present} value={data.body_condition.molding_clips_present} onChange={(e) => setData('body_condition.molding_clips_present', e.target.checked)} label="Molding & clips present" id="check_12"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[door_seals_fitment]" checked={data.body_condition.door_seals_fitment} value={data.body_condition.door_seals_fitment} onChange={(e) => setData('body_condition.door_seals_fitment', e.target.checked)} label="Door seals fitment" id="check_13"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[boot_seal_fitment]" checked={data.body_condition.boot_seal_fitment} value={data.body_condition.boot_seal_fitment} onChange={(e) => setData('body_condition.boot_seal_fitment', e.target.checked)} label="Boot seal fitment" id="check_14"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[fuel_filler_door_operation]" checked={data.body_condition.fuel_filler_door_operation} value={data.body_condition.fuel_filler_door_operation} onChange={(e) => setData('body_condition.fuel_filler_door_operation', e.target.checked)} label="Fuel filler door operation" id="check_15"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[body_fasteners_intact]" checked={data.body_condition.body_fasteners_intact} value={data.body_condition.body_fasteners_intact} onChange={(e) => setData('body_condition.body_fasteners_intact', e.target.checked)} label="Body fasteners intact" id="check_16"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[tow_eye_point_secure]" checked={data.body_condition.tow_eye_point_secure} value={data.body_condition.tow_eye_point_secure} onChange={(e) => setData('body_condition.tow_eye_point_secure', e.target.checked)} label="Tow eye/point present & secure" id="check_17"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[bumper_reinforcement_visible]" checked={data.body_condition.bumper_reinforcement_visible} value={data.body_condition.bumper_reinforcement_visible} onChange={(e) => setData('body_condition.bumper_reinforcement_visible', e.target.checked)} label="Bumper reinforcement visible" id="check_18"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[undercarriage_guards]" checked={data.body_condition.undercarriage_guards} value={data.body_condition.undercarriage_guards} onChange={(e) => setData('body_condition.undercarriage_guards', e.target.checked)} label="Undercarriage guards" id="check_19"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[panel_repair_signs]" checked={data.body_condition.panel_repair_signs} value={data.body_condition.panel_repair_signs} onChange={(e) => setData('body_condition.panel_repair_signs', e.target.checked)} label="Panel repair signs" id="check_20"/>
              </CCol>

              <CCol md={4}>
                <CFormSwitch name="body_condition[exterior_accessory_fitment]" checked={data.body_condition.exterior_accessory_fitment} value={data.body_condition.exterior_accessory_fitment} onChange={(e) => setData('body_condition.exterior_accessory_fitment', e.target.checked)} label="Exterior accessory fitment" id="check_21"/>
              </CCol>
            </CRow>
            
          </CCardBody>
        </CCard>

         <CarInspectionImage inspectionId={props.inspectionsDetail.id} initialMapping={savedMappingFromServer} onSvgChange={handleSvgChange} svgImage={data.vehicle_detail.svg_image} />
        
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Paint Comments</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>

              <CCol md={12}>
                <CFormInput
              
                
                type="text"
                name="vehicle_detail[chasis_condition]"
                label="Chassis condition"
                value={data.vehicle_detail.chasis_condition}
                onChange={(e) => setData('vehicle_detail[chasis_condition]', e.target.value)}
                invalid={!!errors.chasis_condition}
                feedbackInvalid={errors.chasis_condition}
              />
              </CCol>

              <CCol md={12}>
                <CFormInput
              
                
                type="text"
                name="vehicle_detail[exterior_comments]"
                label="Exterior comment"
                value={data.vehicle_detail.exterior_comments}
                onChange={(e) => setData('vehicle_detail[exterior_comments]', e.target.value)}
                invalid={!!errors.exterior_comments}
                feedbackInvalid={errors.exterior_comments}
              />
              </CCol>

              <CCol md={12}>
                <CFormInput
              
                
                type="text"
                name="vehicle_detail[normal_comments]"
                label="Normal comment"
                value={data.vehicle_detail.normal_comments}
                onChange={(e) => setData('vehicle_detail[normal_comments]', e.target.value)}
                invalid={!!errors.normal_comments}
                feedbackInvalid={errors.normal_comments}
              />
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
                <Select2Multi
                  
                  required
                  name="engine_detail[engine_start_behavior_cold]"
                  label="Engine start behavior (cold)"
                  value={data.engine_detail.engine_start_behavior_cold}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  
                  required
                  name="engine_detail[engine_start_behavior_warm]"
                  label="Engine start behavior (warm)"
                  value={data.engine_detail.engine_start_behavior_warm}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[idle_stability]"
                  label="Idle stability"
                  value={data.engine_detail.idle_stability}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[throttle_response]"
                  label="Throttle response"
                  value={data.engine_detail.throttle_response}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[abnormal_engine_noises]"
                  label="Abnormal engine noises (tick/knock)"
                  value={data.engine_detail.abnormal_engine_noises}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[engine_oil_level_check]"
                  label="Engine oil level check"
                  value={data.engine_detail.engine_oil_level_check}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[engine_oil_appearance]"
                  label="Engine oil appearance"
                  value={data.engine_detail.engine_oil_appearance}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                 <Select2Multi
                 
                required
                  name="engine_detail[visible_oil_leaks]"
                  label="Visible oil leaks around head/covers"
                  value={data.engine_detail.visible_oil_leaks}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[oil_filter_housing_condition]"
                  label="Oil filter housing condition"
                  value={data.engine_detail.oil_filter_housing_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[coolant_level_check]"
                  label="Coolant level check"
                  value={data.engine_detail.coolant_level_check}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[coolant_color]"
                  label="Coolant color & contamination"
                  value={data.engine_detail.coolant_color}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[coolant_leaks]"
                  label="Coolant leaks visible (hoses/rad)"
                  value={data.engine_detail.coolant_leaks}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[signs_of_coolant_in_oil]"
                  label="Signs of coolant in oil (milky)"
                  value={data.engine_detail.signs_of_coolant_in_oil}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[hose_condition]"
                  label="Hose condition & clamps"
                  value={data.engine_detail.hose_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[drive_belt_condition]"
                  label="Drive belt tension & wear"
                  value={data.engine_detail.drive_belt_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                
                <Select2Multi
                
                required
                  name="engine_detail[timing_belt_condition]"
                  label="Timing belt/chain visible condition"
                  value={data.engine_detail.timing_belt_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[turbo_boost_check]"
                  label="Turbocharger boost check"
                  value={data.engine_detail.turbo_boost_check}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[air_intake_condition]"
                  label="Air intake ducting condition"
                  value={data.engine_detail.air_intake_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[air_filter_element]"
                  label="Air filter element"
                  value={data.engine_detail.air_filter_element}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[starter_motor_cranking]"
                  label="Starter motor cranking quality"
                  value={data.engine_detail.starter_motor_cranking}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="engine_detail[fuse_box_access]"
                  label="Fuse box access"
                  value={data.engine_detail.fuse_box_access}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  
                  type="text"
                  name="engine_detail[any_noice]"
                  label="Any Noice"
                  value={data.engine_detail.any_noice}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.any_noice}
                  feedbackInvalid={errors.any_noice}
                />
                
              </CCol>

              <CCol md={4}>
                <CFormInput
                  
                  type="text"
                  name="engine_detail[comments_engine]"
                  label="Comments"
                  value={data.engine_detail.comments_engine}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comments_engine}
                  feedbackInvalid={errors.comments_engine}
                />
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
              <Select2Multi
                required
                name="transmission_detail[transmission_fluid_level_auto]"
                label="Transmission fluid level (auto)"
                value={data.transmission_detail.transmission_fluid_level_auto}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Normal", label: "Normal" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[manual_gearbox_oil_check]"
                label="Manual gearbox oil check (if access)"
                value={data.transmission_detail?.manual_gearbox_oil_check}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Normal", label: "Normal" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[transmission_mount_integrity]"
                label="Transmission mount integrity"
                value={data.transmission_detail?.transmission_mount_integrity}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

          

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[clutch_bite_slippage]"
                label="Clutch bite & slippage (manual)"
                value={data.transmission_detail?.clutch_bite_slippage}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[automatic_shift_quality]"
                label="Automatic shift quality & hesitation"
                value={data.transmission_detail?.automatic_shift_quality}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Gear Shifting Not Smooth", label: "Gear Shifting Not Smooth" },
                  { value: "Hard To Change Gear", label: "Hard To Change Gear" },
                  { value: "Jurky Gear", label: "Jurky Gear" },
                  { value: "Delay In Shifting", label: "Delay In Shifting" },
                  { value: "Juddring", label: "Juddring" },
                  { value: "Gear Shocking", label: "Gear Shocking" },
                  { value: "Gear Slipping", label: "Gear Slipping" },
                  { value: "Gear Vibration", label: "Gear Vibration" },
                  { value: "Gear Not Engaging", label: "Gear Not Engaging" },
                  { value: "Normal", label: "Normal" },
                  
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[transfer_case_engagement]"
                label="Transfer case engagement (4x4)"
                value={data.transmission_detail?.transfer_case_engagement}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Not Engaging", label: "Not Engaging" },
                  { value: "Transfer Case Fold", label: "Transfer Case Fold" },
                  { value: "4WD Not Engaging", label: "4WD Not Engaging" },
                  { value: "Delay In 4*4", label: "Delay In 4*4" },
                  { value: "Low-Hi Not Shifting", label: "Low-Hi Not Shifting" },
                  { value: "Normal", label: "Normal" },
                  
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[drive_shaft_visual_inspection]"
                label="Drive shaft visual inspection"
                value={data.transmission_detail?.drive_shaft_visual_inspection}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[cv_joint_boot_integrity]"
                label="CV joint boot integrity (all shafts)"
                value={data.transmission_detail?.cv_joint_boot_integrity}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[u_joints_coupling_check]"
                label="U-joints or coupling check"
                value={data.transmission_detail?.u_joints_coupling_check}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[differential_oil_condition]"
                label="Differential oil condition (front/rear)"
                value={data.transmission_detail?.differential_oil_condition}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Normal", label: "Normal" },
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
                required
                name="transmission_detail[differential_housing_leaks]"
                label="Differential housing leaks"
                value={data.transmission_detail?.differential_housing_leaks}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Dry", label: "Dry" },
                  { value: "Need Maintainance", label: "Need Maintainance" }
                ]}
              />
            </CCol>

            <CCol md={4}>
              <CFormInput
                type="text"
                name="transmission_detail[gearbox_unusual_noise]"
                label="Gearbox unusual noise under load"
                value={data.transmission_detail?.gearbox_unusual_noise}
                onChange={(e) => setData(e.target.name, e.target.value)}
                invalid={!!errors.transmission_detail?.gearbox_unusual_noise}
                feedbackInvalid={errors.transmission_detail?.gearbox_unusual_noise}
              />
            </CCol>

            <CCol md={4}>
              <CFormInput
                
                type="text"
                name="transmission_detail[comments_transmission]"
                label="Comments"
                value={data.transmission_detail?.comments_transmission}
                onChange={(e) => setData(e.target.name, e.target.value)}
                invalid={!!errors.transmission_detail?.comments_transmission}
                feedbackInvalid={errors.transmission_detail?.comments_transmission}
              />
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
                 <Select2Multi
                  multiple
                  name="glass_detail[windshield_condition]"
                  label="Windshield Condition"
                  value={data.glass_detail.windshield_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "No damage / Good condition", label: "No damage / Good condition" },
                    { value: "Minor scratches", label: "Minor scratches" },
                    { value: "Chips present", label: "Chips present" },
                    { value: "Cracks present", label: "Cracks present" },
                    { value: "Hazy / Reduced visibility", label: "Hazy / Reduced visibility" },
                    { value: "Loose / Improper fitment", label: "Loose / Improper fitment" },
                    { value: "Repaired (chip/crack repair visible)", label: "Repaired (chip/crack repair visible)" },
                    { value: "Replacement recommended", label: "Replacement recommended" },
                  ]}
                />
              </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[windshield_wiper_function]"
                    label="Windshield Wiper Function"
                    value={data.glass_detail.windshield_wiper_function}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Working properly", label: "Working properly" },
                      { value: "Slow / irregular movement", label: "Slow / irregular movement" },
                      { value: "Not working", label: "Not working" },
                      { value: "Noise during operation", label: "Noise during operation" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[wiper_blade_wear]"
                    label="Wiper Blade Wear"
                    value={data.glass_detail.wiper_blade_wear}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Good condition", label: "Good condition" },
                      { value: "Slight wear", label: "Slight wear" },
                      { value: "Moderate wear", label: "Moderate wear" },
                      { value: "Heavy wear / Replacement required", label: "Heavy wear / Replacement required" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[rear_wiper_function]"
                    label="Rear Wiper Function"
                    value={data.glass_detail.rear_wiper_function}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Working properly", label: "Working properly" },
                      { value: "Slow / irregular movement", label: "Slow / irregular movement" },
                      { value: "Not working", label: "Not working" },
                      { value: "Noise during operation", label: "Noise during operation" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    
                    required
                    name="glass_detail[side_window_operation_lf]"
                    label="Side Window Operation (LF)"
                    value={data.glass_detail.side_window_operation_lf}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Smooth operation", label: "Smooth operation" },
                      { value: "Slow movement", label: "Slow movement" },
                      { value: "Stuck / jammed", label: "Stuck / jammed" },
                      { value: "Motor noise present", label: "Motor noise present" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    
                    required
                    name="glass_detail[side_window_operation_rf]"
                    label="Side Window Operation (RF)"
                    value={data.glass_detail.side_window_operation_rf}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Smooth operation", label: "Smooth operation" },
                      { value: "Slow movement", label: "Slow movement" },
                      { value: "Stuck / jammed", label: "Stuck / jammed" },
                      { value: "Motor noise present", label: "Motor noise present" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                      
                    required
                    name="glass_detail[side_window_operation_lr]"
                    label="Side Window Operation (LR)"
                    value={data.glass_detail.side_window_operation_lr}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Smooth operation", label: "Smooth operation" },
                      { value: "Slow movement", label: "Slow movement" },
                      { value: "Stuck / jammed", label: "Stuck / jammed" },
                      { value: "Motor noise present", label: "Motor noise present" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    
                    required
                    name="glass_detail[side_window_operation_rr]"
                    label="Side Window Operation (RR)"
                    value={data.glass_detail.side_window_operation_rr}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Smooth operation", label: "Smooth operation" },
                      { value: "Slow movement", label: "Slow movement" },
                      { value: "Stuck / jammed", label: "Stuck / jammed" },
                      { value: "Motor noise present", label: "Motor noise present" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[rear_window_condition]"
                    label="Rear Window Condition"
                    value={data.glass_detail.rear_window_condition}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "No damage / Good condition", label: "No damage / Good condition" },
                      { value: "Minor scratches", label: "Minor scratches" },
                      { value: "Chips present", label: "Chips present" },
                      { value: "Cracks present", label: "Cracks present" },
                      { value: "Tint / defogger working fine", label: "Tint / defogger working fine" },
                      { value: "Replacement recommended", label: "Replacement recommended" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[sunroof_operation]"
                    label="Sunroof Operation"
                    value={data.glass_detail.sunroof_operation}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Smooth operation", label: "Smooth operation" },
                      { value: "Slow / noisy operation", label: "Slow / noisy operation" },
                      { value: "Jammed / stuck", label: "Jammed / stuck" },
                      { value: "Not working", label: "Not working" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[sunroof_drainage_check]"
                    label="Sunroof Drainage Check"
                    value={data.glass_detail.sunroof_drainage_check}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "No leakage / Proper drainage", label: "No leakage / Proper drainage" },
                      { value: "Minor clogging", label: "Minor clogging" },
                      { value: "Leakage detected", label: "Leakage detected" },
                      { value: "Drainage system blocked", label: "Drainage system blocked" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[sunroof_glass_condition]"
                    label="Sunroof Glass Condition"
                    value={data.glass_detail.sunroof_glass_condition}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Good Condition / No Damage", label: "Good Condition / No Damage" },
                      { value: "Minor scratches", label: "Minor scratches" },
                      { value: "Chips present", label: "Chips present" },
                      { value: "Cracks present", label: "Cracks present" },
                      { value: "Replacement recommended", label: "Replacement recommended" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[left_external_mirror_function]"
                    label="Left External Mirror Function"
                    value={data.glass_detail.left_external_mirror_function}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Fully functional", label: "Fully functional" },
                      { value: "Adjustment slow", label: "Adjustment slow" },
                      { value: "Mirror loose / vibrating", label: "Mirror loose / vibrating" },
                      { value: "Not functional", label: "Not functional" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[right_external_mirror_function]"
                    label="Right External Mirror Function"
                    value={data.glass_detail.right_external_mirror_function}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Fully functional", label: "Fully functional" },
                      { value: "Adjustment slow", label: "Adjustment slow" },
                      { value: "Mirror loose / vibrating", label: "Mirror loose / vibrating" },
                      { value: "Not functional", label: "Not functional" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <Select2Multi
                    multiple
                    required
                    name="glass_detail[mirror_adjustment_motors]"
                    label="Mirror Adjustment Motors"
                    value={data.glass_detail.mirror_adjustment_motors}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    options={[
                      { value: "Working properly", label: "Working properly" },
                      { value: "Slow movement", label: "Slow movement" },
                      { value: "Noisy operation", label: "Noisy operation" },
                      { value: "Not working", label: "Not working" },
                    ]}
                  />
                </CCol>

                <CCol md={4}>
                  <CFormInput
                    type="text"
                    name="glass_detail[comments]"
                    label="Comments"
                    value={data.glass_detail.comments}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                    invalid={!!errors.comments}
                    feedbackInvalid={errors.comments}
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
                <Select2Multi
                  required
                  name="cluster_detail[engine_light]"
                  label="Engine light"
                  value={data.cluster_detail.engine_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[abs_light]"
                  label="ABS light"
                  value={data.cluster_detail?.abs_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[oil_pressure_light]"
                  label="Oil pressure light"
                  value={data.cluster_detail?.oil_pressure_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[battery_charging_system_light]"
                  label="Battery/charging system light"
                  value={data.cluster_detail?.battery_charging_system_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[coolant_temperature_warning_light]"
                  label="Coolant temperature warning light"
                  value={data.cluster_detail?.coolant_temperature_warning_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[brake_system_warning_light]"
                  label="Brake system warning light"
                  value={data.cluster_detail?.brake_system_warning_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[airbag_warning_light]"
                  label="Airbag warning light"
                  value={data.cluster_detail?.airbag_warning_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[seatbelt_reminder_light]"
                  label="Seatbelt reminder light"
                  value={data.cluster_detail?.seatbelt_reminder_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[traction_control_light]"
                  label="Traction control light"
                  value={data.cluster_detail?.traction_control_light}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="cluster_detail[tpms]"
                  label="Tyre Pressure Monitoring System (TPMS)"
                  value={data.cluster_detail?.tpms}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                     { value: "Not Visible", label: "Not Visible" },
                    { value: "Visible", label: "Visible" },
                  ]}
                />
              </CCol>

               <CCol md={4}>
                <CFormInput
                  type="text"
                  name="cluster_detail[comments]"
                  label="Comments"
                  value={data.cluster_detail.comments}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comments}
                  feedbackInvalid={errors.comments}
                />
              </CCol>

            </CRow>
            
          </CCardBody>
        </CCard>
        {(data.package_id==2 || data.package_id==3) && (
          <CCard className="mb-4">
          <CCardHeader>
            <strong>Suspension & Steering</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[front_strut_mount_condition]"
                  label="Front strut mount condition"
                  value={data.suspension_detail.front_strut_mount_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Maintainance", label: "Need Maintainance" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[rear_strut_mount_condition]"
                  label="Rear strut mount condition"
                  value={data.suspension_detail?.rear_strut_mount_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Maintainance", label: "Need Maintainance" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[front_shock_absorber_function]"
                  label="Front shock absorber function"
                  value={data.suspension_detail?.front_shock_absorber_function}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[rear_shock_absorber_function]"
                  label="Rear shock absorber function"
                  value={data.suspension_detail?.rear_shock_absorber_function}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[front_spring_integrity]"
                  label="Front spring integrity"
                  value={data.suspension_detail?.front_spring_integrity}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[rear_spring_integrity]"
                  label="Rear spring integrity"
                  value={data.suspension_detail?.rear_spring_integrity}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[control_arm_bush_condition]"
                  label="Control arm bush condition"
                  value={data.suspension_detail?.control_arm_bush_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Maintainance", label: "Need Maintainance" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[lower_ball_joint_play]"
                  label="Lower ball joint play"
                  value={data.suspension_detail?.lower_ball_joint_play}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[upper_ball_joint_play]"
                  label="Upper ball joint play"
                  value={data.suspension_detail?.upper_ball_joint_play}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[anti_roll_bar_links_bushes]"
                  label="Anti-roll bar links & bushes"
                  value={data.suspension_detail?.anti_roll_bar_links_bushes}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[steering_rack_seal_condition]"
                  label="Steering rack seal condition"
                  value={data.suspension_detail?.steering_rack_seal_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Maintainance", label: "Need Maintainance" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[steering_rack_play_check]"
                  label="Steering rack play check"
                  value={data.suspension_detail?.steering_rack_play_check}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[rack_end_condition]"
                  label="Rack end condition"
                  value={data.suspension_detail?.rack_end_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Maintainance", label: "Need Maintainance" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[tie_rod_end_play]"
                  label="Tie rod end play"
                  value={data.suspension_detail?.tie_rod_end_play}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[steering_column_noises]"
                  label="Steering column noises"
                  value={data.suspension_detail?.steering_column_noises}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "No Sound", label: "No Sound" },
                    { value: "Rattling Noice", label: "Rattling Noice" },
                    { value: "Squeaking", label: "Squeaking" },
                    { value: "Clunking", label: "Clunking" },
                    { value: "Grinding", label: "Grinding" },
                    { value: "Normal", label: "Normal" },
                    { value: "Good Condition", label: "Good Condition" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[power_steering_fluid_level_color]"
                  label="Power steering fluid level & color"
                  value={data.suspension_detail?.power_steering_fluid_level_color}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
            
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[power_steering_pump_noise]"
                  label="Power steering pump noise"
                  value={data.suspension_detail?.power_steering_pump_noise}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[subframe_mount_condition]"
                  label="Subframe mount condition"
                  value={data.suspension_detail?.subframe_mount_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Maintainance", label: "Need Maintainance" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[chassis_mounts_security]"
                  label="Chassis mounts security"
                  value={data.suspension_detail?.chassis_mounts_security}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  required
                  name="suspension_detail[steering_wheel_free_play]"
                  label="Steering wheel free play"
                  value={data.suspension_detail?.steering_wheel_free_play}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Need To Change", label: "Need To Change" }
                  ]}
                />
              </CCol>


              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="suspension_detail[comments_suspension]"
                  label="Comments"
                  value={data.suspension_detail.comments_suspension}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comments_suspension}
                  feedbackInvalid={errors.comments_suspension}
                />
              </CCol>

              
            </CRow>
            
          </CCardBody>
        </CCard>
        ) }    
        

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Brakes</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              
              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[master_cylinder_seal_condition]"
                  label="Master cylinder seal condition"
                  value={data.brakes_detail.master_cylinder_seal_condition}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Weak", label: "Weak" },
                    { value: "Need To Change", label: "Need To Change" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[brake_booster_operation]"
                  label="Brake booster operation"
                  value={data.brakes_detail.brake_booster_operation}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Weak", label: "Weak" },
                    { value: "Need To Change", label: "Need To Change" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[front_disc_condition_runout]"
                  label="Front disc condition & runout"
                  value={data.brakes_detail.front_disc_condition_runout}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Weak", label: "Weak" },
                    { value: "Need To Change", label: "Need To Change" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[rear_disc_drum_condition]"
                  label="Rear disc/drum condition"
                  value={data.brakes_detail.rear_disc_drum_condition}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Weak", label: "Weak" },
                    { value: "Need To Change", label: "Need To Change" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[front_pad]"
                  label="Front pad"
                  value={data.brakes_detail.front_pad}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Weak", label: "Weak" },
                    { value: "Need To Change", label: "Need To Change" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[rear_pad]"
                  label="Rear pad"
                  value={data.brakes_detail.rear_pad}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Weak", label: "Weak" },
                    { value: "Need To Change", label: "Need To Change" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[handbrake_adjustment_holding]"
                  label="Handbrake adjustment & holding"
                  value={data.brakes_detail.handbrake_adjustment_holding}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Attention", label: "Need Attention" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[abs_function_wheel_speed_check]"
                  label="ABS function / wheel speed check"
                  value={data.brakes_detail.abs_function_wheel_speed_check}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Attention", label: "Need Attention" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[brake_pedal_travel_firmness]"
                  label="Brake pedal travel & firmness"
                  value={data.brakes_detail.brake_pedal_travel_firmness}
                    onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" },
                    { value: "Need Attention", label: "Need Attention" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="brakes_detail[brake_fluid_contamination_test_note]"
                  label="Brake fluid contamination test note"
                  value={data.brakes_detail.brake_fluid_contamination_test_note}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Average", label: "Average" },
                    { value: "Bad", label: "Bad" }
                  ]}
                />
              </CCol>



              <CCol md={4}>
                <CFormInput
                  type="text"
                  name="brakes_detail[comments_brakes]"
                  label="Comments"
                  value={data.brakes_detail.comments_brakes}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comments_brakes}
                  feedbackInvalid={errors.comments_brakes}
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
              <Select2Multi
              required
                name="interior_detail[dashboard_fit_finish]"
                label="Dashboard fit & finish"
                value={data.interior_detail.dashboard_fit_finish}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
              required
                name="interior_detail[instrument_cluster_illumination]"
                label="Instrument cluster illumination"
                value={data.interior_detail.instrument_cluster_illumination}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
              required
                name="interior_detail[odometer_function]"
                label="Odometer function"
                value={data.interior_detail.odometer_function}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
              required
                name="interior_detail[interior_lighting]"
                label="Interior lighting (dome/map)"
                value={data.interior_detail.interior_lighting}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
              required
                name="interior_detail[glove_box_latching]"
                label="Glove box latching"
                value={data.interior_detail.glove_box_latching}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
              required
                name="interior_detail[carpet_wear_retention]"
                label="Carpet wear & retention"
                value={data.interior_detail.carpet_wear_retention}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
              required
                name="interior_detail[interior_contamination_odour]"
                label="Interior contamination/odour check"
                value={data.interior_detail.interior_contamination_odour}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={4}>
              <Select2Multi
              required
                name="interior_detail[trunk_boot_interior_condition]"
                label="Trunk/boot interior condition"
                value={data.interior_detail.trunk_boot_interior_condition}
                onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Bad", label: "Bad" },
                  { value: "Need Attention", label: "Need Attention" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
            </CCol>

            <CCol md={12}>
                <CFormInput
                  type="text"
                  name="interior_detail[comment]"
                  label="Comments"
                  value={data.interior_detail.comment}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comment}
                  feedbackInvalid={errors.comment}
                />
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
                <Select2Multi
                required
                  name="seat_detail[driver_seat_adjust_locks]"
                  label="Driver seat adjust & locks"
                  value={data.seat_detail.driver_seat_adjust_locks}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Working Properly", label: "Working Properly" },
                    { value: "Need Programing", label: "Need Programing" },
                    { value: "Not Working", label: "Not Working" },
                    { value: "Need Maintainance", label: "Need Maintainance" },
                  ]}
                />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="seat_detail[passenger_seat_adjust_locks]"
                  label="Passenger seat adjust & locks"
                  value={data.seat_detail.passenger_seat_adjust_locks}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Working Properly", label: "Working Properly" },
                    { value: "Need Programing", label: "Need Programing" },
                    { value: "Not Working", label: "Not Working" },
                    { value: "Need Maintainance", label: "Need Maintainance" },
                  ]}
              />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="seat_detail[seat_sliding_rails]"
                  label="Seat sliding rails lubrication & function"
                  value={data.seat_detail.seat_sliding_rails}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Working Properly", label: "Working Properly" },
                    { value: "Need Programing", label: "Need Programing" },
                    { value: "Not Working", label: "Not Working" },
                    { value: "Need Maintainance", label: "Need Maintainance" },
                  ]}
              />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="seat_detail[seat_type]"
                  label="Seat Type"
                  value={data.seat_detail.seat_type}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "GiLeatherArmor", label: "GiLeatherArmor" },
                    { value: "Fabric", label: "Fabric" },
                    { value: "Vinyl", label: "Vinyl" },
                    { value: "Cloth", label: "Cloth" },
                    { value: "Leather", label: "Leather" },
                    { value: "Synthetic Leather", label: "Synthetic Leather" },
                    { value: "Alcantara", label: "Alcantara" },
                    { value: "Other", label: "Other" },
                  ]}
              />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="seat_detail[seat_cushion_wear]"
                  label="Seat cushion wear"
                  value={data.seat_detail.seat_cushion_wear}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Worn Out", label: "Worn Out" },
                    { value: "Torn", label: "Torn" },
                    { value: "Stained", label: "Stained" },
                    { value: "Sagging", label: "Sagging" },
                    { value: "Stiching Lose", label: "Stiching Lose" },
                    { value: "Need Maintainance", label: "Need Maintainance" },
                  
                  ]}
              />
              </CCol>
              
    
              <CCol md={4}>
                <Select2Multi
                required
                  name="seat_detail[seat_upholstery_integrity]"
                  label="Seat upholstery integrity (front/rear)"
                  value={data.seat_detail.seat_upholstery_integrity}
                 onChange={(e) => setData(e.target.name, e.target.value)}
                options={[
                  
                  { value: "Good Condition", label: "Good Condition" },
                  { value: "Normal", label: "Normal" },
                  { value: "Weak", label: "Weak" },
                  { value: "Not Working", label: "Not Working" },
                  { value: "Need Maintainance", label: "Need Maintainance" },
                ]}
              />
              </CCol>

               <CCol md={12}>
                <CFormInput
                  type="text"
                  name="seat_detail[comment]"
                  label="Comments"
                  value={data.seat_detail.comment}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comment}
                  feedbackInvalid={errors.comment}
                />
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
                <Select2Multi
                  multiple
                  required
                  name="hvac_detail[air_condition]"
                  label="Air Condition"
                  value={data.hvac_detail.air_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "AC Not Cooling", label: "AC Not Cooling" },
                      { value: "Weak Airflow From Vents", label: "Weak Airflow From Vents" },
                      { value: "Blower Fan Not Working", label: "Blower Fan Not Working" },
                      { value: "AC Making Noise", label: "AC Making Noise" },
                      { value: "AC Smell / Moldy Odor", label: "AC Smell / Moldy Odor" },
                      { value: "Temperature Control Not Working", label: "Temperature Control Not Working" },
                      { value: "AC Switches / Buttons Faulty", label: "AC Switches / Buttons Faulty" },
                      { value: "Rear AC Not Working", label: "Rear AC Not Working" },
                      { value: "AC Compressor Not Working", label: "AC Compressor Not Working" },
                      { value: " Compressor Noisy / Rattling", label: " Compressor Noisy / Rattling" },
                      { value: "Compressor Seized", label: "Compressor Seized" },
                      { value: "Compressor Clutch Not Engaging", label: "Compressor Clutch Not Engaging" },
                      { value: "Low Compressor Efficiency", label: "Low Compressor Efficiency" },
                      { value: "Refrigerant Leak", label: "Refrigerant Leak" },
                      { value: "Cabin Filter Dirty / Clogged", label: "Cabin Filter Dirty / Clogged" },
                      { value: "AC Filter Needs Replacement", label: "AC Filter Needs Replacement" },
                      { value: "Filter Reducing Airflow", label: "Filter Reducing Airflow" },
                      { value: "Filter Missing / Not Installed", label: "Filter Missing / Not Installed" },
                      { value: "Need Maintainance", label: "Need Maintainance" },
                      
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                  multiple
                  required
                  name="hvac_detail[infotainment_condition]"
                  label="Infotainment Problems"
                  value={data.hvac_detail.infotainment_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Touchscreen Not Working", label: "Touchscreen Not Working" },
                      { value: "Navigation Malfunction", label: "Navigation Malfunction" },
                      { value: "Bluetooth / Connectivity Issues", label: "Bluetooth / Connectivity Issues" },
                      { value: "Screen Flickering", label: "Screen Flickering" },
                      { value: "System Freezing", label: "System Freezing" },
                      { value: "Need Maintainance", label: "Need Maintainance" },
                      
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                multiple
                required
                  name="hvac_detail[radio_condition]"
                  label="Radio Condition"
                  value={data.hvac_detail.radio_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "No Sound / Low Volume", label: "No Sound / Low Volume" },
                      { value: "Station Tuning Issue", label: "Station Tuning Issue" },
                      { value: "Intermittent Reception", label: "Intermittent Reception" },
                      { value: "Radio Not Powering On", label: "Radio Not Powering On" },
                      { value: "Speaker Not Working", label: "Speaker Not Working" },
                      { value: "Need Maintainance", label: "Need Maintainance" },
                    ]}
                  />
              </CCol>

               <CCol md={12}>
                <CFormInput
                  type="text"
                  name="hvac_detail[comment]"
                  label="Comments"
                  value={data.hvac_detail.comment}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comment}
                  feedbackInvalid={errors.comment}
                />
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
                <Select2Multi
                multiple
                required
                  name="cooling_detail[radiator_core_condition]"
                  label="Radiator core condition"
                  value={data.cooling_detail.radiator_core_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Radiator Leak", label: "Radiator Leak" },
                    { value: "Coolant Low / Empty", label: "Coolant Low / Empty" },
                    { value: "Overheating Engine", label: "Overheating Engine" },
                    { value: "Radiator Fan Not Working", label: "Radiator Fan Not Working" },
                    { value: "Coolant Hose Leak / Cracked", label: "Coolant Hose Leak / Cracked" },
                    { value: "Thermostat Malfunction", label: "Thermostat Malfunction" },
                    { value: "Water Pump Faulty / Noisy", label: "Water Pump Faulty / Noisy" },
                    { value: "Radiator Clogged / Blocked", label: "Radiator Clogged / Blocked" },
                    { value: "Coolant Reservoir Damaged / Leaking", label: "Coolant Reservoir Damaged / Leaking" },
                    { value: "Heater Not Working (due to coolant issue)", label: "Heater Not Working (due to coolant issue)" },
                    { value: " Radiator Cap Faulty / Leaking", label: " Radiator Cap Faulty / Leaking" },
                    { value: "Air Trapped In Cooling System", label: "Air Trapped In Cooling System" },
                  ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="cooling_detail[radiator_fan_operation]"
                  label="Radiator fan operation (low/high speed)"
                  value={data.cooling_detail.radiator_fan_operation}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Working Properly", label: "Working Properly" },
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Noicy", label: "Noicy" },
                      { value: "Need Maintainance", label: "Need Maintainance" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="cooling_detail[cycling_observation]"
                  label="Cycling observation"
                  value={data.cooling_detail.cycling_observation}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Need Maintainance", label: "Need Maintainance" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="cooling_detail[overflow_expansion_tank_condition]"
                  label="Overflow/expansion tank condition"
                  value={data.cooling_detail.overflow_expansion_tank_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Bad", label: "Bad" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="cooling_detail[heater_core_performance]"
                  label="Heater core performance (cab heat)"
                  value={data.cooling_detail.heater_core_performance}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Working Properly", label: "Working Properly" },
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Noicy", label: "Noicy" },
                      { value: "Need Maintainance", label: "Need Maintainance" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                
                required
                  name="cooling_detail[fuel_tank_inspection]"
                  label="Fuel tank inspection (visual)"
                  value={data.cooling_detail.fuel_tank_inspection}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                     
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Need Attention", label: "Need Attention" },
                      { value: "Leaking", label: "Leaking" },
                      { value: "Damaged", label: "Damaged" },
                    ]}
                  />
              </CCol>

              <CCol md={12}>
                <CFormInput
                  type="text"
                  name="cooling_detail[comment]"
                  label="Comments"
                  value={data.cooling_detail.comment}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comment}
                  feedbackInvalid={errors.comment}
                />
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
                <Select2Multi
                required
                  name="electrical_detail[starter_engagement_reliability]"
                  label="Starter engagement reliability"
                  value={data.electrical_detail.starter_engagement_reliability}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Works Perfectly", label: "Works Perfectly" },
                      { value: "Slow Engagement", label: " Slow Engagement" },
                      { value: "Clicking Sound", label: "Clicking Sound" },
                      { value: "Fails To Start", label: "Fails To Start" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="electrical_detail[front_indicators_function]"
                  label="Front indicators function"
                  value={data.electrical_detail.front_indicators_function}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Working", label: "Working" },
                      { value: "Flickering", label: "Flickering" },
                      { value: "Not Working", label: "Not Working" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="electrical_detail[rear_indicators_function]"
                  label="Rear indicators function"
                  value={data.electrical_detail.rear_indicators_function}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
    
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Bad", label: "Bad" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="electrical_detail[reverse_light_function]"
                  label="Reverse light function"
                  value={data.electrical_detail.reverse_light_function}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Working", label: "Working" },
                      { value: "Flickering", label: "Flickering" },
                      { value: "Not Working", label: "Not Working" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="electrical_detail[fog_lights_front_rear]"
                  label="Fog lights front/rear"
                  value={data.electrical_detail.fog_lights_front_rear}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Working", label: "Working" },
                      { value: "Flickering", label: "Flickering" },
                      { value: "Not Working", label: "Not Working" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="electrical_detail[interior_control_switches_backlight]"
                  label="Interior control switches backlight"
                  value={data.electrical_detail.interior_control_switches_backlight}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Working", label: "Working" },
                      { value: "Dim / Intermittent", label: "Dim / Intermittent" },
                      { value: "Not Working", label: "Not Working" },
                    ]}
                  />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="electrical_detail[parking_sensor_functionality]"
                  label="Parking sensor functionality"
                  value={data.electrical_detail.parking_sensor_functionality}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Fully Functional", label: "Fully Functional" },
                    { value: "Intermittent", label: "Intermittent" },
                    { value: "Not wWrking", label: "Not Working" }
                  ]}
                />
              </CCol>

              <CCol md={12}>
                <CFormInput
                  type="text"
                  name="electrical_detail[comment]"
                  label="Comments"
                  value={data.electrical_detail.comment}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comment}
                  feedbackInvalid={errors.comment}
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
                required
                  type="text"
                  name="tyre_detail[tyre_brand_size_lf]"
                  label="Tyre brand & size (LF)"
                  value={data.tyre_detail.tyre_brand_size_lf}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_brand_size_lf}
                  feedbackInvalid={errors.tyre_brand_size_lf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_brand_size_rf]"
                  label="Tyre brand & size (RF)"
                  value={data.tyre_detail.tyre_brand_size_rf}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_brand_size_rf}
                  feedbackInvalid={errors.tyre_brand_size_rf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_brand_size_lr]"
                  label="Tyre brand & size (LR)"
                  value={data.tyre_detail.tyre_brand_size_lr}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_brand_size_lr}
                  feedbackInvalid={errors.tyre_brand_size_lr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_brand_size_rr]"
                  label="Tyre brand & size (RR)"
                  value={data.tyre_detail.tyre_brand_size_rr}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_brand_size_rr}
                  feedbackInvalid={errors.tyre_brand_size_rr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_manufacture_date_lf]"
                  label="Tyre manufacture date (LF)"
                  value={data.tyre_detail.tyre_manufacture_date_lf}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_lf}
                  feedbackInvalid={errors.tyre_manufacture_date_lf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_manufacture_date_rf]"
                  label="Tyre manufacture date (RF)"
                  value={data.tyre_detail.tyre_manufacture_date_rf}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_rf}
                  feedbackInvalid={errors.tyre_manufacture_date_rf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_manufacture_date_lr]"
                  label="Tyre manufacture date (LR)"
                  value={data.tyre_detail.tyre_manufacture_date_lr}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_lr}
                  feedbackInvalid={errors.tyre_manufacture_date_lr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_manufacture_date_rr]"
                  label="Tyre manufacture date (RR)"
                  value={data.tyre_detail.tyre_manufacture_date_rr}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_manufacture_date_rr}
                  feedbackInvalid={errors.tyre_manufacture_date_rr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tread_depth_lf]"
                  label="Tread depth (LF)"
                  value={data.tyre_detail.tread_depth_lf}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tread_depth_lf}
                  feedbackInvalid={errors.tread_depth_lf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tread_depth_rf]"
                  label="Tread depth (RF)"
                  value={data.tyre_detail.tread_depth_rf}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tread_depth_rf}
                  feedbackInvalid={errors.tread_depth_rf}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tread_depth_lr]"
                  label="Tread depth (LR)"
                  value={data.tyre_detail.tread_depth_lr}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tread_depth_lr}
                  feedbackInvalid={errors.tread_depth_lr}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tread_depth_rr]"
                  label="Tread depth (RR)"
                  value={data.tyre_detail.tread_depth_rr}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tread_depth_rr}
                  feedbackInvalid={errors.tread_depth_rr}
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[tyre_pressure]"
                  label="Tyre pressure (LF/RF/LR/RR)"
                  value={data.tyre_detail.tyre_pressure}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_pressure}
                  feedbackInvalid={errors.tyre_pressure}
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                required
                  type="text"
                  name="tyre_detail[spare_wheel_condition]"
                  label="Spare wheel presence & condition"
                  value={data.tyre_detail.spare_wheel_condition}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.spare_wheel_condition}
                  feedbackInvalid={errors.spare_wheel_condition}
                />
              </CCol>

              <CCol md={12}>
                <CFormInput
                  type="text"
                  name="tyre_detail[tyre_comment]"
                  label="Comments"
                  value={data.tyre_detail.tyre_comment}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.tyre_comment}
                  feedbackInvalid={errors.tyre_comment}
                />
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
                <Select2Multi
                required
                  name="road_test_detail[start_performance]"
                  label="Start Performance"
                  value={data.road_test_detail.start_performance}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Smooth Start", label: "Smooth Start" },
                      { value: "Hesitant", label: "Hesitant" },
                      { value: "Delayed", label: "Delayed" },
                      { value: "Difficult To Start", label: "Difficult To Start" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[acceleration_responsiveness]"
                  label="Acceleration Responsiveness"
                  value={data.road_test_detail.acceleration_responsiveness}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Smooth", label: "Smooth" },
                      { value: "Sluggish", label: "Sluggish" },
                      { value: "Delayed Response", label: "Delayed Response" },
                      { value: "Jerky", label: "Jerky" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[cruise_control_engagement_test]"
                  label="Cruise Control Engagement Test"
                  value={data.road_test_detail.cruise_control_engagement_test}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                 options={[
                      { value: "Works", label: "Works" },
                      { value: "Intermittent", label: "Intermittent" },
                      { value: "Not Working", label: "Not Working" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[garebox_performance]"
                  label="Gearbox Performance"
                  value={data.road_test_detail.garebox_performance}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  options={[
                    { value: "Smooth Shifting", label: "Smooth Shifting" },
                    { value: "Hard To Shift", label: "Hard To Shift" },
                    { value: "Gear Slipping", label: "Gear Slipping" },
                    { value: "Noisy / Grinding", label: "Noisy / Grinding" },
                  ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[engine_vibration_idle]"
                  label="Engine vibration at idle"
                  value={data.road_test_detail.engine_vibration_idle}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.engine_vibration_idle}
                  feedbackInvalid={errors.engine_vibration_idle}
                 options={[
                      { value: "Smooth", label: "Smooth" },
                      { value: "Mild Vibration", label: "Mild Vibration" },
                      { value: "Excessive Vibration", label: "Excessive Vibration" },
                      { value: "Bad", label: "Bad" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[mid_range_power]"
                  label="Mid-range power delivery"
                  value={data.road_test_detail.mid_range_power}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.mid_range_power}
                  feedbackInvalid={errors.mid_range_power}
                 options={[
                      
                      { value: "Smooth And Responsive", label: "Smooth And Responsive" },
                      { value: "Hesitant", label: "Hesitant" },
                      { value: "Weak / Laggy", label: "Weak / Laggy" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[highway_stability]"
                  label="Highway stability"
                  value={data.road_test_detail.highway_stability}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.highway_stability}
                  feedbackInvalid={errors.highway_stability}
                 options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Bad", label: "Bad" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[steering_feedback]"
                  label="Steering feedback & centering"
                  value={data.road_test_detail.steering_feedback}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.steering_feedback}
                  feedbackInvalid={errors.steering_feedback}
                 options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Bad", label: "Bad" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[abs_intervention]"
                  label="ABS intervention feel"
                  value={data.road_test_detail.abs_intervention}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.abs_intervention}
                  feedbackInvalid={errors.abs_intervention}
                 options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Bad", label: "Bad" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[braking_performance]"
                  label="Braking performance under test"
                  value={data.road_test_detail.braking_performance}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.braking_performance}
                  feedbackInvalid={errors.braking_performance}
                 options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Bad", label: "Bad" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[transmission_harshness]"
                  label="Transmission harshness under load"
                  value={data.road_test_detail.transmission_harshness}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.transmission_harshness}
                  feedbackInvalid={errors.transmission_harshness}
                 options={[
                      
                      { value: "Good Condition", label: "Good Condition" },
                      { value: "Normal", label: "Normal" },
                      { value: "Bad", label: "Bad" },
                    ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[clutch_engagement]"
                  label="Clutch engagement smoothness (manual)"
                  value={data.road_test_detail.clutch_engagement}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.clutch_engagement}
                  feedbackInvalid={errors.clutch_engagement}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" },
                  ]} />
              </CCol>

              <CCol md={4}>
                <Select2Multi
                required
                  name="road_test_detail[noise_levels]"
                  label="Noise levels at various speeds"
                  value={data.road_test_detail.noise_levels}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.noise_levels}
                  feedbackInvalid={errors.noise_levels}
                  options={[
                    
                    { value: "Good Condition", label: "Good Condition" },
                    { value: "Normal", label: "Normal" },
                    { value: "Bad", label: "Bad" },
                  ]} />
              </CCol>

              <CCol md={12}>
                <CFormInput
                  type="text"
                  name="road_test_detail[comment]"
                  label="Comments"
                  value={data.road_test_detail.comment}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.comment}
                  feedbackInvalid={errors.comment}
                />
              </CCol>


              
            </CRow>
            
          </CCardBody>
        </CCard>

         <CCard className="mb-4">
          <CCardHeader>
            <strong>Vehicle Images</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='g-3'>
              <CCol md={4}>
                <CFormInput
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                  name="vehicle_detail[images]"
                  label="Images"
                  onChange={(e) => {
                  const newFiles = Array.from(e.target.files);

                  setData("vehicle_detail.images", [
                    ...(Array.isArray(data.vehicle_detail.images)
                      ? data.vehicle_detail.images
                      : typeof data.vehicle_detail.images === "string"
                      ? JSON.parse(data.vehicle_detail.images)
                      : []),
                    ...newFiles,
                  ]);
                }}
                  invalid={!!errors.images}
                  feedbackInvalid={errors.images}
                />
              </CCol>

              <div className="mt-3 d-flex flex-wrap gap-2">
              {Array.isArray(images) &&
                images.map((file, index) => {
                  let imageUrl;

                  // Case 1: DB string path (with or without \/)
                  if (typeof file === "string") {
                    imageUrl = file.replace(/\\\//g, "/"); 
                  }
                  // Case 2: New uploads (File objects)
                  else if (file instanceof File) {
                    imageUrl = URL.createObjectURL(file);
                  }

                  return (
                    <div
                      key={index}
                      style={{ width: "100px", position: "relative" }}
                    >
                      <img
                        src={imageUrl}
                        alt={`preview-${index}`}
                        className="img-fluid rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index,'images')}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
            </div>
              
            </CRow>
            
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Vehicle Files (Images / PDFs)</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="g-3">
              <CCol md={4}>

                <CFormInput
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  name="documents"
                  label="Upload Files"
                  onChange={(e) => {
                  const newFiles = Array.from(e.target.files);

                  setData("documents", [
                    ...(Array.isArray(data.documents)
                      ? data.documents
                      : typeof data.documents === "string"
                      ? JSON.parse(data.documents)
                      : []),
                    ...newFiles,
                  ]);
                }}
                  invalid={!!errors.documents}
                  feedbackInvalid={errors.documents}
                />
              </CCol>

              {/* Preview Section */}
              <div className="mt-3 d-flex flex-wrap gap-2">
                {Array.isArray(documents) &&
                  documents.map((file, index) => {
                    let fileUrl;
                    let isPdf = false;

                    // Case 1: DB string path
                    if (typeof file === "string") {
                      fileUrl = file.replace(/\\\//g, "/");
                      isPdf = fileUrl.toLowerCase().endsWith(".pdf");
                    }
                    // Case 2: New uploads (File objects)
                    else if (file instanceof File) {
                      fileUrl = URL.createObjectURL(file);
                      isPdf = file.type === "application/pdf";
                    }

                    return (
                      <div
                        key={index}
                        style={{
                          width: "100px",
                          height: "100px",
                          position: "relative",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          overflow: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "#f9f9f9",
                        }}
                      >
                        {isPdf ? (
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              color: "red",
                              fontSize: "12px",
                              textAlign: "center",
                            }}
                          >
                            📄 PDF
                          </a>
                        ) : (
                          <img
                            src={fileUrl}
                            alt={`preview-${index}`}
                            className="img-fluid"
                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                          />
                        )}

                        {/* Remove Button */}
                        <button
                          type="button"
                           onClick={() => removeFile(index,'documents')}
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
              </div>

              <CCol md={12}>
                <CFormInput
                  type="text"
                  name="over_comments"
                  label="Comments"
                  value={data.over_comments}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.over_comments}
                  feedbackInvalid={errors.over_comments}
                />
              </CCol>
                
               {(data.package_id==2 || data.package_id==3) && (
              <CCol md={12}>
                <CFormInput
                  type="text"
                  name="accident"
                  label="Accident, Flood, Etc"
                  value={data.accident}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                  invalid={!!errors.accident}
                  feedbackInvalid={errors.accident}
                />
              </CCol>
               )}
            </CRow>
          </CCardBody>
        </CCard>


        
        

        <CCol xs={12}>
            <CButton type="submit" color="primary" className="px-4" disabled={processing}>
            {processing ? 'Saving...' : 'Save'}
            </CButton>
        </CCol>

      </CCol>
    </CForm>
  </CRow>
  )
}



AddInspection.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default AddInspection
