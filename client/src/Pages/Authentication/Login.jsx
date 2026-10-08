import React, { use, useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { Link, NavigationType, useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux"
import { loginUserThunk } from '../../store/slice/user/user.thunk';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.userReducer);

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const handleLogin = async () => {
    // console.log("login");
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate('/')
    }
  }

  useEffect( ()=> {
    if(isAuthenticated) navigate("/")
  }, [isAuthenticated])

  return (
    <div className='flex justify-center items-center p-6 min-h-screen '>
      <div className='max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg '>

        <h2 className='text-2xl font-semibold'>Login</h2>

        <label className="input w-full">
          <FaUser />
          <input type="text" name="username" required placeholder="Username" onChange={handleInputChange} />
        </label>
        <label className="input w-full">
          <FaKey />
          <input type="password" name="password" required placeholder="Password" onChange={handleInputChange} />
        </label>
        <button onClick={handleLogin} className="btn btn-primary">Login</button>
        <p>
          Don't have an account? &nbsp; <Link to="/signup" className='text-blue-400 underline'>Signup</Link>
        </p>
      </div>
    </div>
  )

}

export default Login