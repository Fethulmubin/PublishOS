import axios from 'axios'
import Post from '../components/Posts/Post/Post'

import React from 'react'


const url = 'http://localhost:5555/'

const API = axios.create({ baseURL: url });

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
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

export const fetchPosts = ()=> API.get('posts');
export const createPosts = (newPost)=> API.post('posts', newPost );
export const updatePosts = (id, updatedPost)=> API.patch(`posts/${id}`, updatedPost );
export const deletePosts = (id)=> API.delete(`posts/${id}` );
export const likePosts = (id)=> API.patch(`posts/${id}/like`);

//authentication
export const signIn = (formData) => API.post('users/signin', formData);
export const signUp = (formData) => API.post('users/signup', formData);

function index() {
  return (
    <div>
        <Post deletePosts={deletePosts}/>
    </div>
  )
}

export default index;
{/* <Post deletePosts={deletePosts}/> */}
