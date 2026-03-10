import React from 'react'
import Header_footer from '../components/header&footer';
import Services from '../components/services/services'


const About = () => {

        const navigation=useNavigate()
  const [formdata,setformdata]=useState()
  const [team,setteam]=useState([
            { name: "Alex Carter", role: "Founder" },
            { name: "Sarah Blake", role: "Head of Product" },
            { name: "Daniel Lee", role: "Marketing Lead" },
            { name: "Emma Stone", role: "Customer Support" },
          ])
  return (
    <>
      <Header_footer>
{/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center text-center mb-5">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1664478068789-51a77f562f6f?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        ></div>

        <div className="relative z-10 px-4">
          <p className="text-[35px] text-white md:text-6xl font-bold mb-4">
            Empowering Your Fitness Journey
          </p>
          <p className="text-sm md:text-md text-gray-400 max-w-xl mx-auto">
            Premium gym gear, apparel, and supplements designed to push your
            limits and fuel your progress.
          </p>

          <button className="mt-6 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-3 transition " onClick={()=> navigation('/all/products')}>
            Shop Now
          </button>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-2 md:px-4 py-5 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-3xl font-bold mb-4 text-green-500">Our Story</p>
          <p className="text-gray-300 mb-4">
            Our journey began with a simple mission: help people achieve their
            fitness goals with high-quality equipment and reliable products.
            As athletes ourselves, we understood the struggle of finding gear
            that truly performs.
          </p>

          <p className="text-gray-300">
            Today we provide premium gym equipment, apparel, and supplements
            trusted by thousands of athletes and fitness enthusiasts around the
            world.
          </p>
        </div>

        <div className="w-full h-80 bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
         <img src="https://plus.unsplash.com/premium_photo-1664478068789-51a77f562f6f?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='opacity-24' />
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-5 px-2 max-w-7xl mx-auto">
        <p className="text-4xl font-bold text-center mb-12 text-green-500 mb-5">
          Meet the Team
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 py-2 rounded-xl text-center hover:scale-102 transition">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full">
              <img src={member.img} alt="" />
              </div>
              <p className="font-semibold text-[25px] text-lime-300">{member.name}</p>
              <p className="text-gray-400 text-sm">{member.role}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA / NEWSLETTER */}
      <section className="bg-gray-800 py-20 text-center py-5 mt-4">
        <p className="text-3xl font-bold mb-4 text-yellow-500">
          Join Our Fitness Community
        </p>

        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          Subscribe to get exclusive deals, workout tips, and the latest gym
          gear updates.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={formdata}
            onChange={(e)=> setformdata(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white flex-1"
          />

          <button className="px-6 py-3 px-2 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-3" onClick={()=> setformdata('')}>
            Subscribe
          </button>
        </div>
      </section>
      </Header_footer>
    </>
  )
}


export default About
