const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser)
      return res
        .status(404)
        .json({ message: 'Вам необходимо зарегистрироваться' });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Вы ввели неверный пароль' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) return res.status(400).json({ message: 'Вы уже зарегистрированы' });

    if(password !== confirmPassword) return res.status(400).json({ message: 'Пароли не совпадают' });

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result.id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

module.exports = { signin, signup };
