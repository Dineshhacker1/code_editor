import React from 'react';
import LoginScreen from '../src/pages/LoginScreen'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
 
configure({ adapter: new Adapter() })
jest.mock('react-router-dom', () => ({
    useNavigate:()=> () =>{},
    withRouter: () => () => { },
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

describe('LoginScreen rendering', () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(
      <LoginScreen
      />,
    )
  });
  it('renders correctly', () => {
    
  });
  it("checks cancel", async () => {
    const login = await shallowComponent.find('#submit').props()
    login.onClick({preventDefault: jest.fn()})
})
});