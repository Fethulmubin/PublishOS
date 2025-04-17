const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      // return [...state, action.payload];
      return Array.isArray(state) ? [...state, action.payload] : [action.payload];
    case 'FETCH_COMMENTS':
      return action.payload;
    case 'CLEAR_COMMENTS':
      return [];
    default:
      return state;
  }
};

export default commentsReducer;

// const commentsReducer = (state = { comments: [] }, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return { ...state, comments: action.payload };
//     case 'FETCH_COMMENTS':
//       return { ...state, comments: [...state.comments, action.payload] };
//     case 'CLEAR_COMMENTS':
//       return { ...state, comments: [] };
//     default:
//       return state;
//   }
// };

// export default commentsReducer;
