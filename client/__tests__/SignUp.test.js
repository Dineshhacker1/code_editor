import React from 'react';
import SignUp from '../src/pages/SignUp'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
 
configure({ adapter: new Adapter() })
jest.mock('react-router-dom', () => ({
    useNavigate:()=> () =>{},
    withRouter: () => () => { },
}))
jest.mock('react-redux', () => ({
    useDispatch: () => () => { },
    connect: () => () => { },
    useCallback: () => () => { },
    useImperativeHandle: () => () => { },
}));
jest.mock('redux-persist-transform-encrypt', () => ({
  encryptTransform: jest.fn()
}))
 

jest.mock('../src/App.css', () => jest.fn());

describe('SignUp rendering', () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(
      <SignUp
      />,
    )
  });
  it('renders correctly', () => {
    
  });
  it("checks cancel", async () => {
    const login = await shallowComponent.find('#submitSignUp').props()
    login.onClick({preventDefault: jest.fn()})
})
});