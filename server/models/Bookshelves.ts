import { stripHtml } from "string-strip-html";

/**
 * Usually, we would store our data in a database instead of a plain text file
 * that we are committing to git. However, for the purposes of demonstrating
 * the front-end of student portfolio piece, this works fine.
 */
import starterBookshelves from "../assets/starterBookshelves";
let shelves = starterBookshelves;

type ShelfTypes = "wantToRead" | "currentlyReading" | "read";

export interface IVolume {
  id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

export interface IBook extends IVolume {
  userId: string;
  shelf?: ShelfTypes;
}

export interface IBookshelfBook extends IVolume {
  shelf?: ShelfTypes;
}

export interface IBookshelf {
  wantToRead: IBookshelfBook[];
  currentlyReading: IBookshelfBook[];
  read: IBookshelfBook[];
}

class Bookshelves {
  static getBookshelf(userId: string): IBookshelf {
    const skeleton: IBookshelf = {
      wantToRead: [],
      currentlyReading: [],
      read: [],
    };
    return shelves.reduce((bookshelf, book) => {
      const { userId: bookUserId, ...restOfBook } = book;
      if (book.shelf && bookUserId === userId) {
        bookshelf[book.shelf].push(restOfBook);
      }
      return bookshelf;
    }, skeleton);
  }
  static getBook(userId: string, bookId: string): IBookshelfBook {
    const book = shelves.find(
      (book) => book.id === bookId && book.userId === userId
    );
    if (!book) throw new Error(`Book "${bookId}" not found`);

    if (book.userId) {
      const { userId, ...restOfBook } = book;
      return restOfBook;
    }
    return book;
  }
  static hasBook(userId: string, bookId: string): boolean {
    try {
      return !!Bookshelves.getBook(userId, bookId);
    } catch (err) {
      return false;
    }
  }
  static findShelfForBook(
    userId: string,
    bookId: string
  ): ShelfTypes | undefined {
    try {
      const book = Bookshelves.getBook(userId, bookId);
      return book.shelf;
    } catch (err) {
      return undefined;
    }
  }
  static structureBook(
    bookId: string,
    volumeInfo: IVolume,
    shelf: ShelfTypes | undefined
  ): IBookshelfBook {
    const book: IVolume = {
      ...volumeInfo,
      id: bookId,
      description: volumeInfo.description
        ? stripHtml(volumeInfo.description).result
        : "",
      ...{ shelf: shelf || undefined },
    };
    return book;
  }
  static insertBook(
    userId: string,
    bookId: string,
    volumeInfo: IVolume,
    shelf: ShelfTypes
  ) {
    shelves.push({
      ...Bookshelves.structureBook(bookId, volumeInfo, shelf),
      userId,
    });
  }
  static deleteBook(userId: string, bookId: string) {
    shelves = shelves.filter(
      (book) => !(book.id === bookId && book.userId === userId)
    );
  }
  static updateBookshelf(
    userId: string,
    bookId: string,
    volumeInfo: IVolume,
    shelf: ShelfTypes
  ) {
    Bookshelves.deleteBook(userId, bookId);
    Bookshelves.insertBook(userId, bookId, volumeInfo, shelf);
  }
}

export default Bookshelves;
