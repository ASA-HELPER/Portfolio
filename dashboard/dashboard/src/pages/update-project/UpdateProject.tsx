import { useAppDispatch } from '../../hooks/storeHooks';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllProjectErrors, getAllProjects, getSingleProject, resetProjectSlice, updateProject } from '../../store/slices/projectSlice';
import { RootState } from '../../store/store';
import CustomInput from '../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../constants/input-constants';
import CustomDropdown from '../../components/dropdown/CustomDropdown';
import CustomButton from '../../components/button/CustomButton';
import './updateProject-styles.scss'
import { Typography } from '@mui/material';

const UpdateProject = () => {
  const { error, message, loading,singleProject } = useSelector((state:RootState) => state.project);
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
  const [projectBannerPreview, setProjectBannerPreview] = useState(singleProject.image && singleProject.image.url);

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  useEffect(() => {
    dispatch(getSingleProject(id));

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
      navigateTo("/");
    }
  }, [id, message, error]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("image", projectBanner);
    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className='updateProject__container'>
      <Typography className='updateProject__title'>Update Project</Typography>
      <div className='updateProject__imageContainer'>
        <Typography className='updateProject__imgLabels'>Project Banner</Typography>
        <img src={projectBannerPreview ? projectBannerPreview : "/avatarHolder.jpg"} alt='avatar' className='updateProject__image'/>
        <div className="updateProject__fileUploadButton">
          <input
            type="file"
            onChange={handleProjectBanner}
          />
        </div>
      </div>
      <CustomInput
        value={title}
        placeholder='Enter project title'
        preset={InputPresets.Text}
        handleChange={(e) => setTitle(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Title'
        inputLabelClass='updateProject__inputLabels'
      />
      <CustomInput
        value={description}
        placeholder='Enter project description'
        preset={InputPresets.Text}
        handleChange={(e) => setDescription(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Description'
        inputLabelClass='updateProject__inputLabels'
        isMultiline
      />
      <CustomInput
        value={technologies}
        placeholder='Enter project technologies'
        preset={InputPresets.Text}
        handleChange={(e) => setTechnologies(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Technologies Used In This Project'
        inputLabelClass='updateProject__inputLabels'
        isMultiline
      />
      <CustomDropdown
        data={['MERN','MEAN','LAMP','MEVN','HTML CSS JAVASCRIPT','Frontend','Backend']}
        placeholder={'Select project tech stack'}
        setValue={(value)=>setStack(value)}
        value={stack}
        label='Tech Stack'
      />
      <CustomDropdown 
        data={['Yes','No']}
        placeholder={'Is the project deployed?'}
        setValue={(value)=>setDeployed(value)}
        value={deployed}
        label='Deployed'
      />
      <CustomInput
        value={gitRepoLink}
        placeholder='Enter github repository link'
        preset={InputPresets.Text}
        handleChange={(e) => setGitRepoLink(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Github Repository Link'
        inputLabelClass='updateProject__inputLabels'
      />
      <CustomInput
        value={projectLink}
        placeholder='Enter deployed project link'
        preset={InputPresets.Text}
        handleChange={(e) => setProjectLink(e.target.value)}
        variant={InputVariant.Outlined}
        hasBorder
        label='Project Link'
        inputLabelClass='updateProject__inputLabels'
      />
      <CustomButton onClick={handleUpdateProject} title='Update Project' />
    </div>
  )
}

export default UpdateProject