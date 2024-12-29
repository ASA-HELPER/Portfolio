import { useAppDispatch } from '../../hooks/storeHooks';
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { clearAllUserErrors, login } from '../../store/slices/userSlice';
import { RootState } from '../../store/store';
import CustomInput from '../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../constants/input-constants';
import './login-styles.scss'
import CustomButton from '../../components/button/CustomButton';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {loading,isAuthenticated,error} = useSelector((state: RootState)=>state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = ()=>{
    dispatch(login(email,password));
    toast.success('User Logged in successfully');
  }

  useEffect(()=>{
    toast.error(error);
    dispatch(clearAllUserErrors());
    if(isAuthenticated){
      navigate("/");
    }
  },[dispatch,isAuthenticated,error,loading])

  return (
    <div className='login__container'>
      <h1 className="login__title">Login</h1>
      <CustomInput
        value={email}
        placeholder='Email'
        preset={InputPresets.Email}
        handleChange={(e) => setEmail(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
      />
      <CustomInput
        value={password}
        placeholder='Password'
        preset={InputPresets.Password}
        handleChange={(e) => setPassword(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
      />
      <CustomButton onClick={handleLogin} title='Login' />
      <Link
        to="/password/forgot"
        className="login__forgotPassword"
      >
        Forgot your password?
      </Link>
    </div>
  )
}

export default Login