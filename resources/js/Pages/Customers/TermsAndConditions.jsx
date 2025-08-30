import CustomerLayout from '../../layout/CustomerLayout'
import redarrowRg from "../../assets/images/redarrowRg.png";
import termbg from "../../assets/images/termbg.jpg";
const TermsAndConditions = () => {
  return (
    <>
      <div className='relative overflow-hidden min-h-[335px] md:min-h-[435px] lg:min-h-[535px]'>
        <div className='flex items-center absolute right-[0] top-[20px] md:top-[90px] bottom-[inherit] md:bottom-[0] m-auto z-[1]'>
          <img src={redarrowRg} alt="img" className='block lg:hidden max-w-full max-h-[400px]' />
          <img src={redarrowRg} alt="img" className='hidden lg:block max-w-full' />
        </div>
        <img src={termbg} alt="Background" className=" absolute inset-0 w-full h-full  object-cover" />

        {/* Heading */}
        <div className="relative container z-[1] mb-12 !pt-[160px] md:!pt-[250px] ">
          <h2 className="ppfont text-[30px] md:text-[60px] lg:text-[70px] leading-tight  text-white">Terms & Conditions</h2>
          <p className="creatodisplayM text-[18px] md:text-[22px] lg:text-[24px] text-white">Effective Date: 28 Jun 2025</p>
        </div>
      </div>

      <div className='py-[30px] md:py-[40px] lg:py-[60px]'>
        <div className='container'>
          <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[30px] '>Welcome to certifycar! These Terms and Conditions ("Terms") govern your access to and use of our website, mobile application, and vehicle inspection services ("Services"). By using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our platform.</p>
          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>1. Definitions</h2>
            
            <ul  className='pl-[35px] list-disc flex flex-col gap-[10px] creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] '>
              <li>“We”, “Us”, “Our” refer to Vehicheck (or your company name).</li>
              <li>“You”, “User”, “Customer” refers to any individual or entity using our Services.</li>
              <li>“Inspection” refers to the service of vehicle evaluation and reporting.</li>
              <li>“Report” means the outcome or document delivered post-inspection.</li>
            </ul>
            
          </div>


          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>2. Service Scope</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>Vehicheck offers pre-purchase, pre-sale, ownership-based, and compliance-ready vehicle inspections. These are conducted based on visible and accessible parts of the vehicle at the time of inspection. <br/> We do not dismantle vehicles or perform intrusive testing. Our findings are limited to visual checks, diagnostic scans (when available), and externally observable symptoms.</p>
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>3. Booking & Payments</h2>
            <ul  className='pl-[35px] list-disc flex flex-col gap-[10px] creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] '>
              <li>Bookings must be made via our website, app, or verified partners.</li>
              <li>Payments are to be made in advance or as agreed.</li>
              <li>Bookings are confirmed only after payment is successfully received.</li>
              <li>In case of cancellations, please refer to our refund policy (see section 7).</li>
            </ul>
            
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>4. Inspection Limitations</h2>
            <ul  className='pl-[35px] list-disc flex flex-col gap-[10px] creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] '>
              <li>Inspections are non-invasive. Hidden or internal defects may not be detectable.</li>
              <li>Reports are based on the vehicle’s condition at the time of inspection only.</li>
              <li>Vehicheck does not guarantee future performance or condition.</li>
              <li>We are not responsible for any subsequent failure, malfunction, or defect post-inspection.</li>
            </ul>
            
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>5. User Responsibilities</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>By using our Services, you agree to:</p>
            <ul  className='pl-[35px] list-disc flex flex-col gap-[10px] creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] '>
              <li>Provide accurate vehicle location and access permissions.</li>
              <li>Ensure the vehicle is available and stationary at the time of inspection.</li>
              <li>Notify us of any known issues or security limitations.</li>
              <li>Not misuse or copy our content, logos, or inspection formats.</li>
            </ul>
            
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>6. Accuracy & Liability Disclaimer</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>While we aim for high accuracy, Vehicheck and its affiliates will not be liable for:</p>
            <ul  className='pl-[35px] list-disc flex flex-col gap-[10px] creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] '>
              <li>Undetected issues due to vehicle concealment, environmental conditions, or limited access.</li>
              <li>Disputes between buyers and sellers regarding vehicle condition post-report.</li>
              <li>Financial loss, damages, or inconvenience resulting from actions based on our reports.</li>
              <li>Reports are advisory in nature and not a certification of roadworthiness.</li>
            </ul>
            
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>7. Cancellations & Refunds</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>You may cancel up to 12 hours before the scheduled inspection for a full refund.</p>
            <ul  className='pl-[35px] list-disc flex flex-col gap-[10px] creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] '>
              <li>Cancellations within 12 hours may be subject to a partial fee.</li>
              <li>If our technician is unable to inspect the vehicle due to access issues or misinformation, a service fee may still apply.</li>
              <li>Refunds, if applicable, are processed within 7 working days.</li>
            </ul>
            
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>8. Intellectual Property</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>All materials — including text, logos, content, and report formats — are property of Vehicheck. You may not reproduce, republish, or distribute them without prior written consent.</p>
           
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>9. Privacy & Data</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>By using our Services, you consent to our collection and use of personal and vehicle-related data in accordance with our Privacy Policy. We take data security seriously and do not share information with third parties unless required by law.</p>
           
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>10. Modifications</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>Vehicheck reserves the right to modify these Terms at any time. Changes will be posted on our website with a revised effective date. Continued use after updates means you accept the new Terms.</p>
           
            
          </div>

          <div className='mb-[20px] md:mb-[30px]'>
            <h2 className='ppfont text-[22px] md:text-[25px] lg:text-[28px] text-[#192735] mb-[8px]'>11. Governing Law</h2>
            <p className='creatodisplayM text-[#192735c2] text-[18px] md:text-[20px] mb-[10px] '>These Terms are governed by and interpreted in accordance with the laws of Dubai. Any disputes arising under these Terms shall be subject to the jurisdiction of the courts located in [Your City].</p>
           
          </div>

        
        </div>
      </div>

    </>
  )
}

TermsAndConditions.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default TermsAndConditions
