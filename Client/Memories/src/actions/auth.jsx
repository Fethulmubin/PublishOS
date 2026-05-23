import * as api from '../api'

export const signin = (formData, navigate) => async(dispatch)=> {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: 'AUTH', data })

        navigate('/feed')
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const signup = (formData, navigate ) => async(dispatch)=> {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: 'AUTH', data })
        // console.log(data)    
        navigate('/feed')
    } catch (error) {
        // console.log(error.message)  
        throw error;
    }
}