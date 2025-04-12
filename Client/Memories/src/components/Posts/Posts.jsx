import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import {Grid, CircularProgress} from '@mui/material'
import {styled} from '@mui/system'
// import { Styles } from './styles'
// import Skeleton from 'react-loading-skeleton'
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton'
import CommentBar from '../CommentBar/CommentBar'
import { useSearchParams } from 'react-router-dom'
import { StyledGrid } from './styles';
// import './posts.css'

function Posts({setCurrentId}) {
  const posts = useSelector((state)=> state.posts)
  const [searchParams, setSearchParams] = useSearchParams();

  return(
    !posts.length? <LoadingSkeleton cards={4}/>:
    <StyledGrid  container alignItems = "stretch" spacing = {3}>
      {posts.map(post => (
      <Grid key={post._id} item xs={12} sm={6} md={6} >
        <Post post = {post} setCurrentId={setCurrentId}/>
        {/* {searchParams.get('id') == post._id && <CommentBar />} */}
      </Grid>  
  ))}

    </StyledGrid>
  
  
  )
}

export default Posts