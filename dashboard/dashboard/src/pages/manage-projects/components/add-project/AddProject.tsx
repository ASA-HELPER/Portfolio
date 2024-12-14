import { useAppDispatch } from '../../../../hooks/storeHooks';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewProject, clearAllProjectErrors, getAllProjects, resetProjectSlice } from '../../../../store/slices/projectSlice';
import { RootState } from '../../../../store/store';
import CustomInput from '../../../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../../../constants/input-constants';
import CustomButton from '../../../../components/button/CustomButton';
import './addProject-styles.scss'
import CustomDropdown from '../../../../components/dropdown/CustomDropdown';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectBanner, setProjectBanner] = useState("");
    const [projectBannerPreview, setProjectBannerPreview] = useState("");
    const [gitRepoLink, setGitRepoLink] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [stack, setStack] = useState("");
    const [deployed, setDeployed] = useState("");

    const handleSvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        setProjectBannerPreview(reader.result);
        setProjectBanner(file);
        };
    };

    const { loading, error, message } = useSelector((state:RootState) => state.project);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAddNewProject = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("gitRepoLink", gitRepoLink);
        formData.append("projectLink", projectLink);
        formData.append("technologies", technologies);
        formData.append("stack", stack);
        formData.append("deployed", deployed);
        formData.append("image", projectBanner);
        dispatch(addNewProject(formData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllProjectErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetProjectSlice());
            dispatch(getAllProjects());
            navigate("/");
        }
    }, [dispatch, error, loading, message]);

  return (
    <div className='addProject__container'>
        <h1 className="addProject__title">Add New Project</h1>
        <CustomInput
            value={title}
            placeholder='Enter project title'
            preset={InputPresets.Text}
            handleChange={(e) => setTitle(e.target.value)}
            variant={InputVariant.Outlined}
            hasBorder
            label='Title'
            inputLabelClass='addProject__inputLabels'
        />
        <CustomInput
            value={description}
            placeholder='Enter project description'
            preset={InputPresets.Text}
            handleChange={(e) => setDescription(e.target.value)}
            variant={InputVariant.Outlined}
            hasBorder
            label='Description'
            inputLabelClass='addProject__inputLabels'
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
            inputLabelClass='addProject__inputLabels'
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
            inputLabelClass='addProject__inputLabels'
        />
        <CustomInput
            value={projectLink}
            placeholder='Enter deployed project link'
            preset={InputPresets.Text}
            handleChange={(e) => setProjectLink(e.target.value)}
            variant={InputVariant.Outlined}
            hasBorder
            label='Project Link'
            inputLabelClass='addProject__inputLabels'
        />
        <div className="addProject__inputImgContainer">
            <label className="addProject__inputImgLabel">
                Project Svg
            </label>
            <div className="addProject__inputImgFieldContainer">
                <div className="addProject__inputImgFieldSubcontainer">
                    {projectBannerPreview ? (
                        <img
                            className="addProject__skillImage"
                            src={projectBannerPreview && projectBannerPreview}
                        />
                    ) : (
                    <svg
                        className="addProject__svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    )}

                    <div className="addProject__skillInputField">
                        <label
                            htmlFor="file-upload"
                            className="addProject__fileUploadLabel"
                        >
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="addProject__fileUploadInput"
                                onChange={handleSvg}
                            />
                        </label>
                        <p className="addProject__fileUploadTitle">or drag and drop</p>
                    </div>
                    <p className="addProject__fileUploadSubtitle">
                        PNG, JPG, GIF up to 10MB
                    </p>
                </div>
            </div>
        </div>
        <CustomButton onClick={handleAddNewProject} title='Add New Project' />
    </div>
  )
}

export default AddProject