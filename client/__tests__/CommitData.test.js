import React from 'react';
import CommitData from '../src/pages/CommitData'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() })
jest.mock('react-router-dom', () => ({
    useNavigate: () => () => { },
    withRouter: () => () => { },
    useLocation: () =>  ({ state: { code: "" } }) ,
}))
jest.mock('react-redux', () => ({
    useSelector: () => {
        currentScreen: 'login'
    },
    useDispatch: () => () => { },
    connect: () => () => { },
    useCallback: () => () => { },
    useImperativeHandle: () => () => { },
}));
jest.mock('redux-persist-transform-encrypt', () => ({
    encryptTransform: jest.fn()
}))


jest.mock('../src/App.css', () => jest.fn());
jest.mock('codemirror/lib/codemirror.css', () => jest.fn());
jest.mock('codemirror/theme/material.css', () => jest.fn());
jest.mock('codemirror/mode/javascript/javascript', () => jest.fn());

describe('CommitData rendering', () => {
    let shallowComponent;
    beforeEach(() => {
        shallowComponent = shallow(
            <CommitData
            />,
        )
    });
    it('renders correctly', () => {

    });
});