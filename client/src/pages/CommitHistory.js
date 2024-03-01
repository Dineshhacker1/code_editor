import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTokenSelector } from '../redux/reducers/LoginReducer';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CommitHistory = () => {
  const token = useSelector(getTokenSelector);
  const [versionHistory, setVersionHistory] = useState([])
  const navigate = useNavigate()
  const [commits, setCommits] = useState([
    { id: 1, message: 'Initial commit', author: 'John Doe', timestamp: '2 days ago' },
    { id: 2, message: 'Fix bug #123', author: 'Jane Smith', timestamp: '1 day ago' },
    // Add more commits as needed
  ]);

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

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    axios.get("http://localhost:5000/api/users/version/list", {
      headers
    })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          console.log(res, 'ress')
          setVersionHistory(res?.data?.history)
          // toast.success(res?.data?.message)
          // setCommitMessage("")
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleRevert = (commitId) => {
    // Implement revert logic here
    console.log(`Reverting commit with id ${commitId}`);
  };

  return (
    <div className="commit-history">
      {/* <h1>Commit History</h1> */}
      <div className="timeline-container">
        {
          versionHistory.map((commit) => (
            <div className="timeline-item" style={{ cursor: "pointer" }} onClick={() => navigate("/history/data",{
              state: {
                code: commit?.content
            },
            })}>
              <div className="timeline-item-content">
                {/* <span className="tag" >
              {data.category.tag}
            </span> */}
                <time>{getDateTime(commit?.createdAt)}</time>
                <p>#{commit?.message}</p>
                <span><img src={require("../asset/img/git_symbol.png")} style={{ width: "25px" }} />{commit?.version.slice(0, 8)}</span>
                <span className="circle" />
              </div>
            </div>
          ))
        }

      </div>
    </div>

  );
};

export default CommitHistory;
