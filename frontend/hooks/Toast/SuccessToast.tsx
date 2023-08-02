import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {selectSuccessState, showSuccess} from "@/redux/reducers/success.reducer";

const SuccessToast = () => {
    const successState = useSelector(selectSuccessState);
    const dispatch = useDispatch();

    return (
        <>
            {successState &&
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={true}
                autoHideDuration={8000}
                onClose={() => dispatch(showSuccess(null))}
            >
                <Alert onClose={() => dispatch(showSuccess(null))} severity="success" sx={{width: '100%'}}>
                    {successState}
                </Alert>
            </Snackbar>
            }
        </>
    );
};

export default SuccessToast;
