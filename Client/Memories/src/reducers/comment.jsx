const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
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
