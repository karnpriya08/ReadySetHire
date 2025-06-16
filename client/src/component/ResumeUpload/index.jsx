import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadResume from '../../redux/actions/resumeActions';
import { MdFileUpload } from 'react-icons/md';
import toast from 'react-hot-toast'

const ResumeUpload = ({ onUpload }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState('');

  // accesing redux
  const { loading, resumePath, error } = useSelector((state) => state.resume);

  // handling when  user selects a file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    // not selected any file or cancel file 
    if (!selectedFile) return;

    // not file type then show error 
    if (!allowedTypes.includes(selectedFile.type)) {
      setLocalError('Only PDF, DOC, or DOCX files are allowed.');
      toast.error("'Only PDF, DOC, or DOCX files are allowed.'")
      setFile(null);
      return;
    }

    // Check file size (5 MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max allowed size is 5 MB.");
      return setFile(null);
    }

    // clean the error 
    setLocalError('');
    // set file 
    setFile(selectedFile);
  };

  // handle file upload button click
  const handleUpload = async () => {
    // if no file 
    if (!file) {
      setLocalError('Please select a file first.');
      toast.error('Please select a file first.')
      return;
    }
    // dispatch with selected file 
    try {
      const uploadedPath = await dispatch(uploadResume(file));
      if (onUpload) onUpload(uploadedPath);
      // handling error 
    } catch (error) {
      console.error('Resume Upload Error:', error);
      toast.error(error?.response?.data?.message || "Failed to upload resume.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
      {/* header section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-cyan-700">Upload Your Resume</h3>
        <MdFileUpload className="text-2xl text-lime-500" />
      </div>

      {/* File input */}
      <input type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="border border-lime-500 p-2 w-2/3 rounded-2xl shadow-md text-sm text-cyan-600"/>
      {localError && (
        <p className="text-sm text-red-600 mt-2">{localError}</p>
      )}

      {/* upload button */}
      <button onClick={handleUpload}
        disabled={loading}
        className={`mt-4 px-4 py-2 rounded-xl font-semibold text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-500 hover:bg-lime-600'
        }`} >
        {loading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {/* Show uploaded resume path if upload successful  */}
      {resumePath && (
        <div className="mt-3 space-y-2">
          <p className="text-green-600 text-sm break-words">
            Resume uploaded: <span className="font-mono">{resumePath}</span>
          </p>
          <div className="space-x-4">
            {/* View Resume */}

            <a href={`http://localhost:3001/${resumePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" underline hover:text-blue-800">
              <button className='text-white'>View Resume</button>
            </a>
            {/* Download Resume */}
            <a href={`http://localhost:3001/${resumePath}`}
              download
              className="text-green-600 underline hover:text-green-800" >
              <button className='text-white'> Download Resume</button>
            </a>
          </div>
        </div>
      )}

      {/* handle error through redux */}
      {error && (
        <p className="mt-2 text-red-500 text-sm"> {error}</p>
      )}
    </div>
  );
};

export default ResumeUpload;