import { Typography } from "@mui/material"
import CustomButton from "../../components/button/CustomButton"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './manageSkills-styles.scss'
import { clearAllSkillErrors, getAllSkills, resetSkillSlice, updateSkill } from "../../store/slices/skillSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const dispatch = useAppDispatch();

  const { loading,skills , error, message } = useSelector(
    (state:RootState) => state.skill
  );

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
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
    }
  }, [dispatch, loading, error]);

  return (
    <div className='manageSkills__container'>
      <div className='manageSkills__subContainer'>
        <Typography className='manageSkills__title'>Manage Skills</Typography>
        <CustomButton title='Back' onClick={handleReturnToDashboard} fullWidth={false} buttonClass='manageSkills__buttonTitle'/>
      </div>
      <div className="manageSkills__skillsContainer">
        {
          skills.map((item)=>(
            <div key={item._id} className="manageSkills__skillsSubcontainer">
              <Typography className="manageSkills__skillTitle">{item.title}</Typography>
              <div className="manageSkills__skillProfiencyContainer">
                <Typography className="manageSkills__label">Proficiency:</Typography>
                <input
                  type="number"
                  defaultValue={item.proficiency}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onBlur={() => handleUpdateSkill(item._id)}
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ManageSkills