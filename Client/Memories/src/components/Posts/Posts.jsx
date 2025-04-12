import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import {Grid, CircularProgress} from '@mui/material'
import {styled} from '@mui/system'

import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton'

import { StyledGrid } from './styles';
// import './posts.css'

function Posts({setCurrentId}) {
  const posts = useSelector((state)=> state.posts)

  return(
    !posts.length? <LoadingSkeleton cards={4}/>:
    <StyledGrid  container alignItems = "stretch" spacing = {3}>
      {posts.map(post => (
      <Grid key={post._id} item xs={12} sm={6} md={6} >
        <Post post = {post} setCurrentId={setCurrentId}/>
      </Grid>  
  ))}

    </StyledGrid>
  
  
  )
}

export default Posts