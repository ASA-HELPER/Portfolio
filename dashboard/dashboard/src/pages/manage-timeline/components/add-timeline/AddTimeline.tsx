import { useAppDispatch } from '../../../../hooks/storeHooks';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '../../../../store/slices/timelineSlice';
import CustomInput from '../../../../components/input/CustomInput';
import { InputPresets, InputVariant } from '../../../../constants/input-constants';
import CustomButton from '../../../../components/button/CustomButton';
import { RootState } from '../../../../store/store';
import './addTimeline-styles.scss'
import { useNavigate } from 'react-router-dom';

const AddTimeline = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const { loading, error, message } = useSelector((state:RootState) => state.timeline);

    const handleAddNewTimeline = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("from", from);
        formData.append("to", to);
        dispatch(addNewTimeline(formData));
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllTimelineErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetTimelineSlice());
            dispatch(getAllTimeline());
            navigate("/");
        }
    }, [dispatch, error, message, loading]);

  return (
    <div className='addTimeline__container'>
        <h1 className="addTimeline__title">Add New Timeline</h1>
        <CustomInput
          value={title}
          placeholder='Enter title'
          preset={InputPresets.Text}
          handleChange={(e) => setTitle(e.target.value)}
          variant={InputVariant.Outlined}
          hasBorder
          label='Title'
          inputLabelClass='addTimeline__inputLabels'
        />
        <CustomInput
          value={description}
          placeholder='Enter description'
          preset={InputPresets.Text}
          handleChange={(e) => setDescription(e.target.value)}
          variant={InputVariant.Outlined}
          hasBorder
          label='Description'
          inputLabelClass='addTimeline__inputLabels'
          isMultiline
        />
        <CustomInput
            value={from}
            placeholder='Enter start year'
            preset={InputPresets.Text}
            handleChange={(e) => setFrom(e.target.value)}
            variant={InputVariant.Outlined}
            hasBorder
            label='From'
            inputLabelClass='addTimeline__inputLabels'
        />
        <CustomInput
          value={to}
          placeholder='Enter end year'
          preset={InputPresets.Text}
          handleChange={(e) => setTo(e.target.value)}
          variant={InputVariant.Outlined}
          hasBorder
          label='To'
          inputLabelClass='addTimeline__inputLabels'
        />
        <CustomButton onClick={handleAddNewTimeline} title='Add New Timeline' />
    </div>
  )
}

export default AddTimeline