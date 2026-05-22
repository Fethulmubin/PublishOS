const initialState = { posts: [], hasMore: true, currentPage: 1 };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                posts: action.payload.posts,
                hasMore: action.payload.hasMore,
                currentPage: action.payload.currentPage,
            };
        case 'FETCH_MORE':
            return {
                posts: [...state.posts, ...action.payload.posts],
                hasMore: action.payload.hasMore,
                currentPage: action.payload.currentPage,
            };
        case 'CREATE':
            return { ...state, posts: [action.payload, ...state.posts] };
        case 'UPDATE':
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
            };
        case 'LIKE':
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
            };
        case 'DELETE':
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
            };
        default:
            return state;
    }
};
