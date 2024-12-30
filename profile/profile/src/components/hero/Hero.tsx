import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { IconButton, Typography } from "@mui/material";
import { Facebook, GitHub, Instagram, LinkedIn, OpenInNew } from "@mui/icons-material";
import './hero-styles.scss';
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getUser } from "../../store/slices/userSlice";
import CustomButton from "../button/CustomButton";
import { ButtonVariant } from "../../constants/common-constants";

const Hero = () => {
  const dispatch = useAppDispatch();
  const {user} = useSelector((state:RootState)=>state.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="hero__container">
      <Typography className="hero__title">Hey 👋, I'm Amandeep Singh</Typography>
      <Typography className="hero__subtitle">
        <Typewriter
          words={["Software Engineer", "FRONTEND DEVELOPER", "MERN DEVELOPER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </Typography>
      <div className="hero__socialLinks">
        <Link to={user?.instagramURL} target="_blank">
          <IconButton className="hero__socialIcon">
            <Instagram color="secondary" />
          </IconButton>
        </Link>
        <Link to={user?.facebookURL} target="_blank">
          <IconButton className="hero__socialIcon">
            <Facebook color="primary" />
          </IconButton>
        </Link>
        <Link to={user?.linkedInURL} target="_blank">
          <IconButton className="hero__socialIcon">
            <LinkedIn color="primary" />
          </IconButton>
        </Link>
      </div>
      <div className="hero__buttonsContainer">
        <Link to={user?.githubURL} target="_blank">
          <CustomButton title="Github" variant={ButtonVariant.Contained} className="hero__githubButton" startIcon={<GitHub />}/>
        </Link>
        <Link to={user?.resume?.url} target="_blank">
          <CustomButton title="Resume" variant={ButtonVariant.Outlined} className="hero__resumeButton" startIcon={<OpenInNew />}/>
        </Link>
      </div>
      <Typography className="hero__aboutMe">{user?.aboutMe}</Typography>
      <hr className="hero__separator" />
    </div>
  );
};

export default Hero;
