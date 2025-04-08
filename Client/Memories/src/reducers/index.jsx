import {combineReducers} from 'redux'
import posts from './posts'
import auth from './auth'
import comment from './comment'

export default combineReducers({
    posts, auth, comment
})


export const persistedState = {
    auth: {
      authData: JSON.parse(localStorage.getItem('profile')) || null,
    },
  };
//   console.log(authData)
  

