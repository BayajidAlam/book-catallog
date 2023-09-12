import express from "express";
import requestValidationHandler from "../../middlewares/requestValidationHandler";

import { BookController } from "./book.controller";
import {
	create_book_zod_schema,
	update_book_zod_schema,
} from "./book.validation";
import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
	"/create-book",
	authHandler(UserRole.admin),
	requestValidationHandler(create_book_zod_schema),
	BookController.createBook
);


router.get("/", BookController.allBooks);
router.get("/:categoryID/category", BookController.cateGoryBooks);
router.get("/:id", BookController.bookDetails);

router.patch(
	"/:id",
	authHandler(UserRole.admin),
	requestValidationHandler(update_book_zod_schema),
	BookController.updateBook
);
router.delete("/:id", authHandler(UserRole.admin), BookController.deleteBook);

export const BookRoute = router;
