const { Op } = require('sequelize');
const { postMessage } = require('../db/models');

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    
    const post = await postMessage.findOne({ where: { id: id } });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const limitPost = 8;

    const startIndex = (Number(page) - 1) * limitPost; // получить стартовый индекс для каждой страницы

    const total = await postMessage.count();

    const posts = await postMessage.findAll({
      order: [
          ['id', 'DESC'],
        ],
      offset: startIndex, 
      limit: limitPost,
      raw: true,
    });

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / limitPost)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {

    const post = await postMessage.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iRegexp]: searchQuery } },
          { tags: { [Op.contains]: tags.toLowerCase().split(',') } },
        ],
      },
      raw: true,
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPostMessage = await postMessage.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  const { title, message, creator, selectedFile, tags } = req.body;

  try {
    const post = await postMessage.findOne({ where: { id: id } });

    if (!post) return res.status(404).send(`Нет поста с таким id: ${id}`);

    await postMessage.update(
      { title, message, selectedFile, creator, tags },
      { where: { id } }
    );

    const updatedPost = await postMessage.findOne({ where: { id } });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postMessage.findOne({ where: { id: id } });

    if (!post) return res.status(404).send(`Нет поста с таким id: ${id}`);

    await postMessage.destroy({ where: { id: id } });

    res.json({ message: 'Пост успешно удален.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Вы не авторизированы' });

  try {
    const post = await postMessage.findOne({ where: { id }, raw: true });

    if (!post) return res.status(404).send(`Нет поста с таким id: ${id}`);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    await postMessage.update({ likes: post.likes }, { where: { id } });

    const updatedPost = await postMessage.findOne({ where: { id }, raw: true });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const commentPost = async(req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await postMessage.findOne({ where: { id }, raw: true });

  post.comments.push(value);

  await postMessage.update({ comments: post.comments }, { where: { id } });

  const updatedPost = await postMessage.findOne({ where: { id }, raw: true });

  res.json(updatedPost);
};

module.exports = {
  getPostsBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  commentPost
};
