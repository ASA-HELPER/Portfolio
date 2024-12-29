import Profile from './components/profile/Profile'
import UpdateProfile from './components/update-profile/UpdateProfile'
import UpdatePassword from './components/update-password/UpdatePassword'
import { Typography } from '@mui/material'
import { useState } from 'react'
import './account-styles.scss'
import { AccountCommponentTypes } from '../../types/common-types'

const Account = () => {
  const [active,setActive] = useState("");
  
  const renderContent = ()=>{
    switch(active){
      case AccountCommponentTypes.UpdatePassword:
        return <UpdatePassword/>;
        break;
      case AccountCommponentTypes.Profile:
        return <Profile/>;
        break;
      case AccountCommponentTypes.UpdateProfile:
        return <UpdateProfile/>;
        break;
      default:
        return <Profile/>;
    }
  }

  return (
    <div className='account__container'>
      <div className='account__sidebarContainer'>
        <Typography onClick={()=>setActive("Profile")} className='account__optionTitle'>Profile</Typography>
        <Typography onClick={()=>setActive("Update Profile")} className='account__optionTitle'>Update Profile</Typography>
        <Typography onClick={()=>setActive("Update Password")} className='account__optionTitle'>Update Password</Typography>
      </div>
      {renderContent()}
    </div>
  )
}

export default Account