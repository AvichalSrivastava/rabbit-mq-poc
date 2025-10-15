import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export default function  errorHandler (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ Error:", err);

  let statusCode = 500;
  let message = "Something went wrong";

  // If it's an instance of our custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode || 500;
    message = err.message;
  }

  // In development, show full stack; in prod, hide details
  const response =
    process.env.NODE_ENV === "production"
      ? { success: false, message }
      : {
          success: false,
          message,
          stack: err.stack,
          error: err,
          path: req.originalUrl,
        };

  res.status(statusCode).json(response);
};
