import { Link, useNavigate, useParams } from 'react-router-dom';
import './viewProject-styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/storeHooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearAllProjectErrors, getSingleProject } from '../../store/slices/projectSlice';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import CustomButton from '../../components/button/CustomButton';
import { CustomSpinner } from '../../components';

const ViewProject = () => {
  const { error,singleProject,loading } = useSelector((state:RootState) => state.project);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [title, setTitle] = useState(singleProject.title);
  const [description, setDescription] = useState(singleProject.description);
  const [technologies, setTechnologies] = useState(singleProject.technologies);
  const [stack, setStack] = useState(singleProject.stack);
  const [gitRepoLink, setGitRepoLink] = useState(singleProject.gitRepoLink);
  const [deployed, setDeployed] = useState(singleProject.deployed);
  const [projectLink, setProjectLink] = useState(singleProject.projectLink);
  const [projectBanner, setProjectBanner] = useState(singleProject.image && singleProject.image.url);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = description?.split(". ");
  const technologiesList = technologies?.split(", ");

  useEffect(() => {
    dispatch(getSingleProject(id));

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
  }, [id, error]);

  useEffect(() => {
    if (singleProject) {
      setTitle(singleProject.title || "");
      setDescription(singleProject.description || "");
      setTechnologies(singleProject.technologies || "");
      setStack(singleProject.stack || "");
      setGitRepoLink(singleProject.gitRepoLink || "");
      setDeployed(singleProject.deployed || "");
      setProjectLink(singleProject.projectLink || "");
      setProjectBanner(singleProject.image?.url || "");
    }
  }, [singleProject]);

  if (loading) {
    return <CustomSpinner color='coral' spinnerSize={100}/>;
  }

  return (
    <div className='viewProject__container'>
      <div className='viewProject__subContainer'>
        <Typography className='viewProject__title'>{title}</Typography>
        <CustomButton title='Back' onClick={handleReturnToDashboard} fullWidth={false} buttonClass='viewProject__buttonTitle'/>
      </div>
      <img
        src={projectBanner && projectBanner}
        alt="projectBanner"
        className="viewProject__image"
      />
      <div className='viewProject__subtitleContainer'>
        <Typography className='viewProject__subtitle'>Description</Typography>
        <ul>
          {descriptionList?.map((item, index) => (
            <li key={index} className='viewProject__listValue'>{item}</li>
          ))}
        </ul>
      </div>
      <div className='viewProject__subtitleContainer'>
        <Typography className='viewProject__subtitle'>Technologies</Typography>
        <ul>
          {technologiesList?.map((item, index) => (
            <li key={index} className='viewProject__listValue'>{item}</li>
          ))}
        </ul>
      </div>
      <div className='viewProject__subtitleContainer'>
        <Typography className='viewProject__subtitle'>Stack</Typography>
        <Typography className='viewProject__value'>{stack}</Typography>
      </div>
      <div className='viewProject__subtitleContainer'>
        <Typography className='viewProject__subtitle'>Deployed</Typography>
        <Typography className='viewProject__value'>{deployed}</Typography>
      </div>
      <div className='viewProject__subtitleContainer'>
        <Typography className='viewProject__subtitle'>Github Repository Link</Typography>
        <Link
          className="viewProject__link"
          target="_blank"
          to={gitRepoLink}
        >
          {gitRepoLink}
        </Link>
      </div>
      <div className='viewProject__subtitleContainer'>
        <Typography className='viewProject__subtitle'>Project Link</Typography>
        <Link
          className="viewProject__link"
          target="_blank"
          to={projectLink}
        >
          {projectLink}
        </Link>
      </div>
    </div>
  )
}

export default ViewProject