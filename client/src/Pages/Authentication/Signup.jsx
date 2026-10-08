import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { registerUserThunk } from '../../store/slice/user/user.thunk';
import toast from 'react-hot-toast';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.userReducer);

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  })


  const handleInputChange = (e) => {
    e.preventDefault();

    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleSignup = async () => {
    if (signupData.password != signupData.confirmPassword) {
      return toast.error('passwords dont match')
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      navigate('/')
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated])


  return (
    <div className='flex justify-center items-center p-6 min-h-screen '>
      <div className='max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg '>

        <h2 className='text-2xl font-semibold'>Signup</h2>

        <label className="input w-full">
          <FaUser />
          <input type="text" name='fullName' onChange={handleInputChange} required placeholder="Fullname" />
        </label>

        <label className="input w-full">
          <FaUser />
          <input type="text" name='username' onChange={handleInputChange} required placeholder="Username" />
        </label>

        <label className="input w-full">
          <FaKey />
          <input type="password" onChange={handleInputChange} name='password' required placeholder="Password" />
        </label>

        <label className="input w-full">
          <FaKey />
          <input type="password" name='confirmPassword' onChange={handleInputChange} required placeholder="Confirm Password" />
        </label>

        <div className="input w-full flex gap-5 border-none outline-none">
          <label htmlFor='male' className='flex justify-center gap-2 border-none outline-none
        '>
            <input
              id='male'
              type="radio"
              name="gender"
              value={'male'}
              className="radio radio-primary"
              onChange={handleInputChange}
              defaultChecked />
            male
          </label>
          <label htmlFor='female' className='flex justify-center
        gap-2 border-none outline-none'>
            <input
              id='female'
              type="radio"
              name="gender"
              value={'female'}
              className="radio radio-primary"
              onChange={handleInputChange} />
            female
          </label>
        </div>

        <button
          onClick={handleSignup}
          className="btn btn-primary">
          Signup
        </button>

        <p>
          Already have an account? &nbsp; <Link to="/login" className='text-blue-400 underline'>Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup