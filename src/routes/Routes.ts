import express from "express";
import { AuthRoute } from "../app/modules/auth/auth.route";
import { UserRoute } from "../app/modules/user/user.route";
import { CategoriesRoute } from "../app/modules/category/category.route";
import { BookRoute } from "../app/modules/book/book.route";
import { OrderRoutes } from "../app/modules/order/order.route";
import { ProfileRoute } from "../app/modules/profile/profile.route";

const router = express.Router();

const all_routes = [
  { path: "/auth", router: AuthRoute },
  { path: "/users", router: UserRoute },
  { path: "/categories", router: CategoriesRoute },
  { path: "/books", router: BookRoute },
  { path: "/orders", router: OrderRoutes },
  { path: "/profile", router: ProfileRoute },
];

all_routes.map((item) => router.use(item.path, item.router));

export default router;
