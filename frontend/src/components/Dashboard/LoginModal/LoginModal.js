import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContext } from '../../../context/AppContext';
import { makeStyles } from '@material-ui/core';

import { login , signup } from '../../../util/RestClient';
import { CustomAlert } from '../CustomAlert';

const useStyles = makeStyles((theme) => ({
    parent: {
        minHeight: '20vh',
        minWidth: '20vw',
    }
}));

const LoginModal = ()  => {
    const classes = useStyles();
    const {
        open, 
        setOpen, 
        setUserData, 
        setRegEvents, 
        setIsLoggedIn,
        setIsAlertOpen, 
        setAlertSeverity, 
        setAlertText
    } = useContext(AppContext);
    
    const [signUp, setSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    const toggleLogInSignUp = () => {
        setSignUp(!signUp);
    }

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }
    
    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleAlertOpen = (response) => {
        setAlertText(response.message);
        setAlertSeverity(response.status ? "success" : "error");
        setIsAlertOpen(true);
    }

    const handleLoginClick = async () => {
        if(typeof username === "string" && (username.length === 0 || username === null)){
            const resp = {
                message : "Username is empty or null",
                status : false
            };

            handleAlertOpen(resp);
            return;
        }
        const response = await login(username, setUserData, setRegEvents, setIsLoggedIn);
        setOpen(false);
        handleAlertOpen(response);
    }

    const resetData = () =>{
        setUsername("");
        setName("");
    }

    const handleSignUpClick = async () => {
        const response = await signup(username,name);
        resetData();
        handleAlertOpen(response);
        setOpen(false);
        
    }
    
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" className={classes.parent}>
                <DialogTitle id="form-dialog-title">{signUp ? "Sign Up" : "Login"}</DialogTitle>
                <DialogContent className={classes.parent}>
                <DialogContentText> Enter your details here. </DialogContentText>
                <TextField margin="dense" id="username" label="Username" onChange={handleUsernameChange} fullWidth focused={false} required/>
                {signUp && <TextField margin="dense" id="name" label="Name" onChange={handleNameChange} fullWidth focused={false} required/>}
                
                </DialogContent>
                <DialogActions>
                    {!signUp && <Button onClick={handleLoginClick} color="primary"> Login </Button>}
                    {signUp && <Button  onClick={handleSignUpClick} color="primary"> Sign Up </Button>}
                    <Button onClick={toggleLogInSignUp} color="primary">{signUp ? "Log In Instead" : "Sign Up Instead"} </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LoginModal;
