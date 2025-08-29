import CustomerLayout from '../../layout/CustomerLayout'
import { FiMapPin } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import contactbg from "../../assets/images/contactbg.jpg";
import writeusbg from "../../assets/images/writeusbg.jpg";
import redarrowRg from "../../assets/images/redarrowRg.png";
import writeusredicon from "../../assets/images/writeusredicon.png";
import { route } from 'ziggy-js'
import { useForm, usePage } from '@inertiajs/react'

// contactbg
const ContactUs = () => {
  const { props } = usePage()
  const { data, setData, post, processing, errors, reset } = useForm({
    name: props?.name || '',
    email: props?.email || '',
    phone_no: props?.phone_no || '',
    service_type: props?.service_type || '',
    description: props?.description || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('contactus'), {
        preserveScroll: true,
        onSuccess: () => {
            reset()
        }
    })
  }
  return (
    <>
      <section className="relative text-white pb-[20px] pt-16 md:pb-16  overflow-hidden">
        <div className='flex items-center absolute right-[0] top-[0] bottom-[inherit] md:bottom-[0] m-auto z-[1]'>
          <img src={redarrowRg} alt="img" className='block md:hidden max-w-full max-h-[300px]' />
          <img src={redarrowRg} alt="img" className='hidden md:block max-w-full' />
        </div>
        <img src={contactbg} alt="Background" className=" absolute inset-0 w-full h-full max-h-[320px] md:max-h-[830px] object-cover" />

        {/* Heading */}
        <div className="relative container z-[1] mb-12 !pt-[130px] md:!pt-[150px] !mb-[60px] ">
          <h2 className="ppfont text-[40px] md:text-[60px] lg:text-[70px] leading-tight">Contact Us</h2>
          <p className="creatodisplayM text-[22px]">Get in touch today!</p>
        </div>

        <div className='relative z-[1]'>
          <div className='container'>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              {/* Visit Us */}
              <div className="bg-[#192735] min-h-auto px-[15px] py-[15px] md:px-[20px] md:py-[30px] xl:px-[50px] lg:py-[40px] rounded-[20px] flex flex-wrap items-center sm:flex-nowrap md:flex-col md:items-start gap-4">
                <div className="flex items-center justify-center bg-[#F61221] w-[44px] h-[44px] md:w-[64px] md:h-[64px] rounded-full">
                  <FiMapPin className="text-white text-[20px] md:text-[25px]" />
                </div>
                <div className='w-full max-w-[75%] md:max-w-[100%]'>
                  <h3 className="ppfont w-full sm:w-auto text-[22px] md:text-[28px]">Visit Us at</h3>
                  <p className="creatodisplayM  text-[15px] md:text-[18px] text-[#ffffffa1]">
                    3433 boul. de la Pinière, suite 203, <br />
                    Terrebonne, QC J6X 0A1
                  </p>
                </div>
              </div>



              <div className="bg-[#192735] min-h-auto px-[15px] py-[15px] md:px-[20px] md:py-[30px] xl:px-[50px] lg:py-[40px] rounded-[20px] flex flex-wrap items-center sm:flex-nowrap md:flex-col md:items-start gap-4">
                <div className="flex items-center justify-center bg-[#F61221] w-[44px] h-[44px] md:w-[64px] md:h-[64px] rounded-full">
                <FiPhone className="text-white text-[20px] md:text-[25px]" />
                </div>
                <div className='w-full max-w-[75%] md:max-w-[100%]'>
                  <h3 className="ppfont w-full sm:w-auto text-[22px] md:text-[28px]">Call Us at</h3>
                  <p className="creatodisplayM  text-[15px] md:text-[18px] text-[#ffffffa1]">
                  +971 585581172
                  </p>
                </div>
              </div>



              <div className="bg-[#192735] min-h-auto px-[15px] py-[15px] md:px-[20px] md:py-[30px] xl:px-[50px] lg:py-[40px] rounded-[20px] flex flex-wrap items-center sm:flex-nowrap md:flex-col md:items-start gap-4">
                <div className="flex items-center justify-center bg-[#F61221] w-[44px] h-[44px] md:w-[64px] md:h-[64px] rounded-full">
                <AiOutlineMail className="text-white text-[20px] md:text-[25px]" />
                </div>
                <div className='w-full max-w-[75%] md:max-w-[100%]'>
                  <h3 className="ppfont w-full sm:w-auto text-[22px] md:text-[28px]">Mail Us at</h3>
                  <p className="creatodisplayM  text-[15px] md:text-[18px] text-[#ffffffa1]">
                  info@certifycars.ae
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>







      <section className="w-full bg-white py-[10px] pb-[40px] md:py-[80px]">
        <div className="container flex flex-col md:flex-row items-center gap-10">
          {/* Left: Image */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-[20px] overflow-hidden">
              <img
                src={writeusbg} 
                alt="Contact us"
                className="w-full h-full object-cover"
              />
              {/* Red overlay shape */}
              <div className="absolute top-[-100px] md:top-[0] bottom-[0] m-auto inset-0 left-[-80px] ">
                <img src={writeusredicon} alt="" />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2">
            <div className='mb-[20px] pb-[15px] lg:mb-[40px] lg:pb-[30px] border-b-[1px] border-b-[#00000021]'>
            <h2 className="ppfont text-[22px] md:text-[26px] lg:text-[36px] lg:leading-[37px] text-[#192735] mb-[5px]">Write to us!</h2>
            <p className="creatodisplayM text-[20px] text-[#192735a8]">
              We’ll get back to you as soon as possible
            </p>
            </div>

            <form className="space-y-3 lg:space-y-5 contactForm" onSubmit={handleSubmit}>
             

              <div className='relative'> 
                <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              </div>

              <div className='relative'> 
                <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>

              <div className='relative'> 
                <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Phone</label>
              <input
                type="tel"
                placeholder="Phone"
                className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                value={data.phone_no}
                onChange={(e) => setData('phone_no', e.target.value)}
              />
              {errors.phone_no && <div className="text-red-500 text-sm">{errors.phone_no}</div>}
              </div>
              <div className='relative'> 
                <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Service Type</label>
              <input
                type="text"
                placeholder="Service Type"
                className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                value={data.service_type}
                onChange={(e) => setData('service_type', e.target.value)}
              />
              {errors.service_type && <div className="text-red-500 text-sm">{errors.service_type}</div>}
              </div>
              <div className='relative'> 
                <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Message</label>
              <textarea
                placeholder="Message"
                rows="4"
                className="border border-[#192735] rounded-[20px] px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              ></textarea>
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
              </div>
              <button type="submit" className="redbtn creatodisplayB flex-inline cursor-pointer  w-[200px] md:w-[247px] bg-[#F61221] text-[15px] md:text-[20px] text-white rounded-full py-[13px] md:py-[17px] hover:opacity-90 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

ContactUs.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default ContactUs
