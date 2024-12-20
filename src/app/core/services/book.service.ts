import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Book } from '../models/book.model';
import { fetchWithAuth } from '../utils/fetchAuth';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.API_URL}/api/book/`;
  private books = signal<Book[]>([]);

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.books();
  }

  async populateBooks(): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}`);
    
    if (!response.ok) {
      return false;
    }
    
    this.books.set(await response.json());
    return false;
  }

  async deleteBook(book: Book): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}${book.id}`, { method: 'DELETE' });

    if (response.ok) {
      return true;
    }

    return false;
  }

  async addBook(book: Book): Promise<boolean> {
    const response: any = await fetchWithAuth(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    return response.ok;
  }

  async editBook(book: Book): Promise<boolean> {
    const response: any = await fetchWithAuth(`${this.apiUrl}${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    return response.ok;
  }
}
