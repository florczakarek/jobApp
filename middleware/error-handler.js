import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  const defaultError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    // sprawdzamy tutaj blad dla danych z authController
    msg: err.message || 'Something goes wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    defaultError.status = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    // wyciagamy obiekt err i zamieniamy w tablice za pomoca obj.values
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }
  if (err.code && err.code === 11000) {
    defaultError.status = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(
      err.keyValue
    )} field has to be unique. You cannot send this same credentials twice!!!`;
  }
  res.status(defaultError.status).json({ msg: defaultError.msg });
  // caly obiekt err
  // res.status(defaultError.status).json({ msg: err });
};

export default errorHandlerMiddleware;

//jesli zarejestrujemy obiekt do mongo i ponownie wyslemy ten sam email - korzystamy z globalnego json{msg:err} i wyciagamy code i keyValue!!!!
