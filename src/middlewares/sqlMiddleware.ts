import { poolPromise } from '../database/sql.js';
import { Request, Response, NextFunction } from 'express';

declare global {
	namespace Express {
		interface Request {
			sqlResult?: any;
		}
	}
}

export async function sqlMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const pool = await poolPromise;
		// Example query
		const result = await pool.request().query('SELECT 1 AS number');
		req.sqlResult = result;
		next();
	} catch (err) {
		next(err);
	}
}
