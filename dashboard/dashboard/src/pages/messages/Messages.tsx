import { useEffect, useState } from 'react'
import './messages-styles.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessagesSlice } from '../../store/slices/messageSlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/storeHooks';
import { toast } from 'react-toastify';
import CustomButton from '../../components/button/CustomButton';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Messages = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const { messages, loading, error, message } = useSelector(
    (state:RootState) => state.messages
  );

  const [messageId, setMessageId] = useState("");
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className='messages__container'>
      <div className='messages__header'>
        <Typography className='messages__headerTitle'>Messages</Typography>
        <CustomButton handleClick={handleReturnToDashboard} title='Return To Dashboard' fullWidth={false}/>
      </div>
      <div className='messages__subcontainer'>
        {
          messages.length>0 ? (
            messages.map((message)=>(
              <div className='messages__cardContainer' key={message._id}>
                <div className='messages__cardSubcontainer'>
                  <Typography className='messages__title'>Sender Name: {message.senderName}</Typography>
                  <Typography className='messages__subtitle'>Description: {message.subject}</Typography>
                  <Typography className='messages__description'>Message: {message.message}</Typography>
                </div>
                <IconButton onClick={()=>handleMessageDelete(message._id)}>
                  <DeleteIcon className='messages__deleteIcon'/>
                </IconButton>
              </div>
            ))
          ) : (
            <Typography className='messages__emptyData'>No Messages Found!</Typography>
          )
        }
      </div>
    </div>
  )
}

export default Messages