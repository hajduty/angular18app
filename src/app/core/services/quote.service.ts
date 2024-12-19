import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { fetchWithAuth } from '../utils/fetchAuth';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'http://localhost:5203/api/quote/';
  private quotes = signal<Quote[]>([]);

  constructor(private http: HttpClient) { }

  getQuotes() {
    return this.quotes();
  }

  async populateQuotes(): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}`);
    const result: Quote[] = await response.json();

    if (response.ok) {
      this.quotes.set(result);
      console.log(result);
      return true;
    }

    return false;
  }

  async deleteQuote(quote: Quote): Promise<boolean> {
    const response = await fetchWithAuth(`${this.apiUrl}${quote.id}`, { method: 'DELETE' });
    return response.ok;
  }

  async addQuote(quote: string): Promise<Quote> {
    const response: any = await fetchWithAuth(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote),
    });

    console.log(response);

    return await response.json();
  }
}
