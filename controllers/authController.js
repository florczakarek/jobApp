import User from '../model/User.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });

  // //tutaj przyjmujemy blad z error-handler poprzez wywołanie next() middleware
  // next(error);
};
const login = async (req, res) => {
  res.send('user is login already');
};
const updateUser = async (req, res) => {
  res.send('User is updated');
};

export { register, login, updateUser };
