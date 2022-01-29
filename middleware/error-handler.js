import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: 'Something goes wrong, try again later',
  };
  res.status(defaultError.status).json({ msg: err });
};

export default errorHandlerMiddleware;
