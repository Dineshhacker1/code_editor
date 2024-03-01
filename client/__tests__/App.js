import React from 'react';
import App from '../src/App'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
 
configure({ adapter: new Adapter() })
 
jest.mock('redux-persist-transform-encrypt', () => ({
  encryptTransform: jest.fn()
}))
 

jest.mock('../src/App.css', () => jest.fn());
jest.mock('codemirror/lib/codemirror.css', () => jest.fn());
jest.mock('codemirror/theme/3024-day.css', () => jest.fn());
jest.mock('codemirror/theme/3024-night.css', () => jest.fn());
jest.mock('codemirror/theme/abbott.css', () => jest.fn());
jest.mock('codemirror/theme/abcdef.css', () => jest.fn());
jest.mock('codemirror/theme/ambiance.css', () => jest.fn());
jest.mock('codemirror/theme/ayu-dark.css', () => jest.fn());
jest.mock('codemirror/theme/ayu-mirage.css', () => jest.fn());
jest.mock('codemirror/theme/base16-dark.css', () => jest.fn());
jest.mock('codemirror/theme/bespin.css', () => jest.fn());
jest.mock('codemirror/theme/blackboard.css', () => jest.fn());
jest.mock('codemirror/theme/cobalt.css', () => jest.fn());
jest.mock('codemirror/theme/colorforth.css', () => jest.fn());
 
describe('App rendering', () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(
      <App
      />,
    )
  });
  it('renders correctly', () => {
    
  });
});