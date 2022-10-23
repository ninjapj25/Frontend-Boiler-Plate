import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/LogoutPage";

export default function HomePage() {
    const dispatch = useDispatch();
    return (
        <Grid justifyContent="center" container>
            <Grid xs={8} item container justifyContent={"space-between"}>
                <Typography> Home </Typography>
                <Button variant="contained" onClick={() => dispatch(logout())}>
                    {" "}
                    Logout{" "}
                </Button>
            </Grid>
        </Grid>
    );
}
