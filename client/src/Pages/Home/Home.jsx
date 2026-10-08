import React, { useEffect } from 'react'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice.js'
import { setNewMessage } from '../../store/slice/message/message.slice.js'

const Home = () => {

  const { isAuthenticated, userProfile } = useSelector(state => state.userReducer);
  const {socket} = useSelector(state => state.socketReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(initializeSocket(userProfile?._id));
 
  }, [isAuthenticated])

  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      // console.log(onlineUsers)
            dispatch(setOnlineUsers(onlineUsers)); 
    });
    socket.on("newMessage", (newMessage) => {
      console.log(newMessage)
            dispatch(setNewMessage(newMessage)); 
    });
    return () => {
      socket.close();
    }
  }, [socket])


  return (
    <div className='flex '>
      <UserSidebar />
      <MessageContainer />
    </div>
  )
}

export default Home