import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    message: `${error.name} ${error.message}`,
  });
}
