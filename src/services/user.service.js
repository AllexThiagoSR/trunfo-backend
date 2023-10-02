const Sequelize = require('sequelize');
const { User, Deck, Role } = require('../models');
const config = require('../config/config');
const { createToken } = require('../utils/token');
const { encryptPassword, isRightPassword } = require('../utils/bcryptUtils');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);
const INTERNAL_SERVER_ERROR = { status: 500, data: { message: 'Something went wrong' } };

const login = async (password, email = '') => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !isRightPassword(password, user.password)) {
      return { status: 401, data: { message: 'email or password incorrect' } };
    }
    const token = createToken({ id: user.id, username: user.username, isAdm: user.roleId === 1 });
    return { status: 200, data: { token } };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const createUser = async (user, transaction) => {
  const { username, email, image, id } = await User.create(
    { ...user, roleId: 2 },
    { transaction },
  );
  return { id, email, image, username };
};

const create = async ({ username, email, password, image }) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const user = await createUser(
        { username, email, password: encryptPassword(password), image },
        transaction,
      );
      return { status: 201, data: user }; 
    });
    return result;
  } catch (error) {
    if (error.original && error.original.code === 'ER_DUP_ENTRY') {
      return { status: 409, data: { message: 'This email is already registered' } };
    }
    return INTERNAL_SERVER_ERROR;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ 
      where: { id },
      include: [
        { model: Deck, as: 'decks', attributes: ['name', 'created', 'updated'] },
        { model: Role, as: 'role', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['password', 'roleId'] },
    });
    if (!user) return { status: 404, data: { message: 'User not found' } };
    return { status: 200, data: user };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const getLoggedUser = async (loggedUser) => {
  try {
    const user = await User.findByPk(
      loggedUser.id,
      {
        include: { model: Deck, as: 'decks', attributes: ['name', 'created', 'updated', 'id'] },
        attributes: { exclude: ['password', 'roleId', 'id'] },
      },
    );
    return { status: 200, data: user };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const getAll = async (username = '') => {
  // Adicionar paginação na rota de obter todos os usuários
  try {
    const users = await User.findAll({
      where: {
        username: { [Sequelize.Op.substring]: username },
      },
      attributes: { exclude: ['password', 'roleId'] },
    });
    return { status: 200, data: users };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const changePassword = async (previousPassword, password, loggedUser) => {
  try {
    const user = await User.findByPk(loggedUser.id);
    if (!isRightPassword(previousPassword, user.password)) {
      return { status: 401, data: { message: 'Unauthorized' } };
    }
    User.update({ password: encryptPassword(password) }, { where: { id: loggedUser.id } });
    return { status: 200, data: { message: 'Password updated' } };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const updateUser = async ({ username, image, email }, loggedUser) => {
  try {
    await User.update({ username, image, email }, { where: { id: loggedUser.id } });
    const updatedUser = await User
      .findByPk(loggedUser.id, { attributes: { exclude: ['password', 'role_id'] } });
    return { status: 200, data: updatedUser };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const deleteUser = async (id, user) => {
  try {
    if (user.id !== Number(id)) return { status: 401, data: { message: 'Unauthorized user' } };
    await User.destroy({ where: { id } });
    return { status: 204 };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = {
  login,
  getLoggedUser,
  create,
  getUserById,
  getAll,
  changePassword,
  updateUser,
  deleteUser,
};
