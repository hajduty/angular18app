import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { fetchWithAuth } from '../utils/fetchAuth';
import { Quote } from '../models/quote.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = `${environment.API_URL}/api/quote/`;
  private quotes = signal<Quote[]>([]);

  constructor(private http: HttpClient) { }

  getQuotes() {
    return this.quotes();
  }

  async populateQuotes(): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}`);

    if (!response.ok) {
      return false;
    }

    this.quotes.set(await response.json());
    return true;
  }

  async deleteQuote(quote: Quote): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}${quote.id}`, { method: 'DELETE' });
    return response.ok;
  }

  async addQuote(quote: string): Promise<Quote | null> {
    const response: any = await fetchWithAuth(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote),
    });

    if (!response.ok) {
      return null;
    };

    return await response.json();
  }
}
