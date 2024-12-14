import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { InputPresets, InputVariant } from '../../../../constants/input-constants';
import CustomInput from '../../../../components/input/CustomInput';
import './profile-styles.scss'
import { Typography } from '@mui/material';

const Profile = () => {
    const {user} = useSelector((state:RootState) => state.user);
    console.log(user)

  return (
    <div className='profile__container'>
        <Typography className='profile__title'>Profile</Typography>
        <div className='profile__subcontainer'>
            <div className='profile__imageContainer'>
                <div className='profile__imageSubcontainer'>
                    <Typography className='profile__imgLabels'>Profile Image</Typography>
                    <img src={user && user?.avatar && user?.avatar.url} alt='avatar' className='profile__image'/>
                </div>
                <div className='profile__imageSubcontainer'>
                    <Typography className='profile__imgLabels'>Resume</Typography>
                    <img src={user && user?.resume && user?.resume.url} alt='resume' className='profile__image'/>
                </div>
            </div>
            <CustomInput
                value={user.fullName}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Full Name'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.email}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Email'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.phone}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Phone'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.aboutMe}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='About Me'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.portfolioURL ? user.portfolioURL : ''}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Portfolio URL'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.githubURL ? user.githubURL : 'Not Available'}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Github URL'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.facebookURL ? user.facebookURL : 'Not Available'}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Facebook URL'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.instagramURL ? user.instagramURL : 'Not Available'}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Instagram URL'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.twitterURL ? user.twitterURL : 'Not Available'}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='Twitter URL'
                inputLabelClass='profile__inputLabels'
                disabled
            />
            <CustomInput
                value={user.linkedInURL ? user.linkedInURL : 'Not Available'}
                handleChange={()=>{}}
                preset={InputPresets.Text}
                variant={InputVariant.Outlined}
                hasBorder
                label='LinkedIn URL'
                inputLabelClass='profile__inputLabels'
                disabled
            />
        </div>
    </div>
  )
}

export default Profile