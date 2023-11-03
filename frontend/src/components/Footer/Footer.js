import React from 'react'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  footerStyle:{
    height:'30px',
    backgroundColor:'#38598b',
    position:'fixed'
  }
}));
const Footer = () => {
    const classes = useStyles();
  return (
    <div className={classes.footerStyle}>Footer</div>
  )
}

export default Footer