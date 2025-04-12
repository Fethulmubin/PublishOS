import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { styled } from "@mui/system";
// import { Styles } from "./styles";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { StyledPaper, StyledButton, StyledTextField, Styles } from './styles';



function Form({ currentId, setCurrentId }) {
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
  const user = useSelector((state) => state.auth.authData);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [shouldRerender, setShouldRerender] = useState(false);
  const [drop, setDrop] = useState(false);
  useEffect(() => {
    if (post) setPostData(post)
    // dispatch(getPost())
  }, [post])

  useEffect(() => {
    if (shouldRerender) {
      // Any additional actions to perform on re-render
      setShouldRerender(false); // Reset the state to avoid infinite loop
    }
  }, [shouldRerender]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
      // window.location.reload();
      setShouldRerender(true)
      // setPostData(post)
      clear();


    }
    else {
      dispatch(createPost(postData));
      clear();
    }
  };
  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
    setCurrentId(null);
  };
  return (
    <>
      {user ? <StyledPaper>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={Styles.form}
          style={{width: '70%', justifySelf: 'center'}}
        >
          {/* <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#3f51b5',
              fontFamily: 'Roboto, sans-serif',
              textAlign: 'center',
              letterSpacing: '0.5px',
              mb: 2, // margin bottom
            }}
          >
            Share your memories ✨
          </Typography> */}
          <StyledTextField
            name="creator"
            label="Start sharing by entering your name"
            variant="outlined"
            fullWidth
            value={postData.creator}
            onFocus={() => setDrop(true)}
            onBlur={() => setDrop(false)}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
            style={{borderRadius: '60px', justifySelf: 'center'}}
          />
        
          {drop ? <><StyledTextField
            name="title"
            label="Title eg: visit Ethiopia"
            variant="outlined"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />

            <StyledTextField
              name="message"
              label="Message"
              variant="outlined"
              fullWidth
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />

            <StyledTextField
              label="tags"
              variant="outlined"
              fullWidth
              value={postData.tags}
              onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
            />

            <div className={Styles.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>

            <StyledButton
              variant="container"
              color="primary"
              size="large"
              type="submit"

              fullWidth

            >
              Post
            </StyledButton>
            <Button
              variant="container"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button> </> : <></>}
          
        </form>
      </StyledPaper>  : <Paper className={Styles.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>}

    </>
  );
}

export default Form;
