import User from '../model/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res, next) => {
  //wyciagamy parametry z User model i sprawdzamy czy zostały podane
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    throw new BadRequestError(
      'You need to provide all credentials for registration'
    );
  }
  const userEmailExists = await User.findOne({ email });
  if (userEmailExists) {
    throw new BadRequestError('Email already exits. Try another one');
  }
  const user = await User.create({ name, email, password });
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
