import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useAppDispatch } from '../../../../hooks/storeHooks';
import { addNewSoftwareApplication, clearAllSoftwareAppErrors, getAllSoftwareApplications, resetSoftwareApplicationSlice } from '../../../../store/slices/softwareApplicationSlice';
import CustomInput from '../../../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../../../constants/input-constants';
import CustomButton from '../../../../components/button/CustomButton';
import { toast } from 'react-toastify';
import './addApplication-styles.scss'
import { useNavigate } from 'react-router-dom';

const AddApplication = () => {
    const [name, setName] = useState("");
    const [svg, setSvg] = useState("");
    const [svgPreview, setSvgPreview] = useState("");

    const handleSvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSvgPreview(reader.result);
            setSvg(file);
        };
    };

    const { loading, error, message } = useSelector(
        (state:RootState) => state.application
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAddSoftwareApp = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", svg);
        dispatch(addNewSoftwareApplication(formData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllSoftwareAppErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetSoftwareApplicationSlice());
            dispatch(getAllSoftwareApplications());
            setName("");
            setSvg("");
            setSvgPreview("");
            navigate("/");
        }
    }, [dispatch, loading, error, message]);

  return (
    <div className='addApplication__container'>
        <h1 className="addApplication__title">Add New Application</h1>
        <CustomInput
            value={name}
            placeholder='Enter application title'
            preset={InputPresets.Text}
            handleChange={(e) => setName(e.target.value)}
            variant={InputVariant.Outlined}
            hasBorder
            label='Software Application Name'
            inputLabelClass='addApplication__inputLabels'
        />
        <div className="addApplication__inputImgContainer">
            <label className="addApplication__inputImgLabel">
                Software Application Svg
            </label>
            <div className="addApplication__inputImgFieldContainer">
                <div className="addApplication__inputImgFieldSubcontainer">
                    {svgPreview ? (
                        <img
                            className="addApplication__skillImage"
                            src={svgPreview && svgPreview}
                        />
                    ) : (
                    <svg
                        className="addApplication__svg"
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

                    <div className="addApplication__skillInputField">
                        <label
                            htmlFor="file-upload"
                            className="addApplication__fileUploadLabel"
                        >
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="addApplication__fileUploadInput"
                                onChange={handleSvg}
                            />
                        </label>
                        <p className="addApplication__fileUploadTitle">or drag and drop</p>
                    </div>
                    <p className="addApplication__fileUploadSubtitle">
                        PNG, JPG, GIF up to 10MB
                    </p>
                </div>
            </div>
        </div>
        <CustomButton onClick={handleAddSoftwareApp} title='Add New Application' />
    </div>
  )
}

export default AddApplication