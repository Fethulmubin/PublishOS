const CONTENT_TEMPLATES = {
  linkedin: {
    educational: "Here's what I learned about {topic}:\n\n{key_insight}\n\n{call_to_action}",
    professional: "Proud to share that {achievement}.\n\n{details}\n\n#{hashtags}",
  },
  twitter: {
    tip: "{tip} \n\n#{hashtags}",
    announcement: "Excited to announce {news}! {link}",
  },
  instagram: {
    carousel: "Swipe through to learn about {topic} ✨\n\n{details}\n\n#{hashtags}",
    story: "{personal_story}\n\n{lesson}\n\n#{hashtags}",
  },
};

const getTemplate = ({ platform, style }) => {
  return CONTENT_TEMPLATES[platform]?.[style] || "";
};

export { CONTENT_TEMPLATES, getTemplate };
