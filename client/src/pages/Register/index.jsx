import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../assets/images/logo1.png';
import Bg from '../../assets/images/bg.avif';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';
import Loader from '../../component/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  // local state
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    conPassword: '',
    agreeToTerms: false,
  });
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux state
  const { loading, error, success } = useSelector((state) => state.auth);

  // Handle auth state changes 
  useEffect(() => {
    if (success) {
      toast.success('Registration successful! Redirecting...');
      navigate('/login');
    } else if (error) {
      toast.error(error);
    }
  }, [success, error, navigate]);

  // handle changes 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  // handle checkbox toggle
  const handleCheckbox = (e) => {
    setFormValue({ ...formValue, agreeToTerms: e.target.checked });
  };

  // form validation
  const validate = () => {
    const errors = {};
    if (!formValue.firstName.trim()) errors.firstName = 'First name is required';
    if (!formValue.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formValue.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValue.email)) {
      errors.email = 'Email format is invalid';
    }
    if (!formValue.password) {
      errors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}/.test(formValue.password)) {
      errors.password = 'Weak password (min 6 chars, uppercase, number, symbol)';
    }
    if (formValue.password !== formValue.conPassword) errors.conPassword = 'Passwords do not match';
    if (!formValue.agreeToTerms) errors.agreeToTerms = 'Please agree to the terms';
    return errors;
  };

  // handling submission
  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormError(errors);
    // If valid, dispatch register action
    if (Object.keys(errors).length === 0) {
      dispatch(register(formValue.firstName, formValue.email, formValue.password));
    } else {
      toast.error('Please fix the errors before submitting');
    }
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex flex-col" style={{ backgroundImage: `url(${Bg})`, paddingTop: '80px' }}>
      {/* header section with logo  */}
      <header className='m-6'>
        <section className='flex flex-col md:flex-row items-center justify-center'>
          <img src={Image} alt="logo" width={75} height={75} className='m-1 hover:scale-110' />
          <Link to='/'>
            <div className='p-4 hover:scale-105 bg-black opacity-50 rounded'>
              <h1 className='px-5 text-white'>ReadySetHire</h1>
              <p className='text-xs text-white'>Clear steps toward success</p>
            </div>
          </Link>
        </section>
      </header>

      <main className='bg-black opacity-70 p-6 sm:p-8 w-[90%] sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto border shadow-md border-cyan-400 rounded-xl mb-15'>
        {/* form container */}
        <form onSubmit={submitHandler} className='flex flex-col gap-6'>
          <h1 className='font-bold text-2xl text-white text-center'>Register</h1>

          {/* First Name */}
          <input type="text" name="firstName" placeholder="First Name"
            value={formValue.firstName} onChange={handleChange}
            className="p-2 bg-cyan-900 rounded-lg text-white font-semibold text-lg" />
          {formError.firstName && <p className="text-red-500 text-sm">{formError.firstName}</p>}

          {/* Last Name */}
          <input type="text" name="lastName" placeholder="Last Name"
            value={formValue.lastName} onChange={handleChange}
            className="p-2 bg-cyan-900 rounded-lg text-white font-semibold text-lg" />
          {formError.lastName && <p className="text-red-500 text-sm">{formError.lastName}</p>}

          {/* Email */}
          <input type="email" name="email" placeholder="Email"
            value={formValue.email} onChange={handleChange}
            className="p-2 bg-cyan-900 rounded-lg text-white font-semibold text-lg" />
          {formError.email && <p className="text-red-500 text-sm">{formError.email}</p>}

          {/* Password */}
          <div className="relative bg-cyan-900 rounded-lg text-white font-semibold text-lg">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password"
              value={formValue.password} onChange={handleChange}
              className="p-2 pr-10" />
            {/* show/hide toggle */}
            <span onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-white text-2xl"
              title={showPassword ? "Hide Password" : "Show Password"}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {formError.password && <p className="text-red-500 text-sm">{formError.password}</p>}

          {/* Confirm Password */}
          <div className="relative  bg-cyan-900 rounded-lg text-white font-semibold text-lg">
            <input type={showConPassword ? "text" : "password"} name="conPassword" placeholder="Confirm Password"
              value={formValue.conPassword} onChange={handleChange}
              className="p-2 pr-10" />
            {/* Show and Hide toggle  */}
            <span onClick={() => setShowConPassword(!showConPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-white text-2xl "
              title={showConPassword ? "Hide Password" : "Show Password"}>
              {showConPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {formError.conPassword && <p className="text-red-500 text-sm">{formError.conPassword}</p>}

          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <input type="checkbox" name="agreeToTerms"
              checked={formValue.agreeToTerms} onChange={handleCheckbox}
              className="accent-cyan-400" />
            <label className="text-sm text-cyan-500">I agree to the terms and conditions.</label>
          </div>
          {formError.agreeToTerms && <p className="text-red-500 text-sm">{formError.agreeToTerms}</p>}

          {/* Submit Button or Loader */}
          {loading ? (
            <Loader />
          ) : (
            // Submit Button
            <div role="button" tabIndex={0}
              className="bg-cyan-400 hover:bg-cyan-500 transition-colors w-full text-center rounded-xl shadow-2xl p-2 text-white font-bold cursor-pointer"
              onClick={submitHandler}
              onKeyDown={(e) => e.key === 'Enter' && submitHandler(e)}>
              Register</div>
          )}
        </form>
      </main>
    </div>
  );
};

export default Register;