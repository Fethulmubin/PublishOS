import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system'
import { Styles } from './styles'
import { useState, useEffect } from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentBar from '../../CommentBar/CommentBar';
import { useParams, useSearchParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useSelector } from 'react-redux';



function Post({ post, setCurrentId, currentId }) {

  // const [Render, setRender] = useState(false)
  // const user = useSelector((state) => state?.auth.authData);
  const user = useSelector((state) => state?.auth.authData);
  console.log(user)
  const [searchParams, setSearchParams] = useSearchParams();
  

  const dispatch = useDispatch();
  const StyledCard = styled(Card)(() => Styles.card)
  const StyledTypography = styled(Typography)(() => Styles.title)
  const StyledCardActions = styled(CardActions)(() => Styles.cardActions)
  const StyledCardMedia = styled(CardMedia)(() => Styles.media)

  // useEffect(() => {
  //   if (Render) {
  //     // Any additional actions to perform on re-render
  //     setRender(false); // Reset the state to avoid infinite loop
  //   }
  // }, [Render]);

  const handleLike = () => {
    dispatch(likePost(post?._id))
    // setRender(!Render)
  }
  return (
    <>
      <StyledCard style={{ marginBottom: '10px' }}>
        <StyledCardMedia image={post.selectedFile}
          title={post.title} />
        <div className={Styles.overlay}>
          <StyledTypography variant='h6'>
            {`Posted by ${post.creator}`}
          </StyledTypography>
          <StyledTypography variant='body2'>
            {post.title}
          </StyledTypography>
          <StyledTypography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </StyledTypography>
        </div>
        <div className={Styles.details}>
          <StyledTypography variant='body2' color='textSecondary'>
            {post.tags.map(tag => `#${tag} `)}
          </StyledTypography>
        </div>
        <CardContent>
          <StyledTypography variant='h5' gutterBottom>
            {post.message}
          </StyledTypography>
        </CardContent>
        <StyledCardActions>
          <Button size='small' style={{ color: '#74a1e8' }} onClick={handleLike}>
            {user && post.likes.includes(user?._id)
              ? <ThumbUpAltIcon style={{ color: '#74a1e8' }} fontSize='small' />
              : <ThumbUpOffAltIcon style={{ color: '#74a1e8' }} fontSize='small' />
            }
            {post.likes.length}
          </Button>
          <Button size='small' style={{ color: '#e36c27' }} onClick={() => {
            dispatch(deletePost(post._id))
          }}>
            <DeleteIcon style={{ color: '#e36c27' }} fontSize='small' />
          </Button>
          {/* {deletePosts && <ToastContainer />} */}
          <div className={Styles.overlay2} style={{ display: 'flex', gap: '5px' }}>
            <Button style={{ color: 'blue' }} size='small' onClick={() => {
              setCurrentId(post._id)
            }}>
              <EditIcon style={{ color: '#74a1e8', fontSize: '20px' }} />
            </Button>
            <Button style={{ color: 'blue' }} size='small' onClick={() => {
              searchParams.get('id') ? setSearchParams({}) : setSearchParams({ id: post._id })
            }}>
              <CommentIcon style={{ color: '#74a1e8', fontSize: '20px' }} />
            </Button>
          </div>
        </StyledCardActions>
      </StyledCard>


    </>
  )
}

export default Post