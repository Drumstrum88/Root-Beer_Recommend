/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CommentFormModal from '../../components/commentForm';
import {
  createComment, deleteComment, editComment, getComments,
} from '../../components/API/rootBeerData';
import { viewRootBeerDetails } from '../../components/API/mergedData';
import { useAuth } from '../../utils/context/authContext';
import CommentList from '../../components/comment';

export default function ViewRootBeer() {
  const [rootBeerDetails, setRootBeerDetails] = useState({});
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [comments, setComments] = useState([]); // State to store comments
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      // Fetch root beer details when firebaseKey changes
      viewRootBeerDetails(firebaseKey)
        .then((rootBeerData) => {
          setRootBeerDetails(rootBeerData);
        })
        .catch((error) => {
          console.error('Error fetching root beer details:', error);
        });

      // Fetch comments for the specific root beer and filter by rootBeerFirebaseKey
      getComments(firebaseKey)
        .then((commentsData) => {
          console.warn(commentsData); // Add this line for debugging

          // Filter comments associated with the current root beer
          const filteredComments = commentsData.filter(
            (comment) => comment.rootBeerFirebaseKey === firebaseKey,
          );

          setComments(filteredComments); // Update the comments state
        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
          // Handle the error here as needed
        });
    }
  }, [firebaseKey]);

  const handleDeleteComment = (comment) => {
    if (window.confirm('Delete this comment?')) {
      // Call the deleteComment promise
      deleteComment(comment.firebaseKey)
        .then(() => {
          // Handle success
          console.warn('Comment deleted successfully');
          // Update the comments state to remove the deleted comment
          setComments((prevComments) => prevComments.filter((c) => c.firebaseKey !== comment.firebaseKey));
        })
        .catch((error) => {
          // Handle error
          console.error('Error deleting comment:', error);
        });
    }
  };

  const handleEditComment = (comment) => {
    // Set the comment data in your form state to allow editing
    setEditingComment(comment);
    setIsCommentFormOpen(true);
  };

  const handleCommentSubmit = (commentText) => {
    // Create a new comment object with the relevant data
    const commentData = {
      text: commentText,
      uid: user.uid,
      rootBeerFirebaseKey: firebaseKey,
      name: user.displayName, // Include the user's name
    };

    // Check if it's an edit or a new comment
    if (editingComment) {
      // Call the editComment promise
      editComment(commentData)
        .then(() => {
          // Handle success
          console.warn('Comment edited successfully');
          // Update the comments state with the edited comment
          setComments((prevComments) => prevComments.map((c) => (c.firebaseKey === editingComment.firebaseKey ? { ...c, text: commentText } : c)));
          setIsCommentFormOpen(false);
          setEditingComment(null);
        })
        .catch((error) => {
          // Handle error
          console.error('Error editing comment:', error);
        });
    } else {
      // Call the createComment promise
      createComment(commentData)
        .then(({ name }) => {
          // Patch the comment's firebaseKey with the generated name
          const patchPayload = { firebaseKey: name };
          editComment(patchPayload);
          console.warn('Comment added successfully');
          setIsCommentFormOpen(false); // Close the comment form modal
          // Update the comments state with the newly added comment
          setComments((prevComments) => [...prevComments, { ...commentData, firebaseKey: name }]);
        })
        .catch((error) => {
          // Handle error
          console.error('Error adding comment:', error);
        });
    }
  };

  return (
    <div className="root-beer-details-container">
      {rootBeerDetails ? (
        <div>
          <div className="d-flex flex-column">
            <img src={rootBeerDetails.image} alt={rootBeerDetails.name} style={{ width: '300px' }} className="genericImage" />
          </div>
          <div className="text-white-ms-5-details">
            <h5>
              {rootBeerDetails.name} found at: {rootBeerDetails.storeId}
            </h5>
            Root Beer Description: {rootBeerDetails.description}
            <hr />
          </div>
        </div>
      ) : (
        <p>Loading root beer details...</p>
      )}
      <Link href={`/rootBeer/edit/${firebaseKey}`} passHref>
        <Button className="genericBtn">Edit Details</Button>
      </Link>
      <Button className="genericBtn" onClick={() => setIsCommentFormOpen(true)}>
        Add Comment
      </Button>
      <CommentFormModal
        open={isCommentFormOpen}
        onClose={() => setIsCommentFormOpen(false)}
        onSubmit={handleCommentSubmit}
        userName={user.displayName}
        initialComment={editingComment || null}
      />
      <div className="comment-head">
        <h3>Comments</h3>
        {comments.length > 0 && (
          <div style={{ maxHeight: '400px', overflowY: 'auto', maxWidth: '100%' }}>
            <CommentList
              comments={comments}
              onDeleteComment={handleDeleteComment}
              onEditComment={handleEditComment}
              currentUser={user}
            />
          </div>
        )}
      </div>
    </div>
  );
}
