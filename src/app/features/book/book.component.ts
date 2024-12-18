import { Component } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  async ngOnInit(): Promise<void> {
    this.repopulateBooks();
  }

  async removeBook(book: Book) {
    if (await this.bookService.deleteBook(book)) {
      this.repopulateBooks();
    }
  }

  async repopulateBooks() {
    await this.bookService.populateBooks();
    this.books = this.bookService.getBooks();
  }
}
