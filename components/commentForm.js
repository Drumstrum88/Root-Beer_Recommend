/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function CommentFormModal({
  open, onClose, onSubmit, comment,
}) {
  const [commentText, setCommentText] = useState(comment ? comment.text : ''); // Initialize with comment text

  // Update commentText when the comment prop changes (for editing)
  useEffect(() => {
    if (comment) {
      setCommentText(comment.text);
    } else {
      setCommentText(''); // Reset the text when adding a new comment
    }
  }, [comment]);

  const handleClose = () => {
    setCommentText('');
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(commentText);
    setCommentText('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{comment ? 'Edit Comment' : 'Add a Comment'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your comment below:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Comment"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {comment ? 'Save' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CommentFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
};

export default CommentFormModal;
