import Actions from '../actions';

const initialState = {
    isLoading: false,
    token: null,
}

const LoginReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case Actions.LOGIN: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action?.data?.access_token
            };
        }
        case Actions.LOGIN_FAILURE: {
            return {
                ...state,
                isLoading: false,
                token: null,
            };
        }
        case Actions.LOGOUT: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case Actions.LOGOUT_SUCCESS: {
            localStorage.clear()
            return {
                ...initialState,
            };
        }
        case Actions.LOGOUT_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        }
        default:
            return state;
    }
};


export default LoginReducer;

export const getTokenSelector = state => state?.LOGIN_CREDS?.token;
