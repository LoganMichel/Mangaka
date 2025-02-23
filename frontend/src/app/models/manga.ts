import {Book} from './book';

export interface Manga {
  id: number
  title: string;
  cover: string;
  scan_nb: number;
  book_nb: number;
  progress: number;
  books: Book[];
}
