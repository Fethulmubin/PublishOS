const calculateEngagementRate = ({ likes, comments, shares, impressions }) => {
  const totalEngagement = (likes || 0) + (comments || 0) + (shares || 0);
  if (!impressions) return 0;
  return Math.round((totalEngagement / impressions) * 100 * 100) / 100;
};

const calculateGrowthRate = (current, previous) => {
  if (!previous) return 100;
  return Math.round(((current - previous) / previous) * 100 * 100) / 100;
};

const aggregateMetrics = (metricsArray) => {
  return metricsArray.reduce(
    (acc, m) => ({
      totalLikes: acc.totalLikes + (m.likes || 0),
      totalComments: acc.totalComments + (m.comments || 0),
      totalShares: acc.totalShares + (m.shares || 0),
      totalViews: acc.totalViews + (m.views || 0),
    }),
    { totalLikes: 0, totalComments: 0, totalShares: 0, totalViews: 0 }
  );
};

export { calculateEngagementRate, calculateGrowthRate, aggregateMetrics };
