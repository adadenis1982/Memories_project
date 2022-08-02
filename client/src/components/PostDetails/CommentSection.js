import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import useStyles from './styles';
import { commentPost } from '../../redux/actionCreators/postsAC';

function CommentSection({ post }) {
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post.id));

    setComments(newComments);
    setComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth'})
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Комментарии
          </Typography>
          {comments.map(c => (
            <Typography key={uuidv4()} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef}/>
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">
              Напиши комментарий
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Комментарий"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px ' }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Оставить комментарий
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
