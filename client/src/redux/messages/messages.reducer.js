import { messagesActionType } from './messages.types';

const INITIAL_STATE = {
    storedMessages: []
}

const messagesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case messagesActionType.SET_MESSAGES:
            return {
                ...state,
                storedMessages:  [...state.storedMessages, action.payload]
            }

        default:
            return state;
    }
}

export default messagesReducer;