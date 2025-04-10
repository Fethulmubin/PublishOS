import {combineReducers} from 'redux'
import posts from './posts'
import auth from './auth'
  import commentsReducer from './comment'

export default combineReducers({
    posts, auth, commentsReducer
})


export const persistedState = {
    auth: {
      authData: JSON.parse(localStorage.getItem('profile')) || null,
    },
  };
//   console.log(authData)
  

