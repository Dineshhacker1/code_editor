import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { useLocation } from 'react-router-dom';

const CommitData = (props) => {
    const location = useLocation();
    return (
        <div>
            <CodeMirror
                value={location.state.code}
            />
        </div>
    );
};

export default CommitData;
