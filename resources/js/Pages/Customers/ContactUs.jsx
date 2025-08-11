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
      <section className="relative text-white py-16  overflow-hidden">
        <div className='flex items-center absolute right-[0] top-[0] bottom-[inherit] md:bottom-[0] m-auto z-[1]'>
          <img src={redarrowRg} alt="img" className='block md:hidden max-w-full max-h-[300px]' />
          <img src={redarrowRg} alt="img" className='hidden md:block max-w-full' />
        </div>
        <img src={contactbg} alt="Background" className=" absolute inset-0 w-full h-full max-h-[320px] md:max-h-[830px] object-cover" />

        {/* Heading */}
        <div className="relative container z-[1] mb-12 !pt-[130px] md:!pt-[150px] !mb-[60px] ">
          <h2 className="ppfont text-[40px] md:text-[60px] lg:text-[70px] leading-tight">Contact Us</h2>
          <p className="creatodisplayM text-[24px]">Get in touch today!</p>
        </div>

        <div className='relative z-[1]'>
          <div className='container'>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Visit Us */}
              <div className="bg-[#192735] min-h-[270px] px-[15px] py-[15px] md:px-[20px] md:py-[30px] xl:px-[50px] lg:py-[40px] rounded-[20px] flex flex-col items-start gap-4">
                <div className="flex items-center justify-center bg-[#F61221] w-[64px] h-[64px] rounded-full">
                  <FiMapPin className="text-white text-[25px]" />
                </div>
                <h3 className="ppfont text-[24px] md:text-[28px]">Visit Us at</h3>
                <p className="creatodisplayM text-[18px] text-[#ffffffa1]">
                  3433 boul. de la Pinière, suite 203, <br />
                  Terrebonne, QC J6X 0A1
                </p>
              </div>

              {/* Call Us */}
              <div className="bg-[#192735] min-h-[270px] px-[15px] py-[15px] md:px-[20px] md:py-[30px] xl:px-[50px] lg:py-[40px] rounded-[20px] flex flex-col items-start gap-4">
                <div className="flex items-center justify-center bg-[#F61221] w-[64px] h-[64px] rounded-full">
                  <FiPhone className="text-white text-[25px]" />
                </div>
                <h3 className="ppfont text-[24px] md:text-[28px]">Call Us at</h3>
                <p className="creatodisplayM text-[18px] text-[#ffffffa1]">(450) 968-0300</p>
              </div>

              {/* Mail Us */}
              <div className="bg-[#192735] min-h-[270px] px-[15px] py-[15px] md:px-[20px] md:py-[30px] xl:px-[50px] lg:py-[40px] rounded-[20px] flex flex-col items-start gap-4">
                <div className="flex items-center justify-center bg-[#F61221] w-[64px] h-[64px] rounded-full">
                  <AiOutlineMail className="text-white text-[25px]" />
                </div>
                <h3 className="ppfont text-[24px] md:text-[28px]">Mail Us at</h3>
                <p className="creatodisplayM text-[18px] text-[#ffffffa1] break-words whitespace-normal workbreak">info@certifycars.ae</p>
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
            <div className='mb-[40px] pb-[30px] border-b-[1px] border-b-[#00000021]'>
            <h2 className="ppfont text-[22px] md:text-[26px] lg:text-[36px] text-[#192735] mb-1">Write to us!</h2>
            <p className="creatodisplayM text-[20px] text-[#192735a8]">
              We’ll get back to you as soon as possible
            </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-full px-[30px] py-[18px] outline-none focus:ring-2 focus:ring-[#ccc]"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-full px-[30px] py-[18px] outline-none focus:ring-2 focus:ring-[#ccc]"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              <input
                type="tel"
                placeholder="Phone"
                className="w-full border rounded-full px-[30px] py-[18px] outline-none focus:ring-2 focus:ring-[#ccc]"
                value={data.phone_no}
                onChange={(e) => setData('phone_no', e.target.value)}
              />
              {errors.phone_no && <div className="text-red-500 text-sm">{errors.phone_no}</div>}
              <input
                type="text"
                placeholder="Service Type"
                className="w-full border rounded-full px-[30px] py-[18px] outline-none focus:ring-2 focus:ring-[#ccc]"
                value={data.service_type}
                onChange={(e) => setData('service_type', e.target.value)}
              />
              {errors.service_type && <div className="text-red-500 text-sm">{errors.service_type}</div>}
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full border rounded-[20px] px-[30px] py-[18px] outline-none resize-none focus:ring-2 focus:ring-[#ccc]"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              ></textarea>
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
              <button type="submit" className="redbtn creatodisplayB flex-inline cursor-pointer  w-[247px] bg-[#F61221] text-[20px] text-white rounded-full py-[17px] hover:opacity-90 transition">
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
