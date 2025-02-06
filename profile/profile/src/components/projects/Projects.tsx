import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./projects-styles.scss";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllProjects } from "../../store/slices/projectSlice";
import CustomButton from "../button/CustomButton";
import CustomSpinner from "../spinner/CustomSpinner";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const dispatch = useAppDispatch();
  const {projects,loading} = useSelector((state:RootState)=>state.project)

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <div className="portfolio__container">
      <div className="portfolio__header">
        <Typography className="portfolio__title">
          PROJECTS
        </Typography>
      </div>
      {
        loading?(
          <CustomSpinner color="purple" spinnerSize={100}/>
        ):(
          <div className="portfolio__grid">
          {viewAll
            ? projects.map((element) => (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="portfolio__image"
                  />
                </Link>
              ))
            : projects.slice(0, 9).map((element) => (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.image && element.image.url}
                    alt={element.title}
                    className="portfolio__image"
                  />
                </Link>
              ))}
        </div>
        )
      }
      {projects.length > 6 && (
        <div className="portfolio__buttonContainer">
          <CustomButton className="portfolio__button" title={viewAll ? "Show Less" : "Show More"} handleClick={() => setViewAll(!viewAll)} fullWidth={false}/>
        </div>
      )}
      <hr className="portfolio__separator" />
    </div>
  );
};

export default Portfolio;
