import { Component, inject, ViewChild } from '@angular/core';
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
  books: Book[] = [];
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
    this.books.push(book);
  }

  editBook(updatedBook: Book) {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = { ...updatedBook };
    }
  }

  async ngOnInit(): Promise<void> {
    this.repopulateBooks();
  }

  async removeBook(book: Book) {
    if (await this.bookService.deleteBook(book)) {
      this.repopulateBooks();
    }
    console.log("noob");
    this.errorService.setError('An error has occurred!');
  }

  async repopulateBooks() {
    await this.bookService.populateBooks();
    this.books = this.bookService.getBooks();
  }
}
