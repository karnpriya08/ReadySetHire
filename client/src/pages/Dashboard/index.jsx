import React, { useEffect, useState } from 'react';
import Banner from './component/Banner';
import Image from '../../assets/images/db.png';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { scheduleInterview } from '../../redux/actions/interviewActions';
import toast from 'react-hot-toast';
import ResumeUpload from '../../component/ResumeUpload';
// import { updateProfile } from '../../redux/actions/userActions';
import { updateProfile, getUserProfile } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/Loader';

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // local state
  const [interviewType, setInterviewType] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const [interviewer, setInterviewer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // redux state
  const { loading, success, error, interview } = useSelector((state) => state.interview);
  const { userInfo } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.user);

  // dummy list of interviewers 
  const [interviewers, setInterviewers] = useState([]);
  useEffect(() => {
    setInterviewers(
      [
        { _id: '1', name: 'Urvashi Singhla' },
        { _id: '2', name: 'Mayank Ghosh' },
        { _id: '3', name: 'Adarsh Sharma' },
      ]
    )
  }, [])

  // fetch user profile if not loaded
  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  // if schedule interview sucess
  useEffect(() => {
    if (success && interview) {
      setShowSuccess(true);
      toast.success(`Interview scheduled on ${new Date(interview.dateTime).toLocaleString()}`);
      setInterviewType('');
      setDateTime(null);
      setInterviewer('');
    }

    if (error) {
      toast.error(error || 'Something went wrong');
    }
  }, [success, error, interview]);

  const handleResumeUpload = async (resumePath) => {
    try {
      if (!user) {
        toast.error("User profile not loaded yet.");
        return;
      }
      dispatch(updateProfile({ ...user, resume: resumePath }));
      toast.success("Resume updated in profile!");
    } catch (error) {
      console.log("Resume file update error: ", error);
      toast.error("Failed to update resume in profile.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error('Please login to schedule an interview.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    if (!interviewType || !dateTime || !interviewer) {
      toast.error(`Please fill all fields`);
      return;
    }
    // Validate dateTime - Check if it's in the past
    const currentDate = new Date();
    const selectedDate = new Date(dateTime);
    if (selectedDate < currentDate) {
      toast.error('Interview date and time cannot be in the past.');
      return;
    }
    const interviewData = {
      type: interviewType,
      dateTime: new Date(dateTime).toISOString(),
      interviewer,
    }

    //  handle resume upload 
    dispatch(scheduleInterview(interviewData))
  }

  return (
    <>
      <main className='mt-20 w-full'>

        {/* banner */}
        <section className='px-6 md:px-8 rounded-xl shadow-2xl bg-gradient-to-b from-gray-200 via-cyan-700 to-cyan-800'>
          <Banner />
        </section>
        {/* Interview Schedule Section */}
        <section className='bg bg-gradient-to-bl from-gray-100 via-cyan-7000 to-cyan-800 p-6 pb-20 '>
          <h1 className='text-3xl sm:text-4xl font-bold text-lime-400 text-center'> Schedule Your Interview </h1>

          {showSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded mb-6 shadow-lg transition">
              Your interview has been successfully scheduled!
            </div>
          )}


          <div className='flex flex-col md:flex-row  gap-1 justify-evenly mt-8'>

            {/* interviewtype */}
            <div className='flex items-center gap-2'>
              <span className="text-5xl">🎯</span>
              <select name="" id=""
                onChange={(e) => setInterviewType(e.target.value)}
                required
                value={interviewType}
                className='bg-white p-3  px-5 md:px-2 text-cyan-600 rounded-xl shadow-md' >
                <option value="" className=''>Interview Type</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Full-stack">Full-stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </div>


            {/* datetime */}
            <div className="flex items-center gap-2">
              <span className="text-4xl">📅</span>
              <DatePicker
                selected={dateTime}
                onChange={(date) => setDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date & time"
                className="bg-white p-3 px-5 text-cyan-600 rounded-xl  shadow-md"
                required
              />
            </div>

            {/* interviewer */}
            <div className="flex items-center gap-2">
              <span className="text-4xl">👩‍💻</span>
              <select name="interviewer" id="interviewer"
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                required
                className='bg-white p-3 px-5 text-cyan-600 rounded-xl  shadow-md'>
                <option value="" >Interviewer</option>
                {interviewers.map((iw) => (
                  <option key={iw._id} value={iw.name} >{iw.name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* button */}
          <div className="flex justify-center mt-10">
            <button className="bg-lime-400 px-6 py-2 rounded-md hover:bg-lime-500 text-white font-semibold"
              onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader /> : 'Submit'}
            </button>
          </div>

          {/* resume upload section  */}
          <div className='flex justify-center mt-6'>
            <ResumeUpload onUpload={handleResumeUpload} />
          </div>
        </section>

        {/* intro */}
        <section className="p-6 sm:p-8 bg-white rounded-xl shadow-2xl   ">
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-lime-600 mb-2">Welcome to ReadySetHire</h1>
          <p className="text-center text-cyan-800 text-lg mb-8">Clear Steps Toward Success</p>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <img
              src={Image}
              alt="ReadySetHire Overview"
              className="w-full lg:w-1/2 rounded-xl shadow-md"
            />
            <div className="text-gray-700 text-md leading-relaxed lg:w-1/2">
              <p className="mb-4">
                Nervous about interviews? You're not alone. With ReadySetHire, students can finally
                get structured practice that fits their schedule. Book a mock interview in seconds,
                get feedback, and track your journey to confidence.
              </p>
              <p>
                No stress, no surprises—just smarter preparation. Whether you're preparing for internships,
                job placements, or career fairs, our app empowers you to build confidence, schedule with ease,
                and step into interviews ready to succeed.
              </p>
            </div>
          </div>
        </section>
{/* Fan Section / FAQ Accordion */}
<section className=" mt-10 mx-4 sm:mx-8 p-6 sm:p-10 rounded-xl shadow-2xl">
  <h2 className="text-center text-3xl font-bold text-lime-400 mb-6">Why Students Love ReadySetHire ❤️</h2>

  <div className="space-y-4 text-cyan-900 text-md sm:text-lg">

    {/* Question 1 */}
    <details className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <summary className="cursor-pointer font-semibold text-lg flex items-center gap-2">
        🎯 What is ReadySetHire?
      </summary>
      <p className="mt-2 text-gray-700">
        ReadySetHire is your personal platform to schedule mock interviews, receive expert feedback, and build
        the confidence you need for real interviews.
      </p>
    </details>

    {/* Question 2 */}
    <details className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <summary className="cursor-pointer font-semibold text-lg flex items-center gap-2">
        💸 Is this free for students?
      </summary>
      <p className="mt-2 text-gray-700">
        Yes! Every student can schedule mock interviews, upload resumes, and receive feedback—all completely free.
      </p>
    </details>

    {/* Question 3 */}
    <details className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <summary className="cursor-pointer font-semibold text-lg flex items-center gap-2">
        👩‍💻 How do I prepare for my interview?
      </summary>
      <p className="mt-2 text-gray-700">
        Simply choose your interview type, pick a time, select an interviewer, and upload your resume. ReadySetHire takes care of the rest.
      </p>
    </details>

  </div>
</section>

      </main>
    </>
  )
}

export default index
