import React, { useState } from "react";
import "./commentBar.css";
import {addcomment, getcomment} from '../../actions/comments'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CommentBar() {
  const [comment, setComment] = useState('');

  // const [input, setInput] = useState("");
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate()
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

      <div className="comment-feed">
        {fetchedComments?.map((item, index) => (
          <div className="comment-item" key={index}>
            <div className="avatar" style={{'--avatar-color': `hsl(${Math.random() * 360}, 70%, 60%)`}}>
              {item?.userId?.name.charAt(0).toUpperCase()}
            </div>
            <div className="comment-content">
              <div className="comment-name">{item?.userId?.name}</div>
              <div className="comment-text">{item?.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
