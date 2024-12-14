import { useAppDispatch } from '../../../../hooks/storeHooks';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewSkill, clearAllSkillErrors, getAllSkills, resetSkillSlice } from '../../../../store/slices/skillSlice';
import { RootState } from '../../../../store/store';
import CustomInput from '../../../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../../../constants/input-constants';
import CustomButton from '../../../../components/button/CustomButton';
import './addSkill-styles.scss'
import { useNavigate } from 'react-router-dom';

const AddSkill = () => {
    const [title, setTitle] = useState("");
    const [proficiency, setProficiency] = useState("");
    const [svg, setSvg] = useState("");
    const [svgPreview, setSvgPreview] = useState("");
    const navigate = useNavigate();

    const handleSvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSvgPreview(reader.result);
            setSvg(file);
        };
    };

    const { loading, message, error } = useSelector((state:RootState) => state.skill);
    const dispatch = useAppDispatch();

    const handleAddNewSkill = (e) => {
        if(!title || !proficiency)
        {
            toast.error("Please fill all the fields!!!");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("proficiency", proficiency);
        formData.append("image", svg);
        dispatch(addNewSkill(formData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllSkillErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetSkillSlice());
            dispatch(getAllSkills());
            navigate("/")
        }
    }, [dispatch, loading, error]);

  return (
    <div className='addSkill__container'>
        <h1 className="addSkill__title">Add New Skill</h1>
        <CustomInput
            value={title}
            placeholder='Enter skill title'
            preset={InputPresets.Text}
            handleChange={(e) => setTitle(e.target.value)}
            variant={InputVariant.Outlined}
            hasBorder
            label='Title'
            inputLabelClass='addSkill__inputLabels'
        />
        <CustomInput
            value={proficiency}
            placeholder='Enter skill proficiency'
            preset={InputPresets.Text}
            handleChange={(e) => setProficiency(e.target.value)}
            variant={InputVariant.Outlined}
            hasBorder
            label='Proficiency'
            inputLabelClass='addSkill__inputLabels'
        />
        <div className="addSkill__inputImgContainer">
            <label className="addSkill__inputImgLabel">
                Skill Svg
            </label>
            <div className="addSkill__inputImgFieldContainer">
                <div className="addSkill__inputImgFieldSubcontainer">
                    {svgPreview ? (
                        <img
                            className="addSkill__skillImage"
                            src={svgPreview && svgPreview}
                        />
                    ) : (
                    <svg
                        className="addSkill__svg"
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

                    <div className="addSkill__skillInputField">
                        <label
                            htmlFor="file-upload"
                            className="addSkill__fileUploadLabel"
                        >
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="addSkill__fileUploadInput"
                                onChange={handleSvg}
                            />
                        </label>
                        <p className="addSkill__fileUploadTitle">or drag and drop</p>
                    </div>
                    <p className="addSkill__fileUploadSubtitle">
                        PNG, JPG, GIF up to 10MB
                    </p>
                </div>
            </div>
        </div>
        <CustomButton onClick={handleAddNewSkill} title='Add New Skill' />
    </div>
  )
}

export default AddSkill