// Simulated comments storage (replace with actual backend later)
let comments = new Map();

export const getComments = async (animeId) => {
  return comments.get(animeId) || [];
};

export const addComment = async (animeId, comment) => {
  const animeComments = comments.get(animeId) || [];
  const newComment = {
    id: Date.now(),
    ...comment,
    timestamp: new Date().toISOString(),
  };
  
  animeComments.push(newComment);
  comments.set(animeId, animeComments);
  return newComment;
};

// Add these new functions
export const likeComment = async (animeId, commentId) => {
  const animeComments = comments.get(animeId) || [];
  const comment = animeComments.find(c => c.id === commentId);
  if (comment) {
    comment.likes = (comment.likes || 0) + 1;
    comments.set(animeId, animeComments);
  }
  return comment;
};

export const dislikeComment = async (animeId, commentId) => {
  const animeComments = comments.get(animeId) || [];
  const comment = animeComments.find(c => c.id === commentId);
  if (comment) {
    comment.dislikes = (comment.dislikes || 0) + 1;
    comments.set(animeId, animeComments);
  }
  return comment;
};

export const addReply = async (animeId, commentId, reply) => {
  const animeComments = comments.get(animeId) || [];
  const comment = animeComments.find(c => c.id === commentId);
  if (comment) {
    const newReply = {
      id: Date.now(),
      ...reply,
      timestamp: new Date().toISOString(),
    };
    comment.replies = comment.replies || [];
    comment.replies.push(newReply);
    comments.set(animeId, animeComments);
    return newReply;
  }
  return null;
};