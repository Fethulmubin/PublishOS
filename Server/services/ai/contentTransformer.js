const structureForPost = async ({ content, tone, platform }) => {
  let title = '';
  let message = content;
  let tags = [];

  const lines = content.split('\n').filter(l => l.trim());
  if (lines.length > 1 && lines[0].length < 100 && !lines[0].startsWith('#')) {
    title = lines[0].trim();
    message = lines.slice(1).join('\n').trim();
  }

  const hashtagRegex = /#(\w+)/g;
  let match;
  const extractedTags = [];
  while ((match = hashtagRegex.exec(message)) !== null) {
    extractedTags.push(match[1]);
  }
  if (extractedTags.length > 0) {
    tags = extractedTags;
    message = message.replace(/#(\w+)\s*/g, '').trim();
  }

  return {
    title,
    message: message || content,
    tags: tags.length > 0 ? tags : [platform || 'general', tone || 'general'],
    selectedFile: '',
  };
};

export { structureForPost };
