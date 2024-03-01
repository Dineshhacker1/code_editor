import { combineReducers } from 'redux';
import LoginReducer from "./LoginReducer";
import ChatReducer from "./ChatReducer";

const appReducer = () => combineReducers({
    LOGIN_CREDS: LoginReducer,
    CHAT: ChatReducer
})

const rootReducer = () => (state, action) => {
    return appReducer()(state, action)
}


export default rootReducer;