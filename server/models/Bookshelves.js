import cloneDeep from "lodash.clonedeep";
import { stripHtml } from "string-strip-html";

/**
 * Usually, we would store our data in a database instead of a plain text file
 * that we are committing to git. However, for the purposes of demonstrating
 * the front-end of student portfolio piece, this works fine.
 */
import starterBookshelves from "../assets/starterBookshelves.js";
let shelves = cloneDeep(starterBookshelves);

class Bookshelves {
  static getBookshelf(userId) {
    const skeleton = {
      wantToRead: [],
      currentlyReading: [],
      read: [],
    };
    return shelves.reduce((bookshelf, book) => {
      const { userId: bookUserId, ...restOfBook } = book;
      if (bookUserId === userId) {
        bookshelf[book.shelf].push(restOfBook);
      }
      return bookshelf;
    }, skeleton);
  }

  static getBook(userId, bookId) {
    const book = shelves.find(
      (book) => book.id === bookId && book.userId === userId
    );
    if (book) {
      const { userId, ...restOfBook } = book;
      return restOfBook;
    }
    return book;
  }

  static hasBook(userId, bookId) {
    return !!Bookshelves.getBook(userId, bookId);
  }

  static findShelfForBook(userId, bookId) {
    const book = Bookshelves.getBook(userId, bookId);
    return book ? book.shelf : "none";
  }

  static structureBook(bookId, volumeInfo, shelf) {
    if (!["wantToRead", "currentlyReading", "read", "none"].includes(shelf))
      throw new Error(`Shelf "${shelf}" does not exist`);

    return {
      id: bookId,
      ...volumeInfo,
      description: volumeInfo.description
        ? stripHtml(volumeInfo.description).result
        : "",
      shelf,
    };
  }

  static insertBook(userId, bookId, volumeInfo, shelf) {
    shelves.push({
      ...Bookshelves.structureBook(bookId, volumeInfo, shelf),
      userId,
    });
  }

  static deleteBook(userId, bookId) {
    shelves = shelves.filter(
      (book) => !(book.id === bookId && book.userId === userId)
    );
  }

  static updateBookshelf(userId, bookId, volumeInfo, shelf) {
    Bookshelves.deleteBook(userId, bookId);
    Bookshelves.insertBook(userId, bookId, volumeInfo, shelf);
  }
}

export default Bookshelves;
