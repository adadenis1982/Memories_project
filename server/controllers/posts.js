const { postMessage } = require('../db/models')

const getPosts = async (req, res) => {
  try {
      const postMessages = await postMessage.findAll({ raw: true });      
      res.status(200).json(postMessages);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  console.log(req.body);
  try {
      const newPostMessage = await postMessage.create({ title, message, selectedFile, creator, tags })

      res.status(201).json(newPostMessage);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}

const updatePost = async (req, res) => {

  const { id } = req.params;

  const { title, message, creator, selectedFile, tags } = req.body;

  try {
   
    const post = await postMessage.findOne({ where: { id: id } })
  
    if (!post) return res.status(404).send(`Нет поста с таким id: ${id}`);

    await postMessage.update( { title, message, selectedFile, creator, tags},
      { where: { id } }
    );

    const updatedPost = await postMessage.findOne({ where: { id } })

    res.json(updatedPost);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postMessage.findOne({ where: { id: id } })
  
    if (!post) return res.status(404).send(`Нет поста с таким id: ${id}`);

    await postMessage.destroy({ where: { id: id } });

    res.json({ message: "Пост успешно удален." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}


module.exports = { getPosts, createPost, updatePost, deletePost };
