import 'react';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import Enzyme from 'enzyme';
import 'regenerator-runtime/runtime'

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({adapter: new Adapter()});
