import { useAppDispatch } from '../../../../hooks/storeHooks';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllUserErrors, resetProfile, updatePassword } from '../../../../store/slices/userSlice';
import { RootState } from '../../../../store/store';
import CustomInput from '../../../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../../../constants/input-constants';
import CustomButton from '../../../../components/button/CustomButton';
import './updatePassword-styles.scss'

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { loading, isAuthenticated, error, message, isUpdated } = useSelector(
    (state:RootState) => state.user
  );
  const dispatch = useAppDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message]);

  return (
    <div className='updatePassword__container'>
      <h1 className="updatePassword__title">Forgot Password</h1>
      <CustomInput
        value={currentPassword}
        placeholder='Current Password'
        preset={InputPresets.Text}
        handleChange={(e) => setCurrentPassword(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Current Password'
        inputLabelClass='updatePassword__inputLabels'
      />
      <CustomInput
        value={newPassword}
        placeholder='New Password'
        preset={InputPresets.Text}
        handleChange={(e) => setNewPassword(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='New Password'
        inputLabelClass='updatePassword__inputLabels'
      />
      <CustomInput
        value={confirmNewPassword}
        placeholder='Confirm New Password'
        preset={InputPresets.Text}
        handleChange={(e) => setConfirmNewPassword(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Confirm New Password'
        inputLabelClass='updatePassword__inputLabels'
      />
      <CustomButton onClick={handleUpdatePassword} title='Update Password' />
    </div>
  )
}

export default UpdatePassword