
import CustomerLayout from '../../layout/CustomerLayout'
import { FaFacebookF, FaInstagram } from "react-icons/fa";
// import pricingred from '../../assets/images/';
import pricingred from '../../assets/images/pricingred.png';
const ThankYou = () => {
  return (
    <>


<section class=" relative bg-[#0D1B2A] overflow-hidden pt-[100px] pb-[20px] md:pt-[100px] md:pb-[60px] lg:pt-[150px] lg:pb-[80px] text-white">
  <div class="flex items-center absolute top-[0] bottom-[0] left-[0] m-auto">
    {/* <img class="w-full" src="http://[::1]:5173/resources/js/assets/images/pricingred.png" alt="img"> */}
    <div className="flex items-center w-[300px] h-full absolute top-[130px] md:top-[0] bottom-[0] left-[0] m-auto">
        <img className="w-full" src={pricingred} alt="img" />
      </div>

    </div>

    <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px] px-4">
        <div className="relative z-[1] bg-white shadow-lg rounded-xl md:rounded-2xl p-[15px] md:p-[20px] lg:p-[25px] max-w-[700px] text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-15 h-15 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-green-100">
              <svg
                className="w-8 h-8 md:w-12 md:h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="ppfont text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px] font-bold text-[#192735] mb-2">Thank You!</h1>
          <p className="creatodisplayM text-[16px] md:text-[18px] lg:text-[20px] text-[#192735bd] mb-6">
          Your request is submitted successfully and One of our team member will contact you shortly.
          </p>

          {/* Button */}
          <button
            onClick={() => (window.location.href = "/")}
            className="creatodisplayM inline-flex justify-center cursor-pointer creatodisplayM  px-[25px]  py-[9px]  bg-[#D72638] rounded-full text-white text-[15px]  font-[500] hover:bg-[#D72638] transition"
          >
            Back to Home
          </button>
        </div>
      </div>




</section>













      

    </>
  )
}

ThankYou.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default ThankYou
