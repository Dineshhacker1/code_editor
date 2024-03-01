import { doAction, doResponseAction } from ".";

const CHAT = 'CHAT';
const CHAT_SUCCESS = 'CHAT_SUCCESS';
const CHAT_GROUP_SUCCESS = 'CHAT_GROUP_SUCCESS';
const CHAT_FAILURE = 'LOGIN_FAILURE';

export {
    CHAT,
    CHAT_FAILURE,
    CHAT_SUCCESS,
    CHAT_GROUP_SUCCESS
}

// LOGIN
// export const chatAction = (params, callback) => doAction(LOGIN, params, callback);
export const chatSuccessAction = data => doResponseAction(CHAT_SUCCESS, data);
export const chatGroupSuccessAction = data => doResponseAction(CHAT_GROUP_SUCCESS, data);
export const chatFailureAction = data => doResponseAction(CHAT_FAILURE, data);



