import React from 'react';

const TermsAndConditions = () => {
  return (
    <main className='mt-10 md:mt-20 w-full'>
      {/* Header */}
      <header className='bg-gradient-to-bl from-gray-100 via-cyan-700 to-cyan-800 p-5 rounded-lg shadow-xl'>
        <h1 className='text-4xl font-bold text-lime-400 text-center'>Terms & Conditions</h1>
        <p className='text-center text-lime-200 text-sm mt-1'>Last updated: June 17, 2025</p>
      </header>

      {/* Content */}
      <section className='mt-10 px-6 md:px-12 py-6 max-w-5xl mx-auto  bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl text-white'>
        <div className='space-y-8'>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>1. Introduction</h2>
            <p>
              Welcome to ReadySetHire! These Terms and Conditions outline the rules and regulations for using our app. By accessing or using our services, you accept these terms.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>2. Services Provided</h2>
            <p>
              ReadySetHire offers mock interview scheduling, curated interview questions, and blogs to help users prepare effectively. The services are intended for personal, educational, and non-commercial use only.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>3. User Responsibilities</h2>
            <p>
              Users agree to provide accurate information, treat interviewers respectfully, and avoid misuse of the platform. Any violation may result in suspension of access.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>4. Content Usage</h2>
            <p>
              All platform content — including blogs, interview questions, and tools — is owned by ReadySetHire or its contributors. Redistribution without permission is prohibited.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>5. Scheduling and Cancellations</h2>
            <p>
              Interviews should be scheduled responsibly. Cancel at least 24 hours in advance to avoid potential restrictions. Frequent cancellations may result in limited access.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>6. Privacy</h2>
            <p>
              We are committed to your privacy. Refer to our Privacy Policy for details on how your data is collected, used, and stored.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>7. Changes to Terms</h2>
            <p>
              We may update these terms periodically. Continued use after changes indicates acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-lime-400'>8. Contact Us</h2>
            <p>
              Questions or concerns? Reach out at <a href='mailto:support@readysethire.com' className='underline text-lime-300'>support@readysethire.com</a>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default TermsAndConditions;
