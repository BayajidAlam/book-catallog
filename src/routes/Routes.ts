import express from "express";
import { AuthRoute } from "../app/modules/auth/auth.route";


const router = express.Router();

const all_routes = [
	{ path: "/auth", router: AuthRoute },
	// { path: "/users", router: UserRoute },
	// { path: "/categories", router: CategoriesRoute },
	// { path: "/books", router: BookRoute },
	// { path: "/orders", router: OrderRoutes },
];

all_routes.map((item) => router.use(item.path, item.router));

export default router;

