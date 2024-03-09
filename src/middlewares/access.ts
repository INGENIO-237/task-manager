import { NextFunction, Request, Response } from "express";

export const requireAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) return res.sendStatus(403);

  return next();
};
