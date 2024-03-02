import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTokenSelector } from '../redux/reducers/LoginReducer';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../Constants';

const CommitHistory = () => {
  const token = useSelector(getTokenSelector);
  const [versionHistory, setVersionHistory] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

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
    axios.get(`${ENDPOINT}/api/users/version/list`, {
      headers
    })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          let result = res?.data?.history.filter(o => o?.roomId == location?.state?.roomId)
          setVersionHistory(result)
        }
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <>
      {
        Array?.isArray(versionHistory) && versionHistory?.length > 0 ?
        <div className="commit-history">
          <div className="timeline-container">
            {
              versionHistory.map((commit) => (
                <div className="timeline-item" style={{ cursor: "pointer" }} onClick={() => navigate("/history/data", {
                  state: {
                    code: commit?.content
                  },
                })}>
                  <div className="timeline-item-content">
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
        :
        <p style={{color:"white",textAlign:"center",marginTop:"40vh"}}>No data found</p>
      }
    </>
  );
};

export default CommitHistory;
