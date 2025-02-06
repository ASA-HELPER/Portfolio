import { useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./skills-styles.scss";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllSkills } from "../../store/slices/skillSlice";
import CustomSpinner from "../spinner/CustomSpinner";

const Skills = () => {
  const dispatch = useAppDispatch();
  const {skills,loading} = useSelector((state:RootState)=>state.skill);

  useEffect(() => {
    dispatch(getAllSkills());
  }, []);

  return (
    <div className="skills__container">
      <Typography className="skills__header">
        SKILLS
      </Typography>
      {
        loading?(
          <CustomSpinner color="yellow" spinnerSize={100}/>
        ):(
          <div className="skills__grid">
            {skills &&
              skills.map((element) => (
                <Card className="skills__card" key={element._id}>
                  <CardContent className="skills__card-content">
                    <img
                      src={element.image && element.image.url}
                      alt="skill"
                      className="skills__image"
                    />
                    <Typography className="skills__title">
                      {element.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </div>
        )
      }
      <hr className="about__separator" />
    </div>
  );
};

export default Skills;
