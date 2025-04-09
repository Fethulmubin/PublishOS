import * as api from '../api'

export const addcomment = (id, comment) => async(dispatch)=> {
    try {
        // console.log(comment, id)
        const  {data}  = await api.addComments(id, comment)
        // console.log(data)
        dispatch({ type: 'ADD', payload: data });

    } catch (error) {
        console.log(error)
    }
}
//getting comments
export const getcomment = (id) => async(dispatch) => {
    try {
        const {data} = await api.getComments(id);
        console.log(data)
        dispatch({type: 'FETCH_COMMENTS', payload: data})
    } catch (error) {
        console.log(error)
    }
}
