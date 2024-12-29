import { useAppDispatch } from '../../hooks/storeHooks.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllUserErrors, logout } from '../../store/slices/userSlice';
import { RootState } from 'store/store';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import TimelineIcon from '@mui/icons-material/Timeline';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './home-styles.scss'
import { HomeComponentTypes } from '../../types/common-types.js';
import Account from '../../pages/account/Account.js';
import AddApplication from './components/add-application/AddApplication.js';
import AddProject from '../../pages/manage-projects/components/add-project/AddProject.js';
import AddSkill from '../../pages/manage-skills/components/add-skill/AddSkill.js';
import AddTimeline from '../../pages/manage-timeline/components/add-timeline/AddTimeline.js';
import Messages from '../../pages/messages/Messages.js';
import Dashboard from './components/dashboard/Dashboard.js';
import { Typography } from '@mui/material';

const Home = () => {
  const [active,setActive] = useState(HomeComponentTypes.Dashboard);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {message,isAuthenticated,error,user} = useSelector((state:RootState) => state.user);

  const handleLogout = ()=>{
    dispatch(logout());
    toast.success(message);
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if(!isAuthenticated)
    {
      navigate("/login")
    }
  },[isAuthenticated])

  const renderContent = ()=>{
    switch(active){
      case HomeComponentTypes.Dashboard:
        return <Dashboard/>;
        break;
      case HomeComponentTypes.Account:
        return <Account/>;
        break;
      case HomeComponentTypes.AddApplication:
        return <AddApplication/>;
        break;
      case HomeComponentTypes.AddProject:
        return <AddProject/>;
        break;
      case HomeComponentTypes.AddSkills:
        return <AddSkill/>;
        break;
      case HomeComponentTypes.AddTimeline:
        return <AddTimeline/>;
        break;
      case HomeComponentTypes.Messages:
        return <Messages/>;
        break;
      default:
        return <Dashboard/>;
    }
  }

  return (
    <div className='home__container'>
      <aside className='home__navContainer'>
        <nav className='home__navSubContainer'>
          <Link to='/' onClick={()=>setActive(HomeComponentTypes.Dashboard)}>
            <HomeIcon className={active === HomeComponentTypes.Dashboard ? "home__activeLink" : "home__link"}/>
          </Link>
          <Link to='' onClick={()=>setActive(HomeComponentTypes.AddProject)}>
            <CreateNewFolderIcon className={active === HomeComponentTypes.AddProject ? "home__activeLink" : "home__link"}/>
          </Link>
          <Link to='' onClick={()=>setActive(HomeComponentTypes.AddSkills)}>
            <AddCircleOutlineIcon className={active === HomeComponentTypes.AddSkills ? "home__activeLink" : "home__link"}/>
          </Link>
          <Link to='' onClick={()=>setActive(HomeComponentTypes.AddApplication)}>
            <AppShortcutIcon className={active === HomeComponentTypes.AddApplication ? "home__activeLink" : "home__link"}/>
          </Link>
          <Link to='' onClick={()=>setActive(HomeComponentTypes.AddTimeline)}>
            <TimelineIcon className={active === HomeComponentTypes.AddTimeline ? "home__activeLink" : "home__link"}/>
          </Link>
          <Link to='' onClick={()=>setActive(HomeComponentTypes.Messages)}>
            <MessageIcon className={active === HomeComponentTypes.Messages ? "home__activeLink" : "home__link"}/>
          </Link>
          <Link to='' onClick={()=>setActive(HomeComponentTypes.Account)}>
            <AccountCircleIcon className={active === HomeComponentTypes.Account ? "home__activeLink" : "home__link"}/>
          </Link>
          <Link to='/login' onClick={handleLogout}>
            <LogoutIcon className="home__link"/>
          </Link>
        </nav>
      </aside>
      <div className='home__content'>
        <header className='home__headerContainer'>
          <MenuIcon className='home__menuItemIcon'/>
          <div className='home__headerContent'>
            <img src={user && user?.avatar && user?.avatar.url} alt='avatar' className='home__image'/>
            <Typography className='home__headerTitle'>Welcome back, {user.fullName}</Typography>
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  )
}

export default Home