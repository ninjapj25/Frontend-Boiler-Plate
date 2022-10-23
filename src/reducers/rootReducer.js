import { combineReducers } from "redux";
import loginPageReducer from "./LoginPage";
import registerPageReducer from "./RegisterPage";

const rootReducer = combineReducers({
    loginPageReducer,
    registerPageReducer,
});

export default rootReducer;
