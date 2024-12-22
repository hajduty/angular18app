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

  constructor(private http: HttpClient) { }

  async populateBooks(): Promise<Book[] | null> {
    const response = await fetchWithAuth(`${this.apiUrl}`);
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  }

  async deleteBook(book: Book): Promise<number> {
    const response = await fetchWithAuth(`${this.apiUrl}${book.id}`, { method: 'DELETE' });
    console.log(response.status);
    return response.status;
  }

  async addBook(book: Book): Promise<Book | null> {
    const response = await fetchWithAuth(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
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
