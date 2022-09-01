import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  ListItem
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import 'moment/locale/ru' 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, likePost } from '../../../redux/actionCreators/postsAC';
import useStyles from './styles';

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.googleId || user?.result?.id.toString();
  const hasLikePost = likes.find((like) => like === userId);
  
  const handleLike = () => {
    dispatch(likePost(post.id));

    if(hasLikePost) {
      setLikes(likes.filter((id) => id !== userId))
    } else {
      setLikes([...likes, userId])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(like => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 1
            ? `Ваш и ${likes.length - 1} другиx`
            : `${likes.length} Лайк${
                likes.length > 1 && likes.length < 4
                  ? 'а'
                  : likes.length > 4
                  ? 'ов'
                  : ''
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length}{' '}
          {likes.length === 1
            ? 'Лайк'
            : likes.length > 1 && likes.length < 4
            ? 'Лайка'
            : 'Лайков'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Лайк
      </>
    );
  };

  const openPost = () => navigate(`/posts/${post.id}`);

  moment.locale('ru')

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onDoubleClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?.id === Number(post?.creator)) && (
          <div className={classes.overlay2}>
            <ListItem
              style={{ color: 'white' }}
              size="small"
              onClick={() => setCurrentId(post.id)}
            >
              <MoreHorizIcon fontSize="medium" />
            </ListItem>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?.id === Number(post?.creator)) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post.id))}
          >
            <DeleteIcon fontSize="small" />
            Удалить
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
