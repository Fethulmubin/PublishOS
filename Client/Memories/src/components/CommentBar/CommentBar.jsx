import React, { useState } from "react";
import "./commentBar.css";
import {addcomment} from '../../actions/comments'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CommentBar() {
  const [comment, setComment] = useState('');

  // const [input, setInput] = useState("");
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate()
const commen = useSelector((state) => state.comment)

  console.log(commen)

  const handleAddComment = () => {
    if (comment.trim()) {
      dispatch(addcomment(searchParams.get('id'), comment));
      setComment(""); // clear field
    } else {
      console.log("Input was empty, not submitting");
    }
  };
  // console.log(input);

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

      {/* <div className="comment-feed">
        {comments.map((c) => (
          <div className="comment-item" key={c.id}>
            <div className="avatar">{c.avatar}</div>
            <div className="comment-content">
              <div className="comment-name">{c.name}</div>
              <div className="comment-text">{c.comment}</div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
