import { Component, inject, signal, ViewChild } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { AddbookComponent } from "./addbook/addbook.component";
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, AddbookComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  books = signal<Book[]>([]);
  private errorService = inject(ErrorService);

  constructor(private bookService: BookService) { }

  @ViewChild(AddbookComponent) modal?: AddbookComponent;

  openAddModal() {
    this.modal?.openModal();
  }

  openEditModal(book: Book) {
    this.modal?.openModal(book);
  }

  addBook(book: Book) {
    this.books.set([...this.books(),book]);
  }

  editBook(updatedBook: Book): void {
    const currentBooks = this.books();
    this.books.set(currentBooks.map(book =>
      book.id === updatedBook.id ? { ...updatedBook } : book
    ));  
  }
  
  async ngOnInit(): Promise<void> {
    this.repopulateBooks();
  }

  async removeBook(book: Book) {
    if (await this.bookService.deleteBook(book)) {
      this.repopulateBooks();
      return;
    }
    this.errorService.setError('You need to be logged in do to this!');
  }

  async repopulateBooks() {
    await this.bookService.populateBooks();
    this.books.set(this.bookService.getBooks());
  }
}
