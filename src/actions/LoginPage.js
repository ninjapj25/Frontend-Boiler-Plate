import * as ActionTypes from "../constants/ActionTypes";
import API from "../helpers/api";

export function login({ username, password, query }) {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.LOGIN_REQUEST,
        });
        const response = await API.login.login(username, password);
        const { error } = response;
        if (!error) {
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: {
                    username: response.username,
                },
            });
            localStorage.setItem(
                "user",
                JSON.stringify({
                    token: response.token,
                    username: response.username,
                    last_login: response.last_login,
                })
            );
            // Navigate to next page
            window.location.href = "/home";
        } else {
            dispatch({
                type: ActionTypes.LOGIN_ERROR,
                payload: {
                    error: response.error,
                },
            });
        }
    };
}

export function resetPage() {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.RESET_LOGIN_PAGE,
        });
    };
}
