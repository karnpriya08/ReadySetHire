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
        <section className='mt-1 px-8 rounded-xl shadow-2xl bg-gradient-to-b from-gray-200 via-cyan-700 to-cyan-800'>
          <Banner />
        </section>
        {/* Interview Schedule Section */}
        <section className='bg bg-gradient-to-bl from-gray-100 via-cyan-7000 to-cyan-800 p-6 pb-20 mt-4'>
          <h1 className='text-4xl font-bold text-lime-400 text-center'> Schedule Interview </h1>
          <div className='flex flex-col md:flex-row  gap-1 justify-evenly mt-8'>

            {/* interviewtype */}
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

            {/* datetime */}
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

            {/* interviewer */}
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

          {/* button */}
          <div className="flex justify-center mt-10">
            <button className="bg-lime-400 px-6 py-2 rounded-md hover:bg-lime-500 text-white font-semibold"
              onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader /> : 'Submit'}
            </button>
          </div>

{/* resume upload section  */}
          <div className='flex justify-center mt-6'>
            <ResumeUpload onUpload={handleResumeUpload}/>
          </div>
        </section>

        {/* intro */}
        <section className='p-3 my-5 sm:p-1'>
          <h1 className='text-center text-4xl font-bold text-lime-400'>ReadySetHire</h1>
          <p className='text-center text-lime-200 '>clear steps toward success</p>
          {/* iamge with detail */}
          <div className='rounded-xl shadow-2xl flex lg:flex-row flex-col justify-between gap-10  p-4'>
            <img src={Image} alt="image" className='h-[400px] w-full sm:w-1/2  rounded-xl shadow-2xl' />
            <div className=' m-3 w-full sm:w-2/3'>
              <h1 className='font-semibold text-lime-400'>Welcome to ReadySetHire</h1>
              <p className=' mt-5'>Nervous about interviews? You're not alone. With ReadySetHire, students can finally
                get structured practice that fits their schedule. Book a mock interview in seconds, get
                feedback, and track your journey to confidence. No stress, no surprises - just smarter preparation.
                Download the app and get Ready, Set... Hired!</p>
              <p className='mt-5'> your personal launchpad to interview success. Whether you're preparing for internships, job placements, or career fairs, our app empowers you to book mock interviews, track your progress, and build the confidence you need to shine when it matters most. Schedule with ease,
                practice with purpose, and step into the real world, ready.</p>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default index
