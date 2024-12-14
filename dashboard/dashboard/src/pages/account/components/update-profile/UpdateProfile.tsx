import { useAppDispatch } from '../../../../hooks/storeHooks';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '../../../../store/slices/userSlice';
import { toast } from 'react-toastify';
import CustomInput from '../../../../components/input/CustomInput';
import { Typography } from '@mui/material';
import { InputPresets, InputVariant } from '../../../../constants/input-constants';
import './updateProfile-styles.scss'
import CustomButton from '../../../../components/button/CustomButton';

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state:RootState) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useAppDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className='updateProfile__container'>
        <Typography className='updateProfile__title'>Profile</Typography>
        <div className='updateProfile__subcontainer'>
            <div className='updateProfile__imageContainer'>
                <div className='updateProfile__imageSubcontainer'>
                    <Typography className='updateProfile__imgLabels'>Profile Image</Typography>
                    <img src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"} alt='avatar' className='updateProfile__image'/>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={avatarHandler}
                        className="avatar-update-btn"
                      />
                    </div>
                </div>
                <div className='updateProfile__imageSubcontainer'>
                    <Typography className='updateProfile__imgLabels'>Resume</Typography>
                    <img src={resumePreview ? resumePreview : "/avatarHolder.jpg"} alt='resume' className='updateProfile__image'/>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={resumeHandler}
                        className="avatar-update-btn"
                      />
                  </div>
                </div>
            </div>
            <CustomInput
              value={fullName}
              handleChange={(e)=>setFullName(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Full Name'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={email}
              handleChange={(e)=>setEmail(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Email'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={phone}
              handleChange={(e)=>setPhone(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Phone'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={aboutMe}
              handleChange={(e)=>setAboutMe(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='About Me'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={portfolioURL}
              handleChange={(e)=>setPortfolioURL(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Portfolio URL'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={githubURL}
              handleChange={(e)=>setGithubURL(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Github URL'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={facebookURL}
              handleChange={(e)=>setFacebookURL(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Facebook URL'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={instagramURL}
              handleChange={(e)=>setInstagramURL(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Instagram URL'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={twitterURL}
              handleChange={(e)=>setTwitterURL(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='Twitter URL'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomInput
              value={linkedInURL}
              handleChange={(e)=>setLinkedInURL(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label='LinkedIn URL'
              inputLabelClass='updateProfile__inputLabels'
            />
            <CustomButton handleClick={handleUpdateProfile} title='Update Profile'/>
        </div>
    </div>
  )
}

export default UpdateProfile