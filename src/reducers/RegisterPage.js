import * as ActionTypes from "../constants/ActionTypes";

const initialState = {
    loading: false,
    username: "",
    password: "",
    error: "",
};

export default function registerPageReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.REGISTER_REQUEST:
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case ActionTypes.REGISTER_ERROR:
            return {
                ...initialState,
                error: action.payload.error,
            };
        case ActionTypes.RESET_REGISTER_PAGE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
