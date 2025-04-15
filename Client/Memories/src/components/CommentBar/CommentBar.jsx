import React, { useState, useEffect, useRef } from "react";
import "./commentBar.css";
import { addcomment, getcomment } from '../../actions/comments'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommentLoad from "../LoadingSkeleton/CommentLoad";
import moment from "moment";



export default function CommentBar({setSearchParams}) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const comments = useSelector((state) => state.commentsReducer);
  const user = useSelector((state => state?.auth?.authData));
  const commentRef = useRef()


  useEffect(() => {
    if (searchParams.get('id')) {
      fetchComments();
    }
  }, [searchParams.get('id')]);

  const handleAddComment = () => {
    if (comment.trim()) {
      dispatch(addcomment(searchParams.get('id'), comment)).then(() => {
        fetchComments(); // Fetch updated comments after adding a new one
        setComment(""); // clear field
      });

    } else {
      console.log("Input was empty, not submitting");
    }
  };
  const fetchComments = () => {
    setLoading(true);
    dispatch(getcomment(searchParams.get('id'))).then(() =>{
      setLoading(false);
    })

  }

  const clearComments = () => ({
    type: "CLEAR_COMMENTS"
  });

  const fetchedComments = comments?.comments || []
  // console.log(fetchedComments);

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

  useEffect(() => {
    if (searchParams.get('id')) {

      dispatch(clearComments());
      fetchComments();
    }
  }, [searchParams.get('id')]);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if ( commentRef.current && !commentRef.current.contains(e.target)) {
          const postsDiv = document.getElementById('posts');
          if (postsDiv && postsDiv.contains(e.target)) {
            return; // Do nothing if clicking inside the posts div
          }
          setSearchParams({})
          // Hide the form when clicking outside
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div ref={commentRef} className="comment-wrapper">
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
        {loading ? (
          <div className="no-comments">
            <CommentLoad/> 
          </div>
        ) : (
          <div className="comment-feed">
            {fetchedComments?.length === 0 ? (
              <div className="no-comments-message">No comments yet. Be the first to comment!</div>
            ) : (
              fetchedComments?.map((item, index) => (
                <div className={item?.userId?.name ===  user?.result?.name ? 'comment-right' : 'comment-item'} key={index}>
                  <div className="avatar" style={{ backgroundColor: bgColor }}>
                    {item?.userId?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className='comment-content'>
                    <div className='comment-name'>{item?.userId?.name  ===  user?.result?.name ? 'You' : item.userId?.name}
                        { item?.userId?.name  ===  user?.result?.name && <div className="dot"></div>}
                    </div>
                    <div className="comment-text">
                      {item?.comment} 
                    </div>
                    <span className="comment-date">
                        {moment(item?.createdAt).fromNow()}
                      </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
    </div>
  );
}
