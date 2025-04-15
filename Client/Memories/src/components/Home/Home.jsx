import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grow, Grid } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPost } from '../../actions/posts'
import { useSearchParams } from 'react-router-dom'
import CommentBar from '../CommentBar/CommentBar'
import NavBottom from '../NavBottom/NavBottom'


const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  var isCommenting = Boolean(searchParams.get('id'));
  const commentRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);


  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isCommenting && commentRef.current && !commentRef.current.contains(e.target)) {
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
  }, [isCommenting, setSearchParams,]);


    useEffect(() => {
      if ( showForm || commentRef.current) {
        commentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [isCommenting, showForm]);



  return (
    <>
      <Grow in>
        <Container style={{ position: 'relative' }}>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12}>
              {/* Posts with blur effect */}
              <div
                style={{
                  filter: isCommenting || showForm ? 'blur(5px)' : 'none',
                  transition: 'filter 0.3s ease'
                }}
              >
                <Posts  setShowForm={setShowForm} showForm={showForm} currentId={currentId} setCurrentId={setCurrentId} />
              </div>
            </Grid>
          </Grid>

          {/* Overlay popup */}
          {isCommenting ? (
            <div
              ref={commentRef}
              id="posts"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                zIndex: 1000,
              }}
            >
              <div style={{
                maxWidth: '600px',
                width: '90%',
              }}>
                <CommentBar />
              </div>
            </div>
          ) : showForm && <div
            ref={commentRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              // alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{
            }}>
              <Form currentId={currentId} setCurrentId={setCurrentId} getPost={getPost} setShowForm={setShowForm} showForm={showForm} />
            </div>
          </div>}
        </Container>
      </Grow>

      <NavBottom setShowForm={setShowForm} showForm={showForm} />
    </>
  )
}

export default Home;
