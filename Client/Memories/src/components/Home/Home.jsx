import React, { useState, useEffect, useRef } from 'react'
import { Styles } from './Styles'
import { useDispatch } from 'react-redux'
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPost } from '../../actions/posts'
// import { styled } from "@mui/system";
import { useSearchParams } from 'react-router-dom'
import CommentBar from '../CommentBar/CommentBar'


const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const [isSignup, setIsSignup] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const isCommenting = Boolean(searchParams.get('id'));
    const commentRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isCommenting && commentRef.current && !commentRef.current.contains(e.target)) {
                setSearchParams({});
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCommenting, setSearchParams]);

    return (
        <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            
            {/* Form or Comment - Always above Posts */}
            <Grid item xs={12}>
              <div ref={commentRef}>
                {
                  isCommenting
                    ? <CommentBar />
                    : <Form currentId={currentId} setCurrentId={setCurrentId} getPost={getPost} />
                }
              </div>
            </Grid>
      
            {/* Posts */}
            <Grid item xs={12}>
              <div
                style={{
                  filter: isCommenting ? 'blur(5px)' : 'none',
                  transition: 'filter 0.3s ease'
                }}
              >
                <Posts currentId={currentId} setCurrentId={setCurrentId} />
              </div>
            </Grid>
      
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;
