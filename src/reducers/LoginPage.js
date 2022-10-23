import * as ActionTypes from "../constants/ActionTypes";

const initialState = {
    loading: false,
    username: "",
    password: "",
    error: "",
};

export default function loginPageReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                loading: true,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                loading: false,
                username: action.payload,
            };
        case ActionTypes.LOGIN_ERROR:
            return {
                loading: false,
                error: action.payload,
            };
        case ActionTypes.RESET_LOGIN_PAGE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
