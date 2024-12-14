import { useAppDispatch } from '../../hooks/storeHooks';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllForgotPasswordErrors, resetPassword } from '../../store/slices/forgotResetPasswordSlice';
import { RootState } from '../../store/store';
import { getUser } from '../../store/slices/userSlice';
import { InputPresets, InputVariant } from '../../constants/input-constants';
import CustomInput from '../../components/input/CustomInput';
import CustomButton from '../../components/button/CustomButton';
import './resetPassword-styles.scss'
import { Typography } from '@mui/material';

const ResetPassword = () => {
  const {token} = useParams();
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const {error,message,loading} = useSelector((state:RootState)=>state.forgotPassword)
  const {isAuthenticated} = useSelector((state:RootState)=>state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleResetPassword=()=>{
    if(token)
      dispatch(resetPassword(token,password,confirmPassword));
  }

  useEffect(()=>{
    if(error)
    {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if(isAuthenticated)
    {
      navigate("/")
    }
    if(message!==null)
    {
      toast.success(message);
      dispatch(getUser())
    }

  },[dispatch,isAuthenticated,error,loading])

  return (
    <div className='resetPassword__container'>
      <Typography className='resetPassword__headerTitle'>Reset Password</Typography>
      <CustomInput
        value={password}
        placeholder='Enter password'
        preset={InputPresets.Text}
        handleChange={(e) => setPassword(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Password'
        inputLabelClass='resetPassword__inputLabels'
      />
      <CustomInput
        value={confirmPassword}
        placeholder='Enter confirm password'
        preset={InputPresets.Text}
        handleChange={(e) => setConfirmPassword(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Confirm Password'
        inputLabelClass='resetPassword__inputLabels'
      />
      <CustomButton onClick={handleResetPassword} title='Reset Password' />
  </div>
  )
}

export default ResetPassword