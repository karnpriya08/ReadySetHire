import {
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, LOGIN_SUCCESS
} from '../actionTypes';
import API from '../../utils/axios'

// GET USER PROFILE
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    // get current user token from redux
    const {
      auth: { userInfo },
    } = getState();
    // include token in header for authentication 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // GET rquest for user profile
    const { data } = await API.get('/users/profile', config);
    // console.log('Fetched profile from server:', data);
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: { ...data, email: userInfo.email }
    })
    // saving in local storage
    localStorage.setItem('userProfile', JSON.stringify({ ...data, email: userInfo.email }));
  }
  // handling error dispatch
  catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

// UPDATE USER PROFILE
export const updateProfile = (userData, image) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    // getting user token from redux
    const { auth: { userInfo } } = getState();
    // image path
    let imagePath = userData.profileImage || '';
    // checking is file and type
    if (image && typeof image === 'object') {
      // prepare the file data to send as formdata
      const formData = new FormData();
      formData.append('image', image);
      // including token to header 
      const imageUploadConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`
        }
      }
      // POST request for updating image and user together
      const { data } = await API.post('/users/upload-image', formData, imageUploadConfig);
      imagePath = data.imagePath;
    }

    // merging uploaded image path with user data 
    const updatedUSerData = { ...userData, profileImage: imagePath };

    // including token to header 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    // PUT request for update user profile
    const { data } = await API.put('/users/profile', updatedUSerData, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    })
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { ...userInfo, ...data },
      token: userInfo.token
    });
    // saving in local storage 
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
    localStorage.setItem('userProfile', JSON.stringify({ ...data, email: userInfo.email }));
  }
  // handling error dispatch
  catch (error) {
    console.log(`error : ${error}`);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message
    })

  }
}

// SEPEARTE IMAGE UPLOAD 
export const uploadProfileImage = (image) => async (dispatch, getState) => {
  try {
    // getiing token from redux
    const {
      auth: { userInfo, token },
    } = getState();

    // checking user
    const authToken = userInfo?.token || token;
    if (!authToken) throw new Error("Unauthorized User");

    // sending data as formdata
    const formData = new FormData();
    formData.append('image', image);

    // including token in header 
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    };
    // POST request for uploading image 
    const { data } = await API.post('/users/upload-image', formData, config);
    return data.imagePath;
    // handling error dispatch
  } catch (error) {
    console.error('Image Upload failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
  }
};