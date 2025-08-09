import CustomerLayout from '../../layout/CustomerLayout'
import registerbg from "../../assets/images/registerbg.jpg"; 
import homeoverlaybg from "../../assets/images/homeoverlaybg.png";
import redangleleft from "../../assets/images/redangleleft.png";
import redarrowRg from "../../assets/images/redarrowRg.png";
const Register = () => {
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
                <a href="#" className="text-[#D72638] font-medium">Login</a>
              </p>
            </div>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-transparent border border-[#ffffff29] creatodisplayM text-[#ffffff99] text-[20px] rounded-full px-[25px] py-[18px] focus:outline-none focus:border-red-500"
              />

              <button type="submit" className="redbtn creatodisplayB flex-inline cursor-pointer  w-[247px] bg-[#F61221] text-[20px] text-white rounded-full py-[17px] hover:opacity-90 transition">Submit</button>
            </form>
          </div>

          

        </div>
      </div>
    </>
  )
}

Register.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default Register
