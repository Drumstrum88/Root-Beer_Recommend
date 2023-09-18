import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

function CommentList({
  comments, onDeleteComment, onEditComment,
}) {
  const [expanded, setExpanded] = useState([]);
  const { user } = useAuth();

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDeleteClick = (e, comment) => {
    e.preventDefault(); // Prevent accordion from toggling
    onDeleteComment(comment);
  };

  const handleEditClick = (e, comment) => {
    e.preventDefault(); // Prevent accordion from toggling
    onEditComment(comment);
  };

  return (
    <div className="comment-accordion">
      {comments.map((comment, index) => (
        <Accordion
          key={comment.firebaseKey}
          expanded={expanded === `panel-${index}`}
          onChange={handleAccordionChange(`panel-${index}`)}
          style={{ maxWidth: '100%', overflow: 'hidden' }} // Ensure no horizontal overflow
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>{comment.name}&apos;s comment:</Typography>
            {user.uid === comment.uid && (
              <>
                <IconButton onClick={(e) => handleDeleteClick(e, comment)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={(e) => handleEditClick(e, comment)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </AccordionSummary>
          <AccordionDetails style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Typography className="comment-text">{comment.text}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      firebaseKey: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    email: PropTypes.string,
    // Add other properties as needed
  }).isRequired,
};

export default CommentList;
