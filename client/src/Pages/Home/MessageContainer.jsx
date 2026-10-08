import React, { useEffect } from 'react'
import User from './User'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/message.thunk';
import SendMessage from './SendMessage';

const MessageContainer = () => {
    const dispatch = useDispatch();

    const { selectedUser } = useSelector(state => state.userReducer);
    const { messages } = useSelector(state => state.messageReducer);
    // console.log(messages)

    useEffect(() => {
        dispatch(getMessageThunk({ recieverId: selectedUser?._id }))
    }, [selectedUser]);

    return (
        <>
            {!selectedUser ? (
                <div className='w-full h-screen flex flex-col justify-center items-center gap-4  '>
                    <h2 className='text-3xl'>Welcome to Gup Shup</h2>
                    <p>select a user to continue</p>
                </div>
            ) : (
                <div className='w-full h-screen flex flex-col justify-between'>

                    <div className=' p-3 border-b border-b-white/10'>
                        <User userDetails={selectedUser} />
                    </div >

                    <div className='h-full overflow-y-auto p-3'>
                        {
                            messages?.map(messageDetails => {
                                return (
                                    <Message key={messageDetails._id} messageDetails={messageDetails} />
                                )
                            })
                        }

                    </div>

                    <SendMessage />

                </div >)}
        </>

    )
}

export default MessageContainer