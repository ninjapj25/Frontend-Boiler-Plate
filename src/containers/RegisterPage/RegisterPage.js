import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import { useDispatch, useSelector } from "react-redux";
import { register, resetPage } from "../../actions/RegisterPage";
import { Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MuiAlert from "@mui/material/Alert";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState("");
    const registerPageReducer = useSelector(
        (state) => state.registerPageReducer
    );
    const { loading } = registerPageReducer;
    const dispatch = useDispatch();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(register({ username, password }));
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        } else {
            dispatch(resetPage());
            setOpenSnackBar(true);
            setFormError("Password and Confirm password is not matching");
        }
    };
    useEffect(() => {
        if (registerPageReducer.username || registerPageReducer.error) {
            setOpenSnackBar(true);
        }
    }, [registerPageReducer]);
    const handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackBar(false);
        formError("");
        dispatch(resetPage());
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="login-container"
        >
            <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Paper elevation={3} className="login-paper">
                    <form onSubmit={handleSubmit}>
                        <Grid container justifyContent="center" spacing={3}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    gutterBottom
                                    align="center"
                                >
                                    Register
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-select-currency"
                                    label="Username"
                                    value={username}
                                    name="username"
                                    onChange={handleUsernameChange}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-select-currency"
                                    label="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    type="password"
                                    name="password"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-select-currency"
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    type="password"
                                    name="confirm_password"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {loading ? (
                                    <LoadingButton
                                        fullWidth
                                        variant="contained"
                                        loading
                                    >
                                        Register
                                    </LoadingButton>
                                ) : (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleSubmit}
                                        disabled={
                                            !username ||
                                            !password ||
                                            !confirmPassword ||
                                            loading
                                        }
                                        type="submit"
                                    >
                                        Register
                                    </Button>
                                )}
                            </Grid>
                            <Grid container item justifyContent={"flex-end"}>
                                <Link to="/login">
                                    Already have an account?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={handleSnackBarClose}
            >
                {registerPageReducer.username ? (
                    <Alert severity="success">{`New user: ${registerPageReducer.username} created`}</Alert>
                ) : registerPageReducer.error ? (
                    <Alert severity="error">{registerPageReducer.error}</Alert>
                ) : (
                    <Alert severity="error">{formError}</Alert>
                )}
            </Snackbar>
        </Grid>
    );
}
