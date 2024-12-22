import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { QuoteService } from '../../core/services/quote.service';
import { Quote } from '../../core/models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent {
  quotes = signal<Quote[]>([])
  deleting = signal<boolean>(false);
  constructor(private quoteService: QuoteService, private errorService: ErrorService, private changeDetectorRef: ChangeDetectorRef) { }

  newQuote: string = "";

  async ngOnInit(): Promise<void> {
    await this.repopulateQuotes();
  }

  async repopulateQuotes() {
    const quotes = await this.quoteService.populateQuotes();
    if (quotes != null) {
      this.quotes.set(quotes);
      this.changeDetectorRef.detectChanges();
    } else {
      this.errorService.setError('Error fetching quotes');
    }
  }

  async addQuote() {
    const quoteResponse = await this.quoteService.addQuote(this.newQuote);

    if (quoteResponse != null) {
      this.quotes.set([...this.quotes(), quoteResponse]);
    } else {
      this.errorService.setError('Error adding quotes');
    }
  }

  async removeQuote(quote: Quote) {
    this.deleting.set(true);
    if (await this.quoteService.deleteQuote(quote)) {
      await this.repopulateQuotes();
    } else {
      this.errorService.setError('Error removing quote');
    }
    this.deleting.set(false);
  }
}
