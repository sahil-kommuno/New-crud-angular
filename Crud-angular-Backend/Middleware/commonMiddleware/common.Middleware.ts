import { Request, Response, NextFunction } from 'express';

const loggerDetail = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Logger Details: [${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`);
  next();
};

export default loggerDetail;
