import * as api from '../api'

export const getPost = () => async(dispatch)=> {
    /**In Redux, the dispatch function is provided to the action creators by the Redux Thunk middleware when you use asynchronous action creators. This is why you don't need to import dispatch directly in your getPost function. */
try {
    const {data} = await api.fetchPosts()
    dispatch({type : 'FETCH_ALL', payload : data})
} catch (error) {
    console.log(error.message)
}

    // const action = {type : 'FETCH_ALL', payload : []}
    // dispatch(action)
}
export const createPost = (post) => async(dispatch)=> {
    /**In Redux, the dispatch function is provided to the action creators by the Redux Thunk middleware when you use asynchronous action creators. This is why you don't need to import dispatch directly in your getPost function. */
try {
    const {data} = await api.createPosts(post)
    dispatch({type : 'CREATE', payload : data})
    console.log(data)
} catch (error) {
    console.log(error)
    throw error;
}

    // const action = {type : 'FETCH_ALL', payload : []}
    // dispatch(action)
}

/*In a Redux setup, dispatch and reducers are connected through the action dispatching mechanism. Here's a step-by-step explanation:

Action Dispatching: When an action is dispatched using dispatch(action), it sends the action to the Redux store.
Reducers: The Redux store then passes the current state and the dispatched action to the reducer function(s).
State Update: The reducer(s) process the action and return a new state based on the action type and payload.
Store Update: The Redux store updates its state with the new state returned by the reducer(s).
In your posts.jsx file, the dispatch function is used to send an action to the Redux store. Here's how it works in your code:

Action Creation: The getPost function fetches data from an API and creates an action with type 'FETCH_ALL' and the fetched data as the payload.
Dispatch Action: The action is dispatched using dispatch({type: 'FETCH_ALL', payload: data}).
Reducer Handling: The reducer function(s) in your Redux setup will handle this action and update the state accordingly.
Here's a simplified example of how a reducer might look:

In this example, when the FETCH_ALL action is dispatched, the postsReducer updates the state with the new data from the action's payload.


 */
export const updatePost = (id, post) => async(dispatch)=> {
  
try {
    const {data} = await api.updatePosts(id, post)
    dispatch({type : 'UPDATE', payload : data})
} catch (error) {
    console.log(error.message)
    throw error;
}

    // const action = {type : 'FETCH_ALL', payload : []}
    // dispatch(action)
}

export const deletePost = (id) => async(dispatch)=> {
  
    try {
        await api.deletePosts(id)
        dispatch({type : 'DELETE', payload : id})
    } catch (error) {
        console.log(error.message)
        throw error;
    }
    
        // const action = {type : 'FETCH_ALL', payload : []}
        // dispatch(action)
    }

    export const likePost = (id) => async(dispatch)=> {
  
        try {
            const {data} = await api.likePosts(id)
            dispatch({type : 'LIKE', payload : data})
        } catch (error) {
            console.log(error.message)
            throw error;
        }
        
            // const action = {type : 'FETCH_ALL', payload : []}
            // dispatch(action)
        }