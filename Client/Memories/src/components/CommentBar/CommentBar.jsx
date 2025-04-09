import React, { useState, useEffect } from "react";
import "./commentBar.css";
import {addcomment, getcomment} from '../../actions/comments'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function CommentBar() {
  const [comment, setComment] = useState('');


  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
const comments = useSelector((state) => state.comment)

  console.log(comments)

  const handleAddComment = () => {
    if (comment.trim()) {
      dispatch(addcomment(searchParams.get('id'), comment));
      setComment(""); // clear field
    } else {
      console.log("Input was empty, not submitting");
    }
  };
  const fetchComments = () =>{
    dispatch(getcomment(searchParams.get('id')))
    // console.log(comments.comments)
  }
  
  fetchComments()
  const fetchedComments = comments.comments
  console.log(fetchedComments);

  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7',
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39',
      '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <div className="comment-wrapper">
      <input
        type="text"
        placeholder="Write a comment..."
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="button-row">
        <button className="submit-btn" onClick={handleAddComment}>
          ↑
        </button>
      </div>
      {fetchedComments?.length === 0 ? (
        <div className="no-comments">
          <ChatBubbleOutlineIcon style={{ color: '#74a1e8', fontSize: '50px' }} />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="comment-feed">
          {fetchedComments?.map((item, index) => (
            <div className="comment-item" key={index}>
              <div className="avatar" style={{ backgroundColor: bgColor }}>
                {item?.userId?.name.charAt(0).toUpperCase()}
              </div>
              <div className="comment-content">
                <div className="comment-name">{item?.userId?.name}</div>
                <div className="comment-text">{item?.comment}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
