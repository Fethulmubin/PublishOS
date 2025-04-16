import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system'
import { Styles } from './styles'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useSearchParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './post.css'
import EditIcon from '@mui/icons-material/Edit';



function Post({ post, setCurrentId, currentId, showForm, setShowForm }) {


  const user = useSelector((state) => state?.auth?.authData);
  // console.log(user)
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPopup, setShowPopup] = useState(false)


  const dispatch = useDispatch();
  const StyledCard = styled(Card)(() => (Styles.card))
  const StyledTypography = styled(Typography)(() => (Styles.title))
  const StyledCardActions = styled(CardActions)(() => (Styles.cardActions))
  const StyledCardMedia = styled(CardMedia)(() => (Styles.media))

  const handleLike = () => {
    dispatch(likePost(post?._id))
  }

  // const handleDelete = async (id) => {

  //   try{
  //     await dispatch(deletePost(id))
  //     toast.success("Post deleted successfully")
  //   }
  //   catch{
  //      toast.error(error?.response?.data?.message || "Something went wrong!");
  //   }
  // }
  return (

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
          {user && post.likes.includes(user?.result?._id)
            ? <ThumbUpAltIcon style={{ color: '#74a1e8' }} fontSize='small' />
            : <ThumbUpOffAltIcon style={{ color: '#74a1e8' }} fontSize='small' />
          }
          {post.likes.length}
        </Button>
        {user?.result?._id === post.posterId && (
          <div className="option-info-container" >
             {/* {
              user?.result?._id === post.posterId && */}
              <div className={Styles.overlay2} style={{ gap: '5px' }}>
                <Button style={{ color: 'blue' }} size='small' onClick={() => setShowPopup(prev => !prev)}>
                  <MoreVertIcon style={{ color: '#74a1e8', fontSize: '20px' }} />
                </Button>
              </div>
              {showPopup && (
                 <div className="option-popup">
                 <Button size='small' style={{ color: '#e36c27' }} onClick={() => {
                   dispatch(deletePost(post._id))
                    setShowPopup(false)
                 }}>
                   <DeleteIcon style={{ color: '#e36c27' }} fontSize='small' />
                   Delete
                 </Button>
                 <hr />
                 <Button style={{ color: 'blue' }} size='small' onClick={() => {
                   setCurrentId(post._id)
                   setShowForm(!showForm)
                   setShowPopup(false)
                   // window.scrollTo(0, 0);
                 }}>
                   <EditIcon style={{ color: '#74a1e8', fontSize: '20px' }} />
                   Update
                 </Button>
                 <div className="popup-arrow"></div>
               </div>
              )} 
          </div>
        )}
        <Button style={{ color: 'blue' }} size='small' onClick={() => {
          searchParams.get('id') ? setSearchParams({}) : setSearchParams({ id: post._id })
        }}>
          <CommentIcon style={{ color: '#74a1e8', fontSize: '20px' }} />
        </Button>

      </StyledCardActions>
    </StyledCard>



  )
}

export default Post