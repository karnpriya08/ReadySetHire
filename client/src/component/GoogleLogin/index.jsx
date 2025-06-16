import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../utils/axios";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../redux/actionTypes";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Loader from "../Loader";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Sign out from any existing Firebase session
      await signOut(auth);

      // Start new Google sign-in
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send token to backend
      const { data } = await API.post("/auth/google-login", { idToken });

      // Save token + user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      // update redux state
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: data.token, user: data.user },
      });

      toast.success(`Welcome, ${data.user.name || "User"}!`);
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='text-center'>
      <p className='text-white mb-2'>or</p>
      {loading ? (
        <Loader />
      ) : (
        <div
          onClick={handleGoogleLogin}
          className="flex justify-center gap-1 bg-cyan-400 hover:bg-cyan-500 transition-colors w-full text-center rounded-xl shadow-2xl p-2 text-white font-bold cursor-pointer"
        >
          <FcGoogle className='m-1 text-lg' /> Google
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;
