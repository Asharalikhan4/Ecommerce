import authReducer from "./auth.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;