import CustomerLayout from '../../layout/CustomerLayout'
import registerbg from "../../assets/images/registerbg.jpg"; 
import homeoverlaybg from "../../assets/images/homeoverlaybg.png";
import redangleleft from "../../assets/images/redangleleft.png";
import redarrowRg from "../../assets/images/redarrowRg.png";
import { route } from 'ziggy-js'
import { useForm, usePage } from '@inertiajs/react'
const Register = () => {
  const { props } = usePage()
  const { data, setData, post, processing, errors, reset } = useForm({
    name: props?.name || '',
    company_name: props?.company_name || '',
    email: props?.email || '',
    buying_limit: props?.buying_limit || '',
    car_model: props?.car_model || '',
    model_year: props?.model_year || '',
    milage: props?.milage || '',
    account_manager: props?.account_manager || '',
    phone_no: props?.phone_no || '',
    password: props?.password || '',
    password_confirmation: props?.password_confirmation || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('register'), {
        preserveScroll: true,
        onSuccess: () => {
          reset()
        }
    })
  }
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center pt-[120px] pb-[50px] md:pt-[140px] md:pb-[120px] lg:pt-[180px] lg:pb-[140px]">
        {/* Right Side - Red Arrows */}
          <div className='flex items-center absolute right-[0] top-[0] bottom-[0] m-auto z-[1]'>
            <img src={redarrowRg} alt="img" className='max-w-full' />
          </div>

        {/* Background Image */}
        <img
          src={registerbg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Image */}
        <img
          src={homeoverlaybg}
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="container relative z-10 flex flex-col lg:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
          
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2 bg-[#192735] p-[25px] rounded-[15px] md:rounded-[30px]">
            <div className='border-b-[1px] border-b-[#ffffff29] pb-[30px] mb-[40px]'>
              <h1 className="ppfont text-[25px] md:text-[36px] text-[#fff] mb-[2px]">Welcome to certifycar</h1>
              <p className="creatodisplayM text-[20px] text-[#ffffff87]">
                Already have an account?{" "}
                <a href="/dealer" className="text-[#D72638] font-medium">Login</a>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
               {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              <input
                type="text"
                placeholder="Company Name"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.company_name}
                onChange={(e) => setData('company_name', e.target.value)}
              />
               {errors.company_name && <div className="text-red-500 text-sm">{errors.company_name}</div>}
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.phone_no}
                onChange={(e) => setData('phone_no', e.target.value)}
              />
              {errors.phone_no && <div className="text-red-500 text-sm">{errors.phone_no}</div>}
               <input
                type="number"
                placeholder="Buying Limit"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.buying_limit}
                onChange={(e) => setData('buying_limit', e.target.value)}
              />
              {errors.buying_limit && <div className="text-red-500 text-sm">{errors.buying_limit}</div>}
              <input
                type="text"
                placeholder="Car Model"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.car_model}
                onChange={(e) => setData('car_model', e.target.value)}
              />
              {errors.car_model && <div className="text-red-500 text-sm">{errors.car_model}</div>}
              <input
                type="number"
                placeholder="Model Year"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.model_year}
                onChange={(e) => setData('model_year', e.target.value)}
              />
              {errors.model_year && <div className="text-red-500 text-sm">{errors.model_year}</div>}
              <input
                type="number"
                placeholder="Milage"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.milage}
                onChange={(e) => setData('milage', e.target.value)}
              />
              {errors.milage && <div className="text-red-500 text-sm">{errors.milage}</div>}
              <input
                type="text"
                placeholder="Account Manager"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.account_manager}
                onChange={(e) => setData('account_manager', e.target.value)}
              />
              {errors.account_manager && <div className="text-red-500 text-sm">{errors.account_manager}</div>}
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
              {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}

              <button type="submit" className="redbtn creatodisplayB flex-inline cursor-pointer  w-[247px] bg-[#F61221] text-[20px] text-white rounded-full py-[17px] hover:opacity-90 transition">Register</button>
            </form>
          </div>

          

        </div>
      </div>
    </>
  )
}

Register.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default Register
