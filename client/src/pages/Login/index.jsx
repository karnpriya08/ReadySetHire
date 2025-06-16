import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../assets/images/logo1.png';
import Bg from '../../assets/images/bg.avif';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';
import Loader from '../../component/Loader';
import GoogleLogin from '../../component/GoogleLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  // Local state 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // redux state
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validate form fields
  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}/.test(password)) {
      errors.password =
        'Password must be 6+ chars with uppercase, number & special char';
    }

    return errors;
  };
// handling submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
// if there are error 
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the highlighted errors');
      return;
    }
// trigger login
    dispatch(login(email, password));
  };
 // On login success: handle remember me + redirect
  useEffect(() => {
    if (userInfo) {
      if (checkbox) {
        // set item to local stoarge for remebering
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      toast.success('Login successful!');
      navigate('/');
    }
  }, [userInfo, navigate, checkbox, email]);

  // Load remembered email if present
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setCheckbox(true);
    }
  }, []);
// Show error toast on login failure
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${Bg})`, paddingTop: '80px' }}>

      {/* header logo */}
      <header className="m-6">
        <section className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <img src={Image} alt="logo" width={75} height={75} className="m-1 hover:scale-110" />
          <Link to="/">
            <div className="p-4 hover:scale-105 bg-black opacity-50 rounded">
              <h1 className="px-5 text-white">ReadySetHire</h1>
              <p className="text-xs text-white">Clear steps toward success</p>
            </div>
          </Link>
        </section>
      </header>

      <main className="bg-black opacity-70 p-8 w-[90%] sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto border shadow-md border-cyan-400 rounded-xl mb-15">
       {/* form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <h1 className="font-bold text-xl sm:text-2xl text-white text-center">Login</h1>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 bg-cyan-900 rounded-lg text-white w-full font-semibold text-lg focus:ring-2 focus:ring-cyan-400 transition"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 pr-10 bg-cyan-900 rounded-lg shadow-md text-white w-full font-semibold text-lg focus:ring-2 focus:ring-lime-400 transition"
            />
            {/* handling showing password */}
            <span onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-white text-2xl"
              title={showPassword ? "Hide Password" : "Show Password"} >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberme"
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
              className="accent-cyan-400"
            />
            <label className="text-sm text-cyan-500">Remember me</label>
          </div>

          {/* Submit / Loader */}
          {loading ? (
            <Loader />
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={submitHandler}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitHandler(e);
              }}
              className="bg-cyan-400 hover:bg-cyan-500 transition-colors w-full text-center rounded-xl shadow-2xl p-2 text-white font-bold cursor-pointer"
            >
              Login
            </div>
          )}
        </form>

        {/* Google Login */}
        <GoogleLogin />
      </main>
    </div>
  );
};

export default Login;
