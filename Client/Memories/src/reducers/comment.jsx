export default (comments = [], action) => {
    switch (action.type) {
      case 'ADD':
        return [...comments, action.payload]; // use 'payload'
      case 'FETCH_COMMENTS':
        return action.payload;
      default:
        return comments;
    }
  };
  