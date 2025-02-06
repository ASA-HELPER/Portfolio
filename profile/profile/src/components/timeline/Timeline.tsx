import { useEffect } from "react";
import { Timeline } from "@mui/lab";
import { Typography } from "@mui/material";
import './timeline-styles.scss';
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllTimeline } from "../../store/slices/timelineSlice";
import TimelineCard from "../timeline-card/TimelineCard";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CustomSpinner from "../spinner/CustomSpinner";

const TimelineComponent = () => {
  const dispatch = useAppDispatch();
  const {timeline,loading} = useSelector((state:RootState)=>state.timeline);

  useEffect(() => {
    dispatch(getAllTimeline());
  }, []);

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("school") || lowerTitle.includes("institute") || lowerTitle.includes("university")) {
      return SchoolIcon;
    }
    return WorkIcon;
  };

  return (
    <div className="timeline__container">
      <Typography className="timeline__header">
        Timeline
      </Typography>
      {
        loading?(
          <CustomSpinner color="red" spinnerSize={100}/>
        ):(
          <Timeline position="alternate">
            {timeline && timeline.map((item) => (
              <TimelineCard 
                key={item._id}
                time={`${item.timeline.from} - ${item.timeline.to}`}
                activity={item.title}
                details={item.description}
                Icon={getIcon(item.title)}
              />
            ))}
          </Timeline>
        )
      }
      <hr className="about__separator" />
    </div>
  );
};

export default TimelineComponent;
