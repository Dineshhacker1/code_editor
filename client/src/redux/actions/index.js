import * as loginActions from './LoginAction';
import * as chatActions from './ChatAction';

const Actions = {
    ...loginActions,
    ...chatActions
}
export default Actions;

export const doAction = (type, params = {}, callback) => ({ type, params, callback });
export const doResponseAction = (type, data = {}) => ({ type, data });