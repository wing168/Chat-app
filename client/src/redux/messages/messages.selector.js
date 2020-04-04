import { createSelector } from 'reselect';

const messagesSelector = state => state.messages;

export const setMessagesSelector = createSelector(
    [messagesSelector],
    messages => messages.storedMessages
);