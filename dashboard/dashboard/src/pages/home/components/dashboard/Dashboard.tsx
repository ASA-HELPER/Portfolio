import { ExtendedColumn } from "../../../../types/table-types";
import CustomTable from "../../../../components/table/CustomTable"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import { clearAllSoftwareAppErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSoftwareApplicationSlice } from "../../../../store/slices/softwareApplicationSlice";
import { useAppDispatch } from "../../../../hooks/storeHooks";
import { toast } from "react-toastify";
import { clearAllSkillErrors } from "../../../../store/slices/skillSlice";
import { clearAllProjectErrors, deleteProject } from "../../../../store/slices/projectSlice";
import { clearAllTimelineErrors } from "../../../../store/slices/timelineSlice";
import './dashboard-styles.scss';
import { LinearProgress, Typography } from "@mui/material";
import CustomButton from "../../../../components/button/CustomButton";

const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };

  const { user } = useSelector((state:RootState) => state.user);

  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state:RootState) => state.skill);

  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state:RootState) => state.application);

  const transformedSoftwareAppData = softwareApplications.map(item => ({
    id: item._id,
    name: item.name,
    iconImage: item.image.url,
  }));

  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state:RootState) => state.timeline);

  const transformedTimelineData = timeline.map(item => ({
    id: item._id,
    title: item.title,
    from:item.timeline.from,
    to:item.timeline.to
  }));

  const { projects, error: projectError,loading:projectLoading } = useSelector(
    (state:RootState) => state.project
  );

  const transformedProjectData = projects.map(item => ({
    id: item._id,
    title: item.title,
    stack:item.stack,
    deployed:item.deployed
  }));

  const [appId, setAppId] = useState(null);
  const [projectId,setProjectId] = useState(null);

  const handleDeleteSoftwareApp = (row) => {
    setAppId(row.id);
    dispatch(deleteSoftwareApplication(row.id));
  };

  const handleDeleteProject = (row) => {
    setProjectId(row.id);
    dispatch(deleteProject(row.id));
    // navigateTo(`/update/project/${row.id}`);
  };

  const handleViewProfile = () =>{
    // TODO : Replace it with the link of deployed version of portfolio
    navigateTo("/")
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  const SOFTWARE_APPLICATION_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      flex: 1,
    },
    {
      field: 'iconImage',
      headerName: 'Icon',
      flex: 1,
      renderCell: params => (
        <img
          src={params.value}
          alt="icon"
          style={{ width: 40, height: 40, objectFit: 'cover',borderRadius:'50%',alignSelf:'center' }}
        />
      ),
    },
  ];

  const PROJECTS_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: 'title',
      headerName: 'Name',
      type: 'string',
      flex: 1,
    },
    {
      field: 'stack',
      headerName: 'Stack',
      type: 'string',
      flex: 1,
    },
    {
      field: 'deployed',
      headerName: 'Deployed',
      type: 'string',
      flex: 1,
    },
  ];

  const TIMELINE_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: 'title',
      headerName: 'Name',
      type: 'string',
      flex: 1,
    },
    {
      field: 'from',
      headerName: 'Start',
      type: 'number',
      flex: 1,
    },
    {
      field: 'to',
      headerName: 'END',
      type: 'number',
      flex: 1,
    },
  ];

  return (
    <div className="dashboard__container">
      <div className="dashboard__headerContainer">
        <div className="dashboard__headerSubcontainer">
          <Typography className="dashboard__headerTitle">{user.aboutMe}</Typography>
          <CustomButton onClick={handleViewProfile} title='View Profile' fullWidth={false} />
        </div>
        <div className="dashboard__headerSubcontainer">
          <Typography className="dashboard__headerSubtitle">Projects : {projects && projects.length}</Typography>
          <CustomButton onClick={gotoMangeProjects} title='Manage Projects' fullWidth={false} />
        </div>
      </div>
      <div className="dashboard__headerContainer">
        <div className="dashboard__headerSubcontainer">
          <Typography className="dashboard__headerSubtitle">Skills : {skills && skills.length}</Typography>
          <CustomButton onClick={gotoMangeSkills} title='Manage Skills' fullWidth={false} />
        </div>
        <div className="dashboard__headerSubcontainer">
          <Typography className="dashboard__headerSubtitle">Timeline : {timeline && timeline.length}</Typography>
          <CustomButton onClick={gotoMangeTimeline} title='Manage Timeline' fullWidth={false} />
        </div>
      </div>
      
      <Typography className="dashboard__headerSubtitle">Skills</Typography>
      <div className="dashboard__skillsContainer">
        {
          skills.map((item)=>(
            <div key={item._id} className="dashboard__skillsSubcontainer">
              <Typography>{item.title}</Typography>
              <LinearProgress value={Number(item.proficiency)} variant='determinate' color="inherit" />
            </div>
          ))
        }
      </div>

      <Typography className="dashboard__headerSubtitle">Software Applications</Typography>
      <CustomTable
        actions={{
          delete:true
        }}
        handleActionClick={handleDeleteSoftwareApp}
        columns={SOFTWARE_APPLICATION_TABLE_FIELDS}
        rows={transformedSoftwareAppData}
        loading={appLoading}
      />

      <Typography className="dashboard__headerSubtitle">Projects</Typography>
      <CustomTable
        actions={{
          delete:true,
        }}
        handleActionClick={handleDeleteProject}
        columns={PROJECTS_TABLE_FIELDS}
        rows={transformedProjectData}
        loading={projectLoading}
      />

      <Typography className="dashboard__headerSubtitle">Timeline</Typography>
      <CustomTable
        columns={TIMELINE_TABLE_FIELDS}
        rows={transformedTimelineData}
        loading={timelineLoading}
      />
    </div>
  )
}

export default Dashboard