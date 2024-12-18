import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Book } from '../models/book.model';
import { fetchWithAuth } from '../utils/fetchAuth';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5203/api/book/';
  private books = signal<Book[]>([]);

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.books();
  }

  async populateBooks(): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}`);
    const result: Book[] = await response.json();

    if (response.ok) {
      this.books.set(result);
      return true;
    }

    return false;
  }

  async deleteBook(book: Book): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}${book.id}`, { method: 'DELETE' });

    if (response.ok) {
      return true;
    }

    return false;
  }

  async addBook(book: Book) {
    const response: any = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    const result = await response.json();
  }
}