import { ForgotPassword, Home, Login, ManageProject, ManageSkills, ManageTimeline, ResetPassword, UpdateProject, ViewProject } from './pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { useEffect } from 'react';
import { getUser } from './store/slices/userSlice';
import { useAppDispatch } from './hooks/storeHooks';
import { getAllMessages } from './store/slices/messageSlice';
import { getAllTimeline } from './store/slices/timelineSlice';
import { getAllSkills } from './store/slices/skillSlice';
import { getAllSoftwareApplications } from './store/slices/softwareApplicationSlice';
import { getAllProjects } from './store/slices/projectSlice';
import UpdatePassword from './pages/account/components/update-password/UpdatePassword';

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplications())
    dispatch(getAllProjects())
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route path="/manage/skills" element={<ManageSkills/>}/>
        <Route path="/manage/timeline" element={<ManageTimeline/>}/>
        <Route path="/manage/projects" element={<ManageProject/>}/>
        <Route path="/view/project/:id" element={<ViewProject/>}/>
        <Route path="/update/project/:id" element={<UpdateProject/>}/>
        <Route path="/account" element={<UpdatePassword/>}/>
      </Routes>
      <ToastContainer position='top-right' theme='dark'/>
    </Router>
  )
}

export default App
