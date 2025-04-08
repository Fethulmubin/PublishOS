import * as api from '../api'

export const addcomment = (id, comment) => async(dispatch)=> {
    try {
        // console.log(comment, id)
        const  {data}  = await api.addComments(id, comment)
        console.log(data)
        dispatch({ type: 'ADD', payload: data });

    } catch (error) {
        console.log(error)
    }
}
