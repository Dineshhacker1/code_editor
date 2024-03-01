import React from 'react';
import EditorPage from '../src/pages/EditorPage'
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

// jest.mock('../src/App.css', () => jest.fn());
jest.mock('codemirror/lib/codemirror.css', () => jest.fn());
jest.mock('codemirror/theme/3024-day.css', () => jest.fn());
// jest.mock('codemirror/theme/3024-night.css', () => jest.fn());
// jest.mock('codemirror/theme/abbott.css', () => jest.fn());
// jest.mock('codemirror/theme/abcdef.css', () => jest.fn());
// jest.mock('codemirror/theme/ambiance.css', () => jest.fn());
// jest.mock('codemirror/theme/ayu-dark.css', () => jest.fn());
// jest.mock('codemirror/theme/ayu-mirage.css', () => jest.fn());
// jest.mock('codemirror/theme/base16-dark.css', () => jest.fn());
// jest.mock('codemirror/theme/bespin.css', () => jest.fn());
// jest.mock('codemirror/theme/blackboard.css', () => jest.fn());
// jest.mock('codemirror/theme/cobalt.css', () => jest.fn());
// jest.mock('codemirror/theme/colorforth.css', () => jest.fn());
// jest.mock('codemirror/theme/darcula.css',()=> jest.fn());
// jest.mock('codemirror/theme/dracula.css',()=> jest.fn());
// jest.mock('codemirror/theme/duotone-dark.css',()=> jest.fn());
// jest.mock('codemirror/theme/duotone-light.css',()=> jest.fn());
// jest.mock('codemirror/theme/eclipse.css',()=> jest.fn());
// jest.mock('codemirror/theme/elegant.css',()=> jest.fn());
// jest.mock('codemirror/theme/erlang-dark.css',()=> jest.fn());
// jest.mock('codemirror/theme/gruvbox-dark.css',()=> jest.fn());
// jest.mock('codemirror/theme/hopscotch.css',()=> jest.fn());
// jest.mock('codemirror/theme/icecoder.css',()=> jest.fn());
// jest.mock('codemirror/theme/idea.css',()=> jest.fn());
// jest.mock('codemirror/theme/isotope.css',()=> jest.fn());
// jest.mock('codemirror/theme/juejin.css',()=> jest.fn());
// jest.mock('codemirror/theme/lesser-dark.css',()=> jest.fn());
// jest.mock('codemirror/theme/liquibyte.css',()=> jest.fn());
// jest.mock('codemirror/theme/lucario.css',()=> jest.fn());
// jest.mock('codemirror/theme/material.css',()=> jest.fn());
// jest.mock('codemirror/theme/material-darker.css',()=> jest.fn());
// jest.mock('codemirror/theme/material-palenight.css',()=> jest.fn());
// jest.mock('codemirror/theme/material-ocean.css',()=> jest.fn());
// jest.mock('codemirror/theme/mbo.css',()=> jest.fn());
// jest.mock('codemirror/theme/mdn-like.css',()=> jest.fn());
// jest.mock('codemirror/theme/midnight.css',()=> jest.fn());
// jest.mock('codemirror/theme/monokai.css',()=> jest.fn());
// jest.mock('codemirror/theme/moxer.css',()=> jest.fn());
// jest.mock('codemirror/theme/neat.css',()=> jest.fn());
// jest.mock('codemirror/theme/neo.css',()=> jest.fn());
// jest.mock('codemirror/theme/night.css',()=> jest.fn());
// jest.mock('codemirror/theme/nord.css',()=> jest.fn());
// jest.mock('codemirror/theme/oceanic-next.css',()=> jest.fn());
// jest.mock('codemirror/theme/panda-syntax.css',()=> jest.fn());
// jest.mock('codemirror/theme/paraiso-dark.css',()=> jest.fn());
// jest.mock('codemirror/theme/paraiso-light.css',()=> jest.fn());
// jest.mock('codemirror/theme/pastel-on-dark.css',()=> jest.fn());
// jest.mock('codemirror/theme/railscasts.css',()=> jest.fn());
// jest.mock('codemirror/theme/rubyblue.css',()=> jest.fn());
// jest.mock('codemirror/theme/seti.css',()=> jest.fn());
// jest.mock('codemirror/theme/shadowfox.css',()=> jest.fn());
// jest.mock('codemirror/theme/solarized.css',()=> jest.fn());
// jest.mock('codemirror/theme/the-matrix.css',()=> jest.fn());
// jest.mock('codemirror/theme/tomorrow-night-bright.css',()=> jest.fn());
// jest.mock('codemirror/theme/tomorrow-night-eighties.css',()=> jest.fn());
// jest.mock('codemirror/theme/ttcn.css',()=> jest.fn());
// jest.mock('codemirror/theme/twilight.css',()=> jest.fn());
// jest.mock('codemirror/theme/vibrant-ink.css',()=> jest.fn());
// jest.mock('codemirror/theme/xq-dark.css',()=> jest.fn());
// jest.mock('codemirror/theme/xq-light.css',()=> jest.fn());
// jest.mock('codemirror/theme/yeti.css',()=> jest.fn());
// jest.mock('codemirror/theme/yonce.css',()=> jest.fn());
// jest.mock('codemirror/theme/zenburn.css',()=> jest.fn());

// jest.mock('codemirror/mode/clike/clike',()=>jest.fn());
// jest.mock('codemirror/mode/css/css',()=>jest.fn());
// jest.mock('codemirror/mode/dart/dart',()=>jest.fn());
// jest.mock('codemirror/mode/django/django',()=>jest.fn());
// jest.mock('codemirror/mode/dockerfile/dockerfile',()=>jest.fn());
// jest.mock('codemirror/mode/go/go',()=>jest.fn());
// jest.mock('codemirror/mode/htmlmixed/htmlmixed',()=>jest.fn());
// jest.mock('codemirror/mode/javascript/javascript',()=>jest.fn());
// jest.mock('codemirror/mode/jsx/jsx',()=>jest.fn());
// jest.mock('codemirror/mode/markdown/markdown',()=>jest.fn());
// jest.mock('codemirror/mode/php/php',()=>jest.fn());
// jest.mock('codemirror/mode/python/python',()=>jest.fn());
// jest.mock('codemirror/mode/r/r',()=>jest.fn());
// jest.mock('codemirror/mode/rust/rust',()=>jest.fn());
// jest.mock('codemirror/mode/ruby/ruby',()=>jest.fn());
// jest.mock('codemirror/mode/sass/sass',()=>jest.fn());
// jest.mock('codemirror/mode/shell/shell',()=>jest.fn());
// jest.mock('codemirror/mode/sql/sql',()=>jest.fn());
// jest.mock('codemirror/mode/swift/swift',()=>jest.fn());
// jest.mock('codemirror/mode/xml/xml',()=>jest.fn());
// jest.mock('codemirror/mode/yaml/yaml',()=>jest.fn());
// jest.mock('codemirror/addon/edit/closetag',()=>jest.fn());
// jest.mock('codemirror/addon/edit/closebrackets',()=>jest.fn());
// jest.mock('codemirror/addon/scroll/simplescrollbars.css',()=>jest.fn());
// jest.mock('codemirror/addon/search/search.js',()=>jest.fn());
// jest.mock('codemirror/addon/search/searchcursor.js',()=>jest.fn());
// jest.mock('codemirror/addon/search/jump-to-line.js',()=>jest.fn());
// jest.mock('codemirror/addon/dialog/dialog.js',()=>jest.fn());
// jest.mock('codemirror/addon/dialog/dialog.css',()=>jest.fn());

describe('EditorPage rendering', () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(
      <EditorPage
      />,
    )
  });
  it('renders correctly', () => {
    
  });
});