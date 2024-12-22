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
  deleting = signal<boolean>(false);
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
    this.deleting.set(true);
    const status = await this.bookService.deleteBook(book);
    if (status == 204) {
      await this.repopulateBooks();
    } else if (status == 404) {
      this.errorService.setError('Error removing book with ID ' + book.id);
    } else {
      this.errorService.setError('You need to be logged in to do this.')
    }
    this.deleting.set(false);
  }

  async repopulateBooks() {
    const books = await this.bookService.populateBooks();
    if (books != null) {
      this.books.set(books);
    } else {
      this.errorService.setError('Error fetching books!');
    }
  }
}
