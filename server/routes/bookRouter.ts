import express, { Request, Response } from "express";
import axios from "axios";
import Bookshelves from "../models/Bookshelves";
import { getUserId } from "../middlewares/auth";

import methodNotAllowedError from "../errors/methodNotAllowed";

const router = express.Router();

router
  .route("/:bookId")
  .get((req: Request, res: Response) => {
    const { bookId } = req.params;
    const userId = getUserId(req);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        // @ts-ignore
        const shelf = Bookshelves.findShelfForBook(userId, bookId);
        const book = Bookshelves.structureBook(
          bookId,
          response.data.volumeInfo,
          shelf
        );
        return res.send({ book });
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(404)
          .send({ message: `No book with book ID ${bookId} found.` });
      });
  })
  .all(methodNotAllowedError);

export default router;
