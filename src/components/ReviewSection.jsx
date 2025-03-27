import React, { useState, useEffect } from 'react';
import { FaStar, FaUser, FaThumbsUp, FaThumbsDown, FaReply } from 'react-icons/fa';
import { getComments, addComment, likeComment, dislikeComment, addReply } from '../services/commentService';

function ReviewSection({ animeId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [animeId]);

  const loadComments = async () => {
    try {
      const fetchedComments = await getComments(animeId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !rating) return;

    setIsSubmitting(true);
    try {
      const newComment = await addComment(animeId, {
        rating,
        content: comment,
        username: 'Anonymous', // Replace with actual user data when auth is implemented
      });

      setComments(prev => [newComment, ...prev]);
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-2xl font-bold mb-6">Comments</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Write a Comment</h4>
        
        {/* Rating Stars */}
        <div className="flex gap-2 mb-4">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <button
                type="button"
                key={ratingValue}
                className={`text-2xl transition-colors ${
                  ratingValue <= (rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(ratingValue)}
              >
                <FaStar />
              </button>
            );
          })}
        </div>

        {/* Comment Text */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this anime..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          rows="4"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting || !comment.trim() || !rating}
          className={`mt-4 px-6 py-2 rounded-lg transition-colors ${
            isSubmitting || !comment.trim() || !rating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              animeId={animeId}
              onUpdate={loadComments}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewSection;


function Comment({ comment, animeId, onUpdate }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    try {
      await likeComment(animeId, comment.id);
      onUpdate();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeComment(animeId, comment.id);
      onUpdate();
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      await addReply(animeId, comment.id, {
        content: replyText,
        username: 'Anonymous', // Replace with actual user data when auth is implemented
      });
      setReplyText('');
      setShowReplyForm(false);
      onUpdate();
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <FaUser className="text-gray-400" />
        <span className="font-medium">{comment.username}</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < comment.rating ? 'text-yellow-400' : 'text-gray-200'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {new Date(comment.timestamp).toLocaleDateString()}
        </span>
      </div>
      
      <p className="text-gray-700 mb-3">{comment.content}</p>
      
      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
        >
          <FaThumbsUp /> {comment.likes || 0}
        </button>
        <button
          onClick={handleDislike}
          className="flex items-center gap-1 text-gray-500 hover:text-red-500"
        >
          <FaThumbsDown /> {comment.dislikes || 0}
        </button>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 text-gray-500 hover:text-primary"
        >
          <FaReply /> Reply
        </button>
      </div>

      {showReplyForm && (
        <form onSubmit={handleReply} className="ml-8 mb-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            rows="2"
            required
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Reply'}
            </button>
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-4 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-gray-400" />
                <span className="font-medium">{reply.username}</span>
                <span className="text-sm text-gray-500">
                  {new Date(reply.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}