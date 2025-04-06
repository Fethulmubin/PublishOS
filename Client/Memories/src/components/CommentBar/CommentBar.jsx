import React from "react";
import "./commentBar.css"; // Make sure this is linked

export default function CommentBar() {
  return (
    <div className="comment-wrapper">
      <input type="text" placeholder="Comment" className="comment-input" />
      <div className="button-row">
          <button className="submit-btn">↑</button>
      </div>
    </div>
  );
}
