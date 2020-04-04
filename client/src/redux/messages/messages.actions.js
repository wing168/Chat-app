import { messagesActionType } from './messages.types';

export const setMessages = messages => ({
    type: messagesActionType.SET_MESSAGES,
    payload: messages
});