import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getTokenSelector } from '../redux/reducers/LoginReducer';
// import moment from 'moment';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; // You can choose a different theme
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
