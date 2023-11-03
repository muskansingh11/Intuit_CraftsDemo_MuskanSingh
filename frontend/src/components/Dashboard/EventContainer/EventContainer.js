import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { EventCard } from "../EventCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'row',
    width: "100%"
  },
  container: {
    width: "50vw",
    padding: "2rem",
    paddingTop: "0.75rem"
  },
  regContainer: {
    backgroundColor: theme.palette.customSecondary.main,
  },
  unregContainer: {
    backgroundColor: theme.palette.customPrimary.dark,
  },
  sectionHeading:{
    fontSize: "1.5rem",
    fontWeight: 600
  },
  regHeading: {
    color: theme.palette.customPrimary.main
  },
  unregHeading: {
    color: theme.palette.customSecondary.dark
  }
}));

const EventContainer = (props) => {
  const classes = useStyles();
  const {eventType, data} = props;
  const isReg = (eventType === "Registered Events");
  return (
    <div className={`${classes.container} ${isReg ? classes.regContainer : classes.unregContainer}`}>
      <Typography variant="overline" className={`${classes.sectionHeading}  ${isReg ? classes.regHeading : classes.unregHeading}`} >
        {isReg ? "MY EVENTS" : "CATALOG"}
      </Typography>
      {data.length != 0 && 
        <Grid container spacing={2} className={classes.root}>
          {data.map(event => {
            return (
              <Grid item xs={6} > 
                <EventCard eventType={eventType} event={event}></EventCard>
              </Grid>
            );
          })}
        </Grid>
      }
    </div>
  );
};

export default EventContainer;
