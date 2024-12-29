import { useEffect } from "react";
import { Card, CardContent, CardMedia,Typography } from "@mui/material";
import './myApplications-styles.scss'
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllSoftwareApplications } from "../../store/slices/softwareApplicationSlice";

const MyApplications = () => {
  const dispatch = useAppDispatch();
  const {softwareApplications} = useSelector((state:RootState)=>state.application);

  useEffect(() => {
    dispatch(getAllSoftwareApplications());
  }, []);

  return (
    <div className="myapps__container">
      <Typography variant="h3" className="myapps__title">
        APPLICATIONS
      </Typography>
      <div className="myapps__grid">
        {softwareApplications?.map((element) => (
          <Card className="myapps__card" key={element._id}>
            <CardMedia
              image={element.image ? element.image.url : ""}
              alt={element.name}
              className="myapps__image"
            />
            <CardContent>
              <Typography variant="body2" className="myapps__text" align="center">
                {element.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <hr className="myapps__separator" />
    </div>
  );
};

export default MyApplications;
