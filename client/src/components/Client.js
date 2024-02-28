import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ username }) => {
    return (
        <div className="client" style={{position:"relative"}}>
            <div
                style={{
                    width: '12px',
                    height: '12px',
                    background: 'green',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    border: '2px solid #ffffff',
                }}
            />
            <Avatar name={username} size={50} round="14px" />
            <span className="userName">{username}</span>
            
        </div>
    );
};

export default Client;