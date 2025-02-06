import { Typography } from "@mui/material";
import "./about-styles.scss";
import ProfileImage from '../../assets/me.jpg';

const About = () => {
  return (
    <div className="about__container">
      <div className="about__header">
        <Typography className="about__title">
          ABOUT ME
        </Typography>
      </div>
      <div className="about__content">
        <div className="about__grid">
          <div className="about__imageContainer">
            <img
              src={ProfileImage}
              alt="avatar"
            />
          </div>
          <div className="about__textContainer">
            <Typography variant="body1" className="about__description">
              I am Amandeep Singh. I am a Software Engineer with expertise in C++, MySQL, MongoDB, Node.js, React.js, JavaScript, and a strong foundation in data structures and algorithms.
              I worked on delivering high-quality software solutions under challenging deadlines. I have a passion for solving complex problems, optimizing solutions for efficiency, and learning cutting-edge technologies. With a solid academic and professional background, I am driven to excel in the tech industry and contribute effectively to innovative projects.My dedication and perseverance in timely delivery of work are integral to me. I maintain the courage to face any challenges for extended periods.
            </Typography>
          </div>
        </div>
      </div>
      <hr className="about__separator" />
    </div>
  );
};

export default About;
