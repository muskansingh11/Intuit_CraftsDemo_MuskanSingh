import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";

const CustomAlert = () => {
    const {isAlertOpen, setIsAlertOpen, alertSeverity, setAlertSeverity, alertText, setAlertText} = useContext(AppContext);
    
    const handleAlertClose = () => {
        setIsAlertOpen(false);
        setAlertText("");
        setAlertSeverity("");
    }
    
    return (
        <Snackbar
            open={isAlertOpen}
            autoHideDuration={3000}
            anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            onClose={handleAlertClose}
        >
            <Alert variant="filled" severity={alertSeverity} onClose={handleAlertClose}>{alertText}</Alert>
        </Snackbar>
    );
}

export default CustomAlert;