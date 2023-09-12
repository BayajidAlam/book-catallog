import express from "express";
import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import requestValidationHandler from "../../middlewares/requestValidationHandler";
import { create_ct_zod_schema, update_ct_zod_schema } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post(
	"/create-category",
	authHandler(UserRole.admin),
	requestValidationHandler(create_ct_zod_schema),
	CategoryController.categoryCreate
);
router.get("/", CategoryController.categoryList);
router.get("/:id", CategoryController.categoryDetails);

router.patch(
	"/:id",
	authHandler(UserRole.admin),
	requestValidationHandler(update_ct_zod_schema),
	CategoryController.categoryUpdate
);
router.delete(
	"/:id",
	authHandler(UserRole.admin),
	CategoryController.deleteCategory
);

export const CategoriesRoute = router;
