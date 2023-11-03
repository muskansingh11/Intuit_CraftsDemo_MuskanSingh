import React, { useState, useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card, 
  CardActions, 
  CardContent, 
  Button, 
  Typography,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from "@material-ui/core";
import { AppContext } from "../../../context/AppContext";
import { unregisterEvent, registerEvent } from "../../../util/RestClient";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bolder",
  },
  name: {
    margin: 10,
    // textTransform: "uppercase",

  },
  pos: {
    margin: 10,
    marginTop: 10,
  },
  regBtn: {
    backgroundColor: theme.palette.customPrimary.dark,
    color: theme.palette.customSecondary.dark,
    fontWeight: 700,
    "&:hover": {
      background: theme.palette.customPrimary.main,
    },
  },
  unregBtn: {
    backgroundColor: theme.palette.customSecondary.main,
    color: theme.palette.customPrimary.dark,
    fontWeight: 700,
    "&:hover": {
      background: theme.palette.customSecondary.dark,
    },
  },
  regCard: {
    color: theme.palette.customSecondary.dark,
    backgroundColor: theme.palette.customPrimary.dark
  },
  unregCard: {
    backgroundColor: theme.palette.customSecondary.main,
    color: theme.palette.customPrimary.main
  }
}));

const EventCard = (props) => {
  const classes = useStyles();
  const { eventType, event } = props;
  const [dialogOpen, setdialogOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const isReg = eventType === "Registered Events";

  const {
    userData,
    setIsAlertOpen,
    setAlertSeverity,
    setAlertText,
    regEvents,
    unregEvents,
    setRegEvents,
    setUnregEvents,
  } = useContext(AppContext);

  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };

  const handleAlertOpen = (response) => {
    setAlertText(response.message);
    setAlertSeverity(response.status ? "success" : "error");
    setIsAlertOpen(true);
  };

  const handleUnregisterClick = async () => {
    handleClose();
    const response = await unregisterEvent(
      userData.id,
      event,
      regEvents,
      setRegEvents,
      unregEvents,
      setUnregEvents
    );
    console.log(response);
    handleAlertOpen(response);
  };

  const handleRegisterClick = async () => {
    handleClose();
    const response = await registerEvent(
      userData.id,
      event,
      regEvents,
      setRegEvents,
      unregEvents,
      setUnregEvents
    );
    console.log(response);
    handleAlertOpen(response);
  };

  useEffect(() => {
    var momentDate = moment(event.startTime);
    setDate(momentDate.format("YYYY-MM-DD"));
    setStartTime(momentDate.format("hh:mm A "));
    momentDate = moment(event.endTime);
    setEndTime(momentDate.format("hh:mm A "));
  });

  return (
    <Paper elevation={2}>
      <Card className={isReg ? classes.regCard : classes.unregCard} variant="outlined">
        <CardContent>
          <Typography variant="overline" className={classes.title} gutterBottom>
            {event.category}
          </Typography>
          <Typography variant="h5" className={classes.name}>
            {event.name}
          </Typography>
          <Typography variant="h6" className={classes.pos}>
            {date}
          </Typography>
          <Typography variant="h6" className={classes.pos}>
            {startTime + " - " + endTime }
          </Typography>
        </CardContent>
        <CardActions className={classes.name}>
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            className={isReg ? classes.unregBtn : classes.regBtn}
          >
            {isReg ? "Unregister" : "Register"}
          </Button>
          <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {`Are you sure you wish to ${isReg ? "unregister from" : "register to"} this event?`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={isReg ? handleUnregisterClick: handleRegisterClick} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default EventCard;
