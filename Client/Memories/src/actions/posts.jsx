import * as api from '../api'

export const getPost = (page = 1) => async(dispatch) => {
try {
    const {data} = await api.fetchPosts(page)
    dispatch({type : 'FETCH_ALL', payload : { posts: data.data, hasMore: data.hasMore, currentPage: data.currentPage }})
} catch (error) {
    console.log(error.message)
    throw error;
}
}

export const getMorePosts = (page) => async(dispatch) => {
try {
    const {data} = await api.fetchPosts(page)
    dispatch({type : 'FETCH_MORE', payload : { posts: data.data, hasMore: data.hasMore, currentPage: data.currentPage }})
} catch (error) {
    console.log(error.message)
    throw error;
}
}

export const createPost = (post) => async(dispatch)=> {
try {
    const {data} = await api.createPosts(post)
    dispatch({type : 'CREATE', payload : data})
} catch (error) {
    throw error;
}
}

export const updatePost = (id, post) => async(dispatch)=> {
try {
    const {data} = await api.updatePosts(id, post)
    dispatch({type : 'UPDATE', payload : data})
} catch (error) {
    console.log(error.message)
    throw error;
}
}

export const deletePost = (id) => async(dispatch)=> {
    try {
        await api.deletePosts(id)
        dispatch({type : 'DELETE', payload : id})
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const likePost = (id) => async(dispatch)=> {
    try {
        const {data} = await api.likePosts(id)
        dispatch({type : 'LIKE', payload : data})
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}
