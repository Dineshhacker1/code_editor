import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNameSelector } from '../redux/reducers/LoginReducer';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const userNameSelector = useSelector(getUserNameSelector) 

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        navigate(`/editor/${id}`, {
            state: {
                username,
            },
        });
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !userNameSelector) {
            toast.error('ROOM ID & username is required');
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: {
                username : userNameSelector,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    const logout=()=>{
        localStorage.clear()
        navigate("/login")
    }
    
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px"}}>
                  <h1>Code Editor</h1>
                </div>
                <div className="inputGroup">
                    <input
                        id="input1"
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span onClick={logout} style={{cursor:"pointer"}}>
                        Logout
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Home;