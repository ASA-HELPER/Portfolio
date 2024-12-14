import { useAppDispatch } from '../../hooks/storeHooks';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllForgotPasswordErrors, forgotPassword } from '../../store/slices/forgotResetPasswordSlice';
import { RootState } from 'store/store';
import CustomInput from '../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../constants/input-constants';
import CustomButton from '../../components/button/CustomButton';
import './forgotPassword-styles.scss';

const ForgotPassword = () => {
  const [email,setEmail] = useState('');
  const {error,message,loading} = useSelector((state:RootState)=>state.forgotPassword)
  const {isAuthenticated} = useSelector((state:RootState)=>state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleForgotPassword=()=>{
    dispatch(forgotPassword(email));
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
    }

  },[dispatch,isAuthenticated,error,loading])

  return (
    <div className='forgotPassword__container'>
      <h1 className="forgotPassword__title">Forgot Password</h1>
      <CustomInput
        value={email}
        placeholder='Email'
        preset={InputPresets.Email}
        handleChange={(e) => setEmail(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
      />
      <CustomButton onClick={handleForgotPassword} title='Forgot Password' />
      <Link
        to="/login"
        className="forgotPassword__login"
      >
        Remember Your Password?
      </Link>
    </div>
  )
}

export default ForgotPassword