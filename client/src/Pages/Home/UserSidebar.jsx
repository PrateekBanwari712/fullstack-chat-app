import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { getOtherUserThunk, logoutUserThunk } from '../../store/slice/user/user.thunk';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {

    const [searchValue, setSearchValue] = useState("")
    const [users, setUsers] = useState([])
    const otherUsers = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    

    const { userProfile } = useSelector(state => state.userReducer)
    
    const handleLogout = async () => {
        await dispatch(logoutUserThunk());
        
    };

    useEffect(() => {
        (async () => {
            await dispatch(getOtherUserThunk());
        })()
    }, [])

    useEffect(() => {
       
        if (!searchValue) {
             setUsers(otherUsers);
        } else {
             setUsers(otherUsers.filter((user) => {
                return (
                     user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase())
                );
            }))
        }
    }, [searchValue])

    return (
        <div className='max-w-[20rem] w-full h-screen flex flex-col justify-between border border-white/10 '>


            <h1 className='bg-black mx-3 px-2 py-1 text-[#605dff] text-xl font-semibold rounded-lg mt-3'>Gup Shup</h1>

            <div className='p-3'>
                <label className="input">
                    <IoMdSearch />
                    <input onChange={(e) => setSearchValue(e.target.value)} type="search" className="grow" placeholder="Search" />
                </label>
            </div>
            <div className='h-full overflow-y-auto px-3 flex flex-col gap-3 m-2'>
                {users.length > 0 && users?.map((userDetails) => {
                    return (
                        <User key={userDetails?._id} userDetails={userDetails} />
                    )
                })}


            </div>
            <div className=' flex items-center justify-between p-3 object-contain '>
                <div className='flex items-center gap-4'>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                            <img src={userProfile?.avatar} />
                        </div>

                    </div>
                    <h2 className='text-xl'>{userProfile?.fullName}</h2>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn btn-primary btn-sm px-4">logout</button>
            </div>
        </div>
    )
}

export default UserSidebar