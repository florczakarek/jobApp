import User from '../model/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

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
  //instancja metody z USerSchema - nie trzeba dodatkowo importowac
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location,
  });

  // //tutaj przyjmujemy blad z error-handler poprzez wywołanie next() middleware
  // next(error);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  //szukamy maila zalogowanego usera + musimy dodac select password bo w User model ustawilismy na false
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  const { email, name, location, lastName } = req.body;

  if (!email || !name || !location || !lastName) {
    throw new BadRequestError('Please provide all values so as to UPGRADE');
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.location = location;
  user.lastName = lastName;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
