import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadResume from '../../redux/actions/resumeActions';
import { MdFileUpload } from 'react-icons/md';
import toast from 'react-hot-toast';

const ResumeUpload = ({ onUpload }) => {
  const dispatch = useDispatch();

  // Local state for file input, error, and stored resume path
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState('');
  const [storedPath, setStoredPath] = useState(''); // Holds resumePath from localStorage if Redux is empty

  // Redux state
  const { loading, resumePath, error } = useSelector((state) => state.resume);

  // On component mount, load resumePath from localStorage if present
  useEffect(() => {
    const savedPath = localStorage.getItem('resumePath');
    if (savedPath) {
      setStoredPath(JSON.parse(savedPath)); // Parse and store in local state
    }
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Allowed MIME types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    // If no file selected (e.g., cancel)
    if (!selectedFile) return;

    // Validate file type
    if (!allowedTypes.includes(selectedFile.type)) {
      setLocalError('Only PDF, DOC, or DOCX files are allowed.');
      toast.error('Only PDF, DOC, or DOCX files are allowed.');
      setFile(null);
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Max allowed size is 5 MB.');
      return setFile(null);
    }

    // If valid, clear error and store file
    setLocalError('');
    setFile(selectedFile);
  };

  // Upload resume to server
  const handleUpload = async () => {
    if (!file) {
      setLocalError('Please select a file first.');
      toast.error('Please select a file first.');
      return;
    }

    try {
      // Dispatch upload action and get back the uploaded path
      const uploadedPath = await dispatch(uploadResume(file));

      // Send uploaded path to parent (e.g., to update profile)
      if (onUpload) onUpload(uploadedPath);

      // Save to local state so it persists on refresh
      setStoredPath(uploadedPath);
    } catch (error) {
      console.error('Resume Upload Error:', error);
      toast.error(error?.response?.data?.message || 'Failed to upload resume.');
    }
  };

  // Determine what path to show: redux one or fallback from localStorage
  const pathToDisplay = resumePath || storedPath;

  // Construct the full URL for viewing/downloading the resume
  const fullResumeURL = pathToDisplay ? `https://readysethire-roqk.onrender.com/${pathToDisplay}` : null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-cyan-700">Upload Your Resume</h3>
        <MdFileUpload className="text-2xl text-lime-500" />
      </div>

      {/* File Input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="border border-lime-500 p-2 w-2/3 rounded-2xl shadow-md text-sm text-cyan-600"
      />

      {/* Local validation error */}
      {localError && <p className="text-sm text-red-600 mt-2">{localError}</p>}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-4 px-4 py-2 rounded-xl font-semibold text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-500 hover:bg-lime-600'
        }`}
      >
        {loading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {/* Show view/download links if resume uploaded */}
      {pathToDisplay && (
        <div className="mt-3 space-y-2">
          <p className="text-green-600 text-sm break-words">
            Resume uploaded: <span className="font-mono">{pathToDisplay}</span>
          </p>

          <div className="space-x-4">
            {/* View button (opens in new tab) */}
            <a href={fullResumeURL} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
              <button className="text-white">View Resume</button>
            </a>

            {/* Download button */}
            <a href={fullResumeURL} download className="text-green-600 underline hover:text-green-800">
              <button className="text-white">Download Resume</button>
            </a>
          </div>
        </div>
      )}

      {/* Redux error if upload fails */}
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ResumeUpload;
