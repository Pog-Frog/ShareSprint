import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState, showError } from "@/redux/reducers/error.reducer";
import {useRouter} from "next/router";

const ErrorToast = () => {
    const errorState = useSelector(selectErrorState);
    const dispatch = useDispatch();
    const router = useRouter();
    const { error } = router.query;
    return (
        <>
            {errorState &&
                <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={true}
                autoHideDuration={8000}
                onClose={() => dispatch(showError(null))}
              >
                <Alert onClose={() => dispatch(showError(null))} severity="error" sx={{ width: '100%' }}>
                  {errorState}
                </Alert>
              </Snackbar>
            }
        </>
    );
};

export default ErrorToast;
