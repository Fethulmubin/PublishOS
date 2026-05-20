const calculatePostEngagement = (post) => ({
  postId: post._id,
  likes: post.likes?.length || 0,
  comments: post.comments?.length || 0,
  total: (post.likes?.length || 0) + (post.comments?.length || 0),
});

const calculateAverageEngagement = (posts) => {
  if (!posts.length) return 0;
  const total = posts.reduce((sum, p) => sum + p.likes.length + (p.comments?.length || 0), 0);
  return Math.round(total / posts.length);
};

const getTopPerformingPosts = (posts, limit = 5) => {
  return posts
    .map(calculatePostEngagement)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
};

export { calculatePostEngagement, calculateAverageEngagement, getTopPerformingPosts };
