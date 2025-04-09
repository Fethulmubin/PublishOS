export default (comments = [], action) => {
    switch (action.type) {
      case 'ADD':
        return [...comments, action.payload]; // use 'payload'
      case 'FETCH_COMMENTS':
        return action.payload;
      case 'CLEAR_COMMENTS':
        // Clear comments when needed
        return []; // Clear comments by returning an empty array
      default:
        return comments;
    }
  };
  