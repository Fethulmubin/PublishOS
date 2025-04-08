export default (comments = [], action) => {
    switch (action.type) {
      case 'ADD':
        return [...comments, action.payload]; // use 'payload'
      default:
        return comments;
    }
  };
  