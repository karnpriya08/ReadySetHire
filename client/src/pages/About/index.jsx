import React from 'react';
import Banner from './component/Banner';
import Team from './component/Team'
import Image from '../../assets/images/int4.png'

const index = () => {
  return (
    <>
      <main className='mt-10 md:mt-20 w-full'>
        {/* header */}
        <header className='bg bg-gradient-to-bl from-gray-100 via-cyan-700 to-cyan-800 p-5'>
          <h1 className='text-4xl font-bold text-lime-400 text-center'>About Us </h1>
        </header>
        {/* banner */}
        <section className='mt-5 px-8 rounded-xl shadow-2xl'>
          <Banner />
        </section>
        {/* about company  */}
        <section className='p-3 my-5'>
          <h1 className='text-center text-4xl font-bold text-lime-400'>ReadySetHire</h1>
          <p className='text-center text-lime-200 '>clear steps toward success</p>
          {/* image with detail */}
          <div className='rounded-xl shadow-2xl flex lg:flex-row flex-col justify-between gap-10 p-4'>
            <img src={Image} alt="image" width={700} className='w-full max-w-[700px]  rounded-xl shadow-2xl object-cover' />
            <div className=' m-3 text-justify'>
              <h1 className='text-xl md:text-2xl font-semibold text-lime-400 mb-4 animate-bounce'>Why ReadySetHire?</h1>
              <p className=''>Interviews are gateways — and we're here to make sure you're ready when
                opportunity knocks. ReadySetHire is designed with students in mind: simple scheduling, a clean interface, and real-time tracking of your mock interviews. Whether you're gearing up for your first interview or refining your technique, ReadySetHire is your training ground. Stay organized with upcoming sessions, reflect on completed ones,
                and get closer to the job you deserve — one mock interview at a time.</p>
            </div>
          </div>
        </section>
        {/* our Team */}
        <section className='m-2 p-6 md:p-20 rounded-2xl '>
          <Team />
        </section>
      </main>
    </>
  )
}

export default index