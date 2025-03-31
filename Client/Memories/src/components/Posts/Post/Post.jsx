import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from '@mui/system'
import { Styles } from './styles'
import { useState, useEffect } from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import  {deletePost, likePost}  from '../../../actions/posts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Post({post, setCurrentId, deletePosts}) {
  // const StyledBar =  styled(AppBar)(()=> (Styles.appBar))
  // const notifyUpdate = () => toast("your post updated successfully");
  // const notifyDelete = () => toast("your post deleted successfully");
  const [Render, setRender] = useState(false)
  const dispatch = useDispatch();
  const StyledCard = styled(Card)(()=> Styles.card)
  const StyledTypography= styled(Typography)(()=> Styles.title)
  const StyledCardActions= styled(CardActions)(()=> Styles.cardActions)
  const StyledCardMedia = styled(CardMedia)(()=> Styles.media)
  // const styledButton = Styled(Button)(()=> Styles.media)
  useEffect(() => {
    if (Render) {
      // Any additional actions to perform on re-render
      setRender(false); // Reset the state to avoid infinite loop
    }
  }, [Render]);

  const handleSubmit = ()=>{
    dispatch(likePost(post._id))
    setRender(!Render)
    // console.log(Render)
  }
  return (
   <StyledCard>
      <StyledCardMedia image= {post.selectedFile}
      title={post.title}/>
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
              {post.tags.map(tag=>`#${tag} `)}
          </StyledTypography>
        </div>
        <CardContent>
           <StyledTypography variant='h5' gutterBottom>
                  {post.message}
           </StyledTypography>
        </CardContent>
        <StyledCardActions>
            <Button size='small' style={{color : '#74a1e8'}} onClick={()=> {
              handleSubmit()
            }}>
              <ThumbUpAltIcon style={{color : '#74a1e8'}} fontSize= 'small'/>
              {`Like `}
              {post.likeCount}
            </Button>
            <Button size='small' style={{color : '#e36c27'}} onClick={()=> 
              {dispatch(deletePost(post._id))
              }}>
              <DeleteIcon style={{color : '#e36c27'}} fontSize= 'small'/>
              Delete
            </Button>
            {/* {deletePosts && <ToastContainer />} */}
            <div className={Styles.overlay2}>
          <Button style={{color : 'blue'}} size = 'small' onClick={()=> 
            {setCurrentId(post._id)}}>
              <MoreHorizIcon style={{color : '#74a1e8'}} fontSize = 'default'/>
          </Button>
           </div>
        </StyledCardActions>
   </StyledCard>
  )
}

export default Post