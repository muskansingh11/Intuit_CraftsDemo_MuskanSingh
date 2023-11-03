import { EventContainer } from "./EventContainer";
import { LoginModal } from "./LoginModal";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { getUnregEvents } from "../../util/RestClient";
import { CustomAlert } from "./CustomAlert";
import Logo from "../../Img/calendar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    height: "calc(100vh - 64px)"
  },
  imageStyle:{
    height:'500px'
  },
  divCenter:{
    margin:'auto'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { regEvents, unregEvents, setUnregEvents, isLoggedIn } =
    useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn) {
      // Get events user is not registered in
      getUnregEvents(regEvents, setUnregEvents);
    }
  }, [isLoggedIn]);

  return (      
      <div className={classes.root}>
          {isLoggedIn && (
              <EventContainer className={classes.eventContainer} eventType="Unregistered Events" data={unregEvents} />
          )}
          {isLoggedIn && (
              <EventContainer className={classes.eventContainer} eventType="Registered Events" data={regEvents} />
          )}
          {!isLoggedIn && (
            <div className={classes.divCenter}>
              <img src={Logo} className={classes.imageStyle}></img>
            </div>
          )}
        <LoginModal />
        <CustomAlert />
      </div>
  );
};

export default Dashboard;
