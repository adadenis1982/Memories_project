import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import useStyles from './styles';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../redux/actionCreators/postsAC'

function PostDetails() {
  
  const { post, posts, isLoading } = useSelector((state) => state.postsReducer);

  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch])

  // Находит все посты с одинаковыми Тегами
  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post, dispatch])
  
  if(!post) return null;

  if(isLoading) {
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em' />
    </Paper>
  }

  const recommendedPosts = posts.filter(({ id }) => id !== post.id)

  const openPost = (id) => {
    navigate(`/posts/${id}`)
  };

  moment.locale('ru')

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Автор: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Чат - очень скоро!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      { recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>Вам также может понравиться:</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, id}) => (
              <div key={uuidv4()} style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(id)}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle1'>Лайков: {likes.length}</Typography>
                <img src={selectedFile} width='200px' alt=""/>
              </div>
            ))}
          </div>
        </div>
      ) }
    </Paper>
  );
}

export default PostDetails;
