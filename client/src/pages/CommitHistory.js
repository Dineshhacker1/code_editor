import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTokenSelector } from '../redux/reducers/LoginReducer';

const CommitHistory = () => {
  const token = useSelector(getTokenSelector);
  const [commits, setCommits] = useState([
    { id: 1, message: 'Initial commit', author: 'John Doe', timestamp: '2 days ago' },
    { id: 2, message: 'Fix bug #123', author: 'Jane Smith', timestamp: '1 day ago' },
    // Add more commits as needed
  ]);

  useEffect(()=>{
    const headers = {
      'Content-Type': 'application/json', 
      Authorization: token, 
    };
     axios.get("http://localhost:5000/api/users/version/list",{
      headers
     })
     .then(res=>{
      if(res.status === 201 || res.status === 200){
          console.log(res,'ress')
          // toast.success(res?.data?.message)
          // setCommitMessage("")
      }
  })
  .catch(err=>console.log(err))
  },[])

  const handleRevert = (commitId) => {
    // Implement revert logic here
    console.log(`Reverting commit with id ${commitId}`);
  };

  return (
    <div className="commit-history">
      <h1>Commit History</h1>
      <ul>
        {commits.map((commit) => (
          <li key={commit.id} className="commit-item">
            <div className="commit-info">
              <div>
                <div className="commit-message">{commit.message}</div>
                <div className="commit-meta">
                  <span className="commit-author">{commit.author}</span>
                  <span className="commit-timestamp">{commit.timestamp}</span>
                </div>
              </div>
              <div className="commit-actions">
                <button onClick={() => handleRevert(commit.id)}>Revert</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default CommitHistory;
