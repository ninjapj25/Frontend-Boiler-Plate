import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { login, resetPage } from "../../actions/LoginPage";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AuthHelper from "../../helpers/auth";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const loginPageReducer = useSelector((state) => state.loginPageReducer);
    const { loading, error } = loginPageReducer;
    const dispatch = useDispatch();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };
    const handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackBar(false);
        dispatch(resetPage());
    };
    useEffect(() => {
        if (error) {
            setOpenSnackBar(true);
        }
    }, [error]);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    if (AuthHelper.isAuthenticated()) {
        window.location.href = "/home";
    }
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="login-container"
        >
            <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Paper elevation={3} className="login-paper">
                    <form>
                        <Grid container justifyContent="center" spacing={3}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    gutterBottom
                                    align="center"
                                >
                                    Login
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
                                {loading ? (
                                    <LoadingButton
                                        fullWidth
                                        variant="contained"
                                        loading
                                    >
                                        Login
                                    </LoadingButton>
                                ) : (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleSubmit}
                                        type="submit"
                                        disabled={
                                            !username || !password || loading
                                        }
                                    >
                                        Login
                                    </Button>
                                )}
                            </Grid>
                            <Grid item container justifyContent={"flex-end"}>
                                <Link to="/register">Create an account?</Link>
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
                {error && <Alert severity="error">{error.error}</Alert>}
            </Snackbar>
        </Grid>
    );
}
