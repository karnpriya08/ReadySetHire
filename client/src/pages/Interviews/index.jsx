import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInterviews } from '../../redux/actions/interviewActions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Images for upcoming and completed interviews
import upcomingImg from '../../assets/images/interviewBG.jpeg';
import completedImg from '../../assets/images/interviewBG2.jpeg';

const MyInterviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('upcoming');

  // Get interviews state and user info from Redux store
  const { loading, error, interviews } = useSelector(state => state.interviewList);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!userInfo) {
      toast.error("Please log in to view interviews.");
      navigate('/login');
      return;
    }

    // Fetch interviews based on current filter (upcoming or completed)
    dispatch(fetchUserInterviews(filter));
  }, [dispatch, filter, userInfo, navigate]);

  // Select image based on filter (upcoming or completed)
  const getImage = () => (filter === 'completed' ? completedImg : upcomingImg);

  return (
    <div className="p-6 mt-16">
      {/* Header: Title + Filter Dropdown */}
      <div className='bg-gradient-to-bl from-gray-100 via-gray-300 to-cyan-200 w-full px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-cyan-800 mb-4'>
        <h2 className="text-2xl font-bold">My Interviews</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded mt-2 sm:mt-0"
          aria-label="Filter interviews"
        >
          <option value="upcoming">Upcoming Interviews</option>
          <option value="completed">Completed Interviews</option>
        </select>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="text-center py-4 bg-gradient-to-tl from-gray-200 via-cyan-700 to-cyan-800 rounded">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500 mx-auto"></div>
          <p className="mt-2 text-white">Loading interviews...</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* No interviews found message */}
      {!loading && !error && interviews.length === 0 && (
        <p className="text-gray-500 text-center">No interviews found for the selected filter.</p>
      )}

      {/* Interview cards */}
      {!loading && !error && interviews.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="border rounded shadow-lg bg-white overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
              tabIndex={0}
              aria-label={`${interview.type} interview with ${interview.interviewer}${filter === 'upcoming' ? ` on ${new Date(interview.dateTime).toLocaleDateString()}` : ''}`}
            >
              {/* Static image based on filter */}
              <img src={getImage()} alt="Interview background" className="w-full h-40 object-cover" />

              <div className="p-4 text-gray-700">
                {/* Interview Type */}
                <h3 className="text-xl font-semibold mb-3">{interview.type} Interview</h3>

                {/* Interviewer info with icon (both filters) */}
                <div className="flex items-center gap-1 font-semibold text-gray-800 mb-3">
                  <span role="img" aria-label="Interviewer">👤</span>
                  <span>Interviewer:</span>
                  <span className="font-normal ml-1">{interview.interviewer}</span>
                </div>

                {/* Show date & time only for upcoming interviews */}
                {filter === 'upcoming' && (
                  <div className="flex items-center gap-4 font-semibold text-gray-800 mb-3">
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="Date">📅</span>
                      <span>{new Date(interview.dateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="Time">⏰</span>
                      <span>{new Date(interview.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                )}

                {/* Join button only for upcoming interviews */}
                {filter === 'upcoming' && (
                  <div className="text-center mb-3">
                    <a
                      href="https://zoom.us/join"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Join Zoom interview"
                    >
                      <button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-5 py-2 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-75 transition">
                        Join
                      </button>
                    </a>
                  </div>
                )}

                {/* Completed interview details without icons and date/time */}
                {filter === 'completed' && (
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-800">
                      Feedback: <span className="font-normal">{interview.feedback || 'No feedback'}</span>
                    </div>

                    {/* Score and Result on the same line without icons */}
                    <div className="flex gap-8 font-semibold text-gray-800">
                      <div>
                        Score: <span className="font-normal">{interview.score ?? 'N/A'}</span>
                      </div>
                      <div>
                        Result: <span className="font-normal">{interview.result || 'Pending'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInterviews;
