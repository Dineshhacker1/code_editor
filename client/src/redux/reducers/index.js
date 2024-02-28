import { combineReducers } from 'redux';
import LoginReducer from "./LoginReducer";

const appReducer = () => combineReducers({
    LOGIN_CREDS: LoginReducer,
})

const rootReducer = () => (state, action) => {
    return appReducer()(state, action)
}


export default rootReducer;