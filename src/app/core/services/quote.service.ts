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

  constructor(private http: HttpClient) { }

  async populateQuotes(): Promise<Quote[]> {
    const response = await fetchWithAuth(`${this.apiUrl}`);

    return response.json();
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

    return await response.json();
  }
}
