import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { QuoteService } from '../../core/services/quote.service';
import { Quote } from '../../core/models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent {
  quotes = signal<Quote[]>([])
  constructor(private quoteService: QuoteService) { }

  newQuote: string = "";

  async ngOnInit(): Promise<void> {
    await this.repopulateQuotes();
  }

  async repopulateQuotes() {
    await this.quoteService.populateQuotes();
    this.quotes.set(this.quoteService.getQuotes());

  }

  async addQuote() {
    if (this.newQuote === "")
    {
      return;
    }

    const quoteResponse = await this.quoteService.addQuote(this.newQuote);
    if (quoteResponse != null) {
      this.quotes.set([...this.quotes(),quoteResponse]);
    }
  }

  async removeQuote(quote: Quote) {
    if (await this.quoteService.deleteQuote(quote)) {
      await this.repopulateQuotes();
    }
  }
}
