import * as ActionTypes from "../constants/ActionTypes";
import API from "../helpers/api";

export function register({ username, password }) {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.REGISTER_REQUEST,
            payload: {
                loading: true,
            },
        });
        const response = await API.register.register(username, password);
        const { error } = response;
        if (error) {
            dispatch({
                type: ActionTypes.REGISTER_ERROR,
                payload: {
                    loading: false,
                    error,
                },
            });
        } else {
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS,
                payload: {
                    loading: false,
                    username: response.username,
                },
            });
        }
    };
}

export function resetPage() {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.RESET_REGISTER_PAGE,
        });
    };
}
