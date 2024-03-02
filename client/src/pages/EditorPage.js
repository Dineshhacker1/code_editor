import React, { useState, useRef, useEffect } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor'
import { language, cmtheme } from '../../src/atoms';
import { useRecoilState } from 'recoil';
import ACTIONS from '../Actions';
import { initSocket } from '../socket';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../redux/actions';
import axios from 'axios';
import { getTokenSelector } from '../redux/reducers/LoginReducer';
import { getChatSelector } from '../redux/reducers/ChatReducer';
import moment from 'moment/moment';
import { ENDPOINT } from '../Constants';

const EditorPage = () => {
    const dispatch = useDispatch();
    const token = useSelector(getTokenSelector);
    const chatData = useSelector(getChatSelector);
    const [commitMessage, setCommitMessage] = useState("")
    const [openChat, setOpenChat] = useState(false)
    const [chatMessage, setChatMessage] = useState("")
    const [lang, setLang] = useRecoilState(language);
    const [them, setThem] = useRecoilState(cmtheme);
    const [clients, setClients] = useState([]);

    const socketRef = useRef(null);
    const chatRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const chatFilter = chatData.filter(o => o.roomId == roomId);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };
        axios.get(`${ENDPOINT}/api/users/version/list`, {
            headers
        })
            .then(res => {
                if (res.status === 201 || res.status === 200) {
                    console.log(res, 'ress')
                }
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [chatData]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };
        axios.get(`${ENDPOINT}/api/users/chat/list?roomId=${roomId}`, {
            headers
        })
            .then(res => {
                if (res.status === 201 || res.status === 200) {
                    dispatch(Actions.chatGroupSuccessAction(res.data.chatData))
                }
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );
            socketRef.current.on(
                ACTIONS.CHAT,
                ({ roomId, data }) => {
                    dispatch(Actions.chatSuccessAction(data))
                }
            );
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
            socketRef.current.disconnect();
        };
    }, []);

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    const getDateTime = (createdDate) => {
        let dateTime = '';
        if (
            moment(moment().format('YYYY-MM-DD')).isSame(
                moment(createdDate).format('YYYY-MM-DD'),
            )
        ) {
            dateTime = moment(createdDate).format('hh:mm a');
        } else if (
            moment(moment().subtract(1, 'day').format('YYYY-MM-DD')).isSame(
                moment(createdDate).format('YYYY-MM-DD'),
            )
        ) {
            dateTime = "Yesterday";
        } else {

            dateTime = moment(createdDate).format('MM/DD/YYYY');
        }
        return dateTime;
    };


    async function copyRoomId() {
        reactNavigator("/history", {
            state: {
                roomId
            }
        })
    }

    function leaveRoom() {
        reactNavigator('/home');
    }


    if (!location.state) {
        return <Navigate to="/home" />;
    }

    const handleCommit = (message) => {
        if (!commitMessage) {
            toast.error("Please enter commit message")
            return
        }
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };
        axios.post(`${ENDPOINT}/api/users/create/version`, {
            roomId: roomId,
            message: commitMessage,
            newCode: codeRef.current
        }, { headers })
            .then(res => {
                if (res.status === 201 || res.status === 200) {
                    toast.success(res?.data?.message)
                    setCommitMessage("")
                }
            })
            .catch(err => console.log(err))
    };

    const handleClick = () => {
        setChatMessage("")
        const data = {
            name: location.state.username,
            message: chatMessage,
        }
        socketRef.current.emit(ACTIONS.CHAT, {
            roomId,
            data
        });
    }

    return (
        <div className="mainWrap">
            {!openChat ? <div className="aside">
                <div className="asideInner">
                    <div className="commit-form">
                        <textarea
                            className="text-area"
                            placeholder="Enter your commit message..."
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                        />
                        <button className="commit-button" onClick={handleCommit}>
                            Commit Changes
                        </button>
                    </div>
                    <h3 style={{ marginBottom: "10px" }}>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>


                <label>
                    Select Language:
                    <select value={lang} onChange={(e) => { setLang(e.target.value); window.location.reload(); }} className="seLang">
                        <option value="clike">C / C++ / C#</option>
                        <option value="css">CSS</option>
                        <option value="dart">Dart</option>
                        <option value="django">Django</option>
                        <option value="dockerfile">Dockerfile</option>
                        <option value="go">Go</option>
                        <option value="htmlmixed">HTML-mixed</option>
                        <option value="javascript">JavaScript</option>
                        <option value="jsx">JSX</option>
                        <option value="markdown">Markdown</option>
                        <option value="php">PHP</option>
                        <option value="python">Python</option>
                        <option value="r">R</option>
                        <option value="rust">Rust</option>
                        <option value="ruby">Ruby</option>
                        <option value="sass">Sass</option>
                        <option value="shell">Shell</option>
                        <option value="sql">SQL</option>
                        <option value="swift">Swift</option>
                        <option value="xml">XML</option>
                        <option value="yaml">yaml</option>
                    </select>
                </label>
                <button className="btn btn-secondary" onClick={copyRoomId}>
                    Version History
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>
                <div class="Message">
                    <input title="Write Message" onFocus={() => setOpenChat(true)} tabindex="i" pattern="\d+" placeholder="Chat..." class="MsgInput" type="text" />
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClick} version="1.0" width="30.000000pt" height="30.000000pt" viewBox="0 0 30.000000 30.000000" preserveAspectRatio="xMidYMid meet" class="SendSVG">
                        <g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)" fill="#ffffff70" stroke="none">
                            <path d="M44 256 c-3 -8 -4 -29 -2 -48 3 -31 5 -33 56 -42 28 -5 52 -13 52 -16 0 -3 -24 -11 -52 -16 -52 -9 -53 -9 -56 -48 -2 -21 1 -43 6 -48 10 -10 232 97 232 112 0 7 -211 120 -224 120 -4 0 -9 -6 -12 -14z"></path>
                        </g>
                    </svg><span class="l"></span>

                </div>
            </div>
                :
                <div className="container">
                    <div className='text-end'>
                        <p style={{ color: 'white', cursor: "pointer" }} onClick={() => setOpenChat(false)}>Close</p>
                    </div>
                    <div className="chat-window border chat-history" ref={chatRef}>
                        {chatFilter.map((msg, index) => (
                            <ul className="clearfix">
                                <li className={`${msg.name === location.state.username ? 'sender' : 'receiver'}`}>
                                    <strong><p style={{ fontSize: "17px" }}>{msg.name}</p></strong>
                                    <p style={{ wordWrap: "break-word" }}>{msg.message}</p>
                                    <span className="time">
                                        {getDateTime(msg?.createdAt)}
                                    </span>
                                </li>
                            </ul>
                        ))}
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Chat..."
                            style={{ height: "45px" }}
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={handleClick}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="editorWrap">
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
            </div>
        </div>
    );
}

export default EditorPage;