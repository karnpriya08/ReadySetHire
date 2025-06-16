import React, { useEffect, useState } from 'react';
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../assets/images/avtar.png';
import { getUserProfile, updateProfile, uploadProfileImage } from '../../redux/actions/userActions';
import { USER_PROFILE_SUCCESS } from '../../redux/actionTypes';
import toast from 'react-hot-toast';
import ResumeUpload from '../../component/ResumeUpload';

const index = () => {
  const dispatch = useDispatch();

  const [enableForm, setEnableForm] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    contact: '',
    dob: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [enableImageEdit, setEnableImageEdit] = useState(false);

  // redux state
  const user = useSelector((state) => state?.user?.user);
  const authState = useSelector((state) => state?.auth || {});
  const email =  authState?.userInfo?.email || JSON.parse(localStorage.getItem('userInfo'))?.email ||'';
  
  // when redux is empty get data from local storage 
  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        dispatch({ type: USER_PROFILE_SUCCESS, payload: parsed })
      } else {
        dispatch(getUserProfile());
      }
    }
  }, [dispatch, user])
  
  // when user data is available
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormValues({
        name: user.name || '',
        contact: user.contact || '',
        dob: user.dob ? user.dob.split('T')[0] : ''
      });
      setPreview(user.profileImage ? `https://readysethire-roqk.onrender.com${user.profileImage}` : Avatar);
    }
  }, [user]);

  // handle form value changes 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // toggle edit for form 
  const handleEdit = () => {
    setEnableForm((prev) => !prev);
  };

  // handle image toggle 
  const handleImageEdit = (e) => {
    setEnableImageEdit((prev) => !prev)
  };

  // handling image section
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  // handling image saving 
  const handleSaveImage = async () => {
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }

    try {
      // Pass authState manually (NOT with useSelector again)
      const imagePath = await dispatch(uploadProfileImage(image));
      await dispatch(updateProfile({ ...user, profileImage: imagePath }));
      toast.success("Image updated successfully!");
      setEnableImageEdit(false);
    } catch (error) {
      console.error('Image Upload Error:', error);
      toast.error("Failed to upload image.");
    }
  };

  // handle resume upload 
  const handleResumeUpload = async (resumePath) => {
    try {
      dispatch(updateProfile({ ...user, resume: resumePath }));
      toast.success("Resume updated in profile!");
    } catch (error) {
      console.log("Resume profile update error :", error);
      toast.error("Failed to update resume in profile.")
    }
  }

  // handling form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle image upload separately if enabled
      if (enableImageEdit && image) {
        const imagePath = await dispatch(uploadProfileImage(image));
        await dispatch(updateProfile({ ...user, profileImage: imagePath }));
        toast.success('Image updated successfully!');
        setEnableImageEdit(false);
      }

      // Handle form update
      if (enableForm) {
        await dispatch(updateProfile(formValues));
        toast.success('Profile details updated successfully!');
        setEnableForm(false);
      }
      localStorage.setItem('userProfile', JSON.stringify(user));
    } catch (error) {
      toast.error('Update failed');
    }
  };
  // image (for shorting )
  const imageSrc = preview || Avatar;

  return (
    <>
      <div className='mt-20'>
        {/* title */}
        <header className='bg-gradient-to-bl from-gray-200 via-cyan-700 to-cyan-800 p-5'>
          <h1 className='text-4xl font-bold text-lime-400 text-center'>My Profile</h1>
        </header>

        {/* Image Section */}
        <section className='relative rounded-2xl shadow-md m-4 p-8 flex flex-col items-center'>
          <img src={imageSrc} alt="Profile"
            className='w-24 h-24 rounded-full object-cover mx-auto' />

          {/* Toggle button for Image Upload */}
          <section onClick={handleImageEdit}
            className='absolute top-4 right-4 flex items-center gap-1 p-2 rounded-2xl shadow-md bg-white cursor-pointer hover:bg-lime-100' >
            <span className='font-semibold text-lime-700'>
              {enableImageEdit ? 'Cancel Image Change' : 'Change Image'}</span>
            <TiEdit className='text-xl text-lime-700' />
          </section>

          {/* input for selecting image */}
          {enableImageEdit && (
            <>
              <input type="file" accept="image/*" onChange={handleImageChange}
                className='mt-3 border border-lime-500 p-2 w-1/4 rounded-2xl shadow-md' />
              <button onClick={handleSaveImage} className=' font-semibold px-4 py-2 mt-2 rounded-xl'> Save Image</button>
            </>
          )}
        </section>

        <main className='relative rounded-2xl shadow-md m-4 p-8'>
          {/* edit button */}
          <section
            onClick={handleEdit}
            className='absolute top-4 right-4 flex items-center gap-1 p-2 rounded-2xl shadow-md bg-white cursor-pointer hover:bg-lime-100'>
            <span className='font-semibold text-lime-700'>{enableForm ? 'Cancel' : 'Edit'}</span>
            <TiEdit className='text-xl text-lime-700' />
          </section>

          {/* form section */}
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 justify-center m-5'>
            {/* Name */}
            <label htmlFor="name" className='text-start'>Full Name *</label>
            <input type="text" name='name' value={formValues.name}
              onChange={handleChange}
              disabled={!enableForm}
              className='border border-lime-500 p-2 w-2/3 rounded-2xl shadow-md' />

            {/* Email (read-only) */}
            <label htmlFor="email" className='text-start'>Email *</label>
            <input type="text" name='email' value={email}
              disabled
              className='border border-lime-500 p-2 w-2/3 rounded-2xl shadow-md' />

            {/* Contact */}
            <label htmlFor="contact" className='text-start'>Contact</label>
            <input type="tel" name='contact'
              value={formValues.contact}
              onChange={handleChange}
              disabled={!enableForm}
              className='border border-lime-500 p-2 w-2/3 rounded-2xl shadow-md' />

            {/* DOB */}
            <label htmlFor="dob" className='text-start'>DOB</label>
            <input type="date" name='dob' value={formValues.dob}
              onChange={handleChange}
              disabled={!enableForm}
              className='border border-lime-500 p-2 w-2/3 rounded-2xl shadow-md' />

            {/*  Submit Button */}
            {(enableForm || enableImageEdit) && (
              <button type="submit"
                className='bg-lime-500 text-white font-semibold w-1/3 p-2 mt-4 rounded-xl'>Save Changes </button>
            )}
          </form>

          {/* resume upload  */}
          <div className="flex justify-center mt-10">
            <ResumeUpload onUpload={handleResumeUpload} />
          </div>
        </main>
      </div>
    </>
  );
};

export default index;