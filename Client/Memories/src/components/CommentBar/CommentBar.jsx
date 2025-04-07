import React, { useState } from "react";
import "./commentBar.css";

export default function CommentBar() {
  const [comments, setComments] = useState([
    { id: 1, name: "Ahmed", avatar: "🧑🏽‍💻", comment: "This is awesome!" },
    { id: 2, name: "Sara", avatar: "👩🏼‍🎨", comment: "Nice post!" },
    { id: 3, name: "Ali", avatar: "👨🏻‍🔬", comment: "Interesting point." }
  ]);

  const [input, setInput] = useState("");

  const handleAddComment = () => {
    if (input.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          name: "You",
          avatar: "🧍🏽‍♂️",
          comment: input
        }
      ]);
      setInput("");
    }
  };

  return (
    <div className="comment-wrapper">
      <input
        type="text"
        placeholder="Write a comment..."
        className="comment-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="button-row">
        <button className="submit-btn" onClick={handleAddComment}>
          ↑
        </button>
      </div>

      <div className="comment-feed">
        {comments.map((c) => (
          <div className="comment-item" key={c.id}>
            <div className="avatar">{c.avatar}</div>
            <div className="comment-content">
              <div className="comment-name">{c.name}</div>
              <div className="comment-text">{c.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
