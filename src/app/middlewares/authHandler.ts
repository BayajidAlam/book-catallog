/* eslint-disable no-unused-expressions */

import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";


// requestValidationHandler
const authHandler =
	(...selected_roles: string[]) =>
	async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		console.log(selected_roles,'role');
		try {
			//   check authorization
			const token = req.headers?.authorization;
			// console.log(token,'Token');
			if (!token) {
				throw new ApiError(
					httpStatus.UNAUTHORIZED,
					"Unauthorized"
				);
			}

			const decoded_user = jwtHelper.verify_token(
				token,
				config.jwt.access_token_secret as Secret
			);
			const { userId, role } = decoded_user;
			console.log(userId, role,'auth_handler');

			// set in req
			req.logged_in_user = decoded_user;
				// console.log(userId,'id');
			//   check if the user is authenticated
			if (!userId) {
				throw new ApiError(
					httpStatus.UNAUTHORIZED,
					"Unauthorized"
				);
			}
			
			// console.log(role,'role');
			//  check if the user has the required role
			if (!selected_roles.includes(role)) {
				throw new ApiError(
					httpStatus.FORBIDDEN,
					"forbidden"
				);
			}

			next();
		} catch (error) {
			next(error);
		}
	};
export default authHandler;

