import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import './timelineCard-styles.scss'

const TimelineCard = ({ time, activity, details, Icon }) => {
    return (
      <TimelineItem>
        <TimelineOppositeContent className="timelineCard__schedule">
          {time}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot className="timelineCard__iconContainer">
            {Icon && <Icon />}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography className="timelineCard__title">{activity}</Typography>
          <Typography className="timelineCard__description">{details}</Typography>
        </TimelineContent>
      </TimelineItem>
    );
};

export default TimelineCard;