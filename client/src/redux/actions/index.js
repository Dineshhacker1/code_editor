import * as loginActions from './LoginAction';

const Actions = {
    ...loginActions,
}
export default Actions;

export const doAction = (type, params = {}, callback) => ({ type, params, callback });
export const doResponseAction = (type, data = {}) => ({ type, data });