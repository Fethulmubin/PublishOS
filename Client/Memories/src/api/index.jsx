import axios from 'axios'
import Post from '../components/Posts/Post/Post'

import React from 'react'


const url = 'http://localhost:5555/'

const API = axios.create({ baseURL: url });

API.interceptors.request.use(
  (config) => {
    const tokenParsed = localStorage.getItem('profile');
    const {token} = tokenParsed ? JSON.parse(tokenParsed) : null;
    // console.log(token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
    }
    return Promise.reject(error);
  }
);

//posts
export const fetchPosts = ()=> axios.get(`${url}posts`);
export const createPosts = (newPost)=> API.post('posts', newPost );
export const updatePosts = (id, updatedPost)=> API.patch(`posts/${id}`, updatedPost );
export const deletePosts = (id)=> API.delete(`posts/${id}` );
export const likePosts = (id)=> API.patch(`posts/${id}/like`);

//authentication
export const signIn = (formData) => axios.post(`${url}users/signin`, formData);
export const signUp = (formData) => axios.post(`${url}users/signup`, formData);

//comments
export const addComments = (id, comment) => API.post(`comments/addComment/${id}`, {comment}); // if ypu use req.body.comment 
export const getComments = (id) => API.get(`comments/getComments/${id}`); 

function index() {
  return (
    <div>
        <Post deletePosts={deletePosts}/>
    </div>
  )
}

export default index;
{/* <Post deletePosts={deletePosts}/> */}
