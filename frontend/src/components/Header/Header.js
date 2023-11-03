import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { AppContext } from '../../context/AppContext';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "64px",
        margin: 0
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.customPrimary.main,
        color: theme.palette.customSecondary.dark,
        fontWeight: 1000
    },
    icon: {
        marginRight: "10px"
    },
    headerheight:{
         height:"64px",
    },
    imgStyle:{
        height:"40px",
    }
}));

const Header = () => {
    const classes = useStyles();
    const {
        userData, 
        setUserData, 
        isLoggedIn, 
        setIsLoggedIn,
        setOpen,
        setRegEvents,
        setUnregEvents
    } = useContext(AppContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        handleClose();
        setUserData({});
        setRegEvents([]);
        setUnregEvents([]);
        setIsLoggedIn(false);
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" > BookMyevent </Typography>     
                {isLoggedIn 
                    ? <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle fontSize="large" className={classes.icon}/>
                            <Typography variant="subtitle1"> {userData.name}</Typography>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            keepMounted
                            transformOrigin={{vertical: 'top', horizontal: 'right'}}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                        </Menu>
                    </div>
                    : <Button color="inherit" className={classes.menuButton} onClick={() => {setOpen(true);}}> Login </Button>}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
