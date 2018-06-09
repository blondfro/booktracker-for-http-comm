import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { OldBook } from '../models/oldBook';

@Injectable()
export class DataService {

  constructor(private loggerService: LoggerService,
              private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log('Getting all books');
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  // this block of code would transform data if needed.

  // getOldBookById(id: number): Observable<OldBook> {
  //   return this.http.get<Book>(`/api/books/${id}`)
  //     .pipe(
  //       map(b => <OldBook> {
  //         bootTitle: b.title,
  //         year: b.publicationYear
  //       }),
  //       tap(classicBook => console.log(classicBook))
  //     );
  // }
}
