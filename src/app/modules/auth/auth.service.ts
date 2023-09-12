import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IUserLogin } from "../user/user.interface";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

// Create new user
const user_signup = async (user_data: User): Promise<Partial<User> | null> => {
	const created_user = await prisma.user.create({
		data: user_data,
	});

	const userWithoutPassword: Partial<User> = created_user;
	delete userWithoutPassword.password;

	return userWithoutPassword;
};

// login user
const user_login = async (
	user_data: IUserLogin
): Promise<ILoginResponse | null> => {
	const user = await prisma.user.findUnique({
		where: {
			email: user_data.email,
			password: user_data.password,
		},
	});

	if (!user) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"User not found, check your email and password"
		);
	}

	// access token
	const token = jwtHelper.create_token(
		{
			userId: user?.id,
			role: user?.role,
		},
		config.jwt.access_token_secret as Secret,
		config.jwt.access_token_expiresIn as string
	);

	return { token };
};

export const AuthServices = {
	user_signup,
	user_login,
};
