import React, { useEffect, useRef, useState } from 'react';
import { language, cmtheme } from '../../src/atoms';
import { useRecoilValue } from 'recoil';
import ACTIONS from '../Actions';

// CODE MIRROR
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

// theme
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abbott.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/juejin.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/material-palenight.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/moxer.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/night.css';
import 'codemirror/theme/nord.css';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/paraiso-dark.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/shadowfox.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/yonce.css';
import 'codemirror/theme/zenburn.css';

// modes
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/dart/dart';
import 'codemirror/mode/django/django';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/go/go';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/r/r';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/yaml/yaml';

// features
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/scroll/simplescrollbars.css';

//search
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
// import { useLint } from '../containers/Eslint';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const [lintResult, setLintResult] = useState(null);
    const editorRef = useRef(null);
    const lang = useRecoilValue(language);
    const editorTheme = useRecoilValue(cmtheme);

    // useEffect(() => {
    //     // Trigger linting when the component mounts or code changes
    //     const codeToLint = '// Your code to be linted'; // Replace with actual code
    //     useLint(codeToLint, setLintResult);
    // }, [codeToLint]);

    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: lang },
                    theme: editorTheme,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('cursorActivity', (instance, changes) => {
                const cursorPosition = editorRef.current.getCursor();
                console.log(cursorPosition, 'codeeee')
            });

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });

        }
        init();
    }, [lang]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
            // socketRef.current.on(ACTIONS.CURSOR_POSITION, ({ userId, cursorPos }) => {
            //     console.log(socketRef.current.id,"iddd")
            //     console.log(userId,"userId")
            //     if (userId !== socketRef.current.id) {
            //         updateCursor(userId, cursorPos);
            //     }
            // });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
            // socketRef.current.off(ACTIONS.CURSOR_POSITION);
        };
    }, [socketRef.current]);

    const updateCursor = (userId, cursorPos) => {
        const cursorElement = createOrUpdateCursorElement(userId);
        const coords = editorRef.current.cursorCoords(cursorPos, 'local');
        cursorElement.style.left = coords.left + 'px';
        cursorElement.style.top = coords.bottom + 'px';
    };

    const createOrUpdateCursorElement = (userId) => {
        let cursorElement = document.getElementById(`cursor-${userId}`);
        if (!cursorElement) {
            cursorElement = document.createElement('div');
            cursorElement.id = `cursor-${userId}`;
            cursorElement.className = 'cursor';
            document.body.appendChild(cursorElement);
        }
        return cursorElement;
    };

    return (
        <textarea id="realtimeEditor">
            {/* {lintResult && (
                <pre>{JSON.stringify(lintResult, null, 2)}</pre>
            )} */}
        </textarea>
    );
};

export default Editor;