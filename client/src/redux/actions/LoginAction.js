import { doAction, doResponseAction } from ".";

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const REFRESH_TOKEN_ACTION = 'REFRESH_TOKEN_ACTION'

const UPDATE_CURRENT_SCREEN_PATH  = 'UPDATE_CURRENT_SCREEN_PATH'

const UPDATE_FORGET_EMAIL  = 'UPDATE_FORGET_EMAIL'

export {
    LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_ACTION,
    UPDATE_CURRENT_SCREEN_PATH,
    UPDATE_FORGET_EMAIL
}

// LOGIN
export const loginAction = (params, callback) => doAction(LOGIN, params, callback);
export const loginSuccessAction = data => doResponseAction(LOGIN_SUCCESS, data);
export const loginFailureAction = data => doResponseAction(LOGIN_FAILURE, data);

// LOGOUT
export const logoutAction = (callback) => doAction(LOGOUT, callback);
export const logoutSuccessAction = (data) => doResponseAction(LOGOUT_SUCCESS, data);
export const logoutFailureAction = (data) => doResponseAction(LOGOUT_FAILURE, data);


export const getRefreshToken = (params) => doAction(REFRESH_TOKEN_ACTION, params)

export const updateCurrentScreen = (data) => doResponseAction(UPDATE_CURRENT_SCREEN_PATH, data);

export const storeForgetEmail = (data) => doResponseAction(UPDATE_FORGET_EMAIL, data);

export const getForgetEmail = store => store['LOGIN_CREDS']


