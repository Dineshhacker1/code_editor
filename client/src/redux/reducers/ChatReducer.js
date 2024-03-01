import Actions from '../actions';

const initialState = {
    isLoading: false,
    data: [],
}

const ChatReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case Actions.CHAT: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.CHAT_SUCCESS: {
            let a = [...state.data, action.data]
            return {
                ...state,
                isLoading: false,
                data: a
            };
        }
        case Actions.CHAT_GROUP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        }
        case Actions.CHAT_FAILURE: {
            return {
                ...state,
                isLoading: false,
                token: null,
            };
        }
        default:
            return state;
    }
};


export default ChatReducer;

export const getChatSelector = state => state?.CHAT?.data;
