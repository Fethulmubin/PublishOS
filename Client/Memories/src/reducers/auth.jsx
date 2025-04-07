const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            // const { result, token } = action?.data;
            // Store user data (optional)
            // localStorage.setItem('profile', JSON.stringify(result));
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            // Store token (required for auth)
            // localStorage.setItem('token', token);
            return { ...state, authData: action?.data };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}
export default authReducer;