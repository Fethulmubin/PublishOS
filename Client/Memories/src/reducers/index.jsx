import {combineReducers} from 'redux'
import posts from './posts'
import auth from './auth'

export default combineReducers({
    posts, auth
})

// export const persistedState = {
//     auth: {
//       authData: localStorage.getItem('profile', JSON.stringify('token')),
//             // Store user data (optional)
            
//             // Store token (required for auth)

//     },
//   };
export const persistedState = {
    auth: {
      authData: JSON.parse(localStorage.getItem('profile')) || null,
    },
  };
//   console.log(authData)
  

